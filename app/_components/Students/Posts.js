import { HiEllipsisVertical } from "react-icons/hi2";
import PlusIcon from '@/public/icons/PlusIcon'
import { AiOutlineLike, AiOutlinePaperClip, AiFillLike } from "react-icons/ai"; // Import like icons

import Image from 'next/image'
import { useEffect, useRef, useState } from "react";
import { addPost, getComment, LikePost } from "@/app/actions/discussions";

function Posts({ posts, id, addNewPost }) {
    /* const [showComments, setShowComments] = useState(false)
    const [comments, setComments] = useState({}); */

    const handleJoinMeeting = (roomId) => {
        console.log(`Joining meeting with room ID: ${roomId}`);
        window.open(`https://meeting-platform.com/join/${roomId}`, '_blank');
    };
    const postInputRef = useRef(null)
    const fileInputRef = useRef(null)
    const [attachment, setAttachment] = useState([]); // State to hold the name of the attached file

    const [openModal, setOpenModal] = useState(false)
    const [content, setContent] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setAttachment(file); // Save file to state
        }
    };
    const extractRoomId = (content) => {
        const match = content.match(/Meeting room ID:\s*([\w-]+)/);
        return match ? match[1] : null;
    };
    const [localPosts, setLocalPosts] = useState(posts);
    useEffect(() => {
        setLocalPosts(posts);
    }, [posts]);

    const toggleLike = async (postId) => {
        const postToUpdate = localPosts.find(post => post._id === postId);
        if (!postToUpdate) return;
        const isCurrentlyLiked = postToUpdate.isLiked;
        setLocalPosts(prevPosts =>
            prevPosts.map(post =>
                post._id === postId
                    ? {
                        ...post,
                        isLiked: !isCurrentlyLiked,
                        likes: isCurrentlyLiked ? post.likes.slice(0, -1) : [...post.likes, 'like'] // Adjust likes count
                    }
                    : post
            )
        );
        try {
            const updatedPost = await LikePost({ id: postId });
            setLocalPosts(prevPosts =>
                prevPosts.map(post =>
                    post._id === postId
                        ? {
                            ...post,
                            isLiked: updatedPost?.isLiked ?? post.isLiked,
                            likes: updatedPost?.likes ?? post.likes // Update likes count from server
                        }
                        : post
                )
            );
        } catch (error) {
            console.error("Error liking post:", error);
            setLocalPosts(prevPosts =>
                prevPosts.map(post =>
                    post._id === postId
                        ? {
                            ...post,
                            isLiked: isCurrentlyLiked, // Revert the like status
                            likes: isCurrentlyLiked ? post.likes : post.likes.slice(0, -1) // Revert likes count
                        }
                        : post
                )
            );
        }
    };
    const handleOpenModal = () => {
        setOpenModal(true)
    }
    const handleClickOutside = (event) => {
        if (postInputRef.current && !postInputRef.current.contains(event.target)) {
            handleCloseModal();
        }
    };
    const handleCloseModal = () => {
        setOpenModal(false)
    }
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    },);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true)
            const formData = new FormData();
            formData.append("id", id);
            formData.append("content", content);
            if (attachment) {
                formData.append("attachments", attachment);
            }
            const newPost = await addPost(formData);

            setLocalPosts((prevPosts) => [...prevPosts, newPost]);
            addNewPost(newPost);
            setContent('');
            setOpenModal(false);

        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false)

        }
    };
    /*  const toggleComments = async (postId) => {
         setShowComments(prevState => ({
             ...prevState,
             [postId]: !prevState[postId]
         }));
 
         if (!comments[postId]) {
             try {
                 const response = await getComment({ postId });
                 setComments(prevComments => ({
                     ...prevComments,
                     [postId]: response.data
                 }));
             } catch (error) {
                 console.error("Error fetching comments:", error);
             }
         }
     }; */

    return (
        <div>
            <div onClick={handleOpenModal} className='w-[90%] md:w-[80%] mx-auto p-2 my-4 md:my-2 border space-x-2 rounded-md
                 border-gray-300 flex items-center'>
                <PlusIcon />
                <p >Add Post</p>
            </div>
            {localPosts && localPosts.length > 0 ? (
                localPosts.map((post) => {
                    const roomId = extractRoomId(post.content);
                    return (
                        <div key={post._id} className='w-[90%] md:w-[80%] justify-between flex flex-col mx-auto p-2 my-2 border rounded-md
                             border-gray-300'>
                            <div className='flex flex-row justify-between'>
                                {/* User Info and Profile Image */}
                                <div className='flex'>
                                    <div className='h-14 w-14 rounded-full overflow-hidden bg-sky-900'>
                                        <Image
                                            src={post?.creator?.profilePicture?.url || '/default-avatar.png'} // Fallback if no profile picture
                                            alt={`${post?.creator?.name.first} ${post?.creator?.name.last}`}
                                            width={56} // Adjusted to fit in 56x56 size (h-14)
                                            height={56}
                                        />
                                    </div>
                                    <div className='flex flex-col justify-evenly ml-2'>
                                        <p className='font-poppins'>{post.creator?.name.first} {post.creator?.name.last}</p>
                                        <p className='font-poppins text-gray-400'>{ }</p>
                                    </div>
                                </div>

                                {/* Options Icon */}
                                <HiEllipsisVertical className='' />
                            </div>

                            {/* Post Content */}
                            <p className='py-4 overflow-clip'>
                                {post.content}
                            </p>
                            {roomId && (
                                <button
                                    onClick={() => handleJoinMeeting(roomId)}
                                    className="mt-2 py-2 px-4
                                     bg-bluePrimary text-white rounded-md hover:bg-blueSecondary"
                                >
                                    Join Meeting
                                </button>
                            )}

                            <hr className="my-4 border-t border-gray-300" />

                            {/* Comments Count */}
                            <div className='flex items-center space-x-2'>
                                <button onClick={() => toggleLike(post._id)} className="focus:outline-none">
                                    {post.isLiked ? (
                                        <AiFillLike className="text-blue-500" /> // Filled icon for liked posts
                                    ) : (
                                        <AiOutlineLike className="text-gray-500" /> // Outline icon for unliked posts
                                    )}
                                </button>
                                <span>{post.likes.length} Likes</span>
                                <span className="ml-4 cursor-pointer">{post.comments.length} Comments</span>
                            </div>
                            {/* {showComments[post._id] && comments[post._id] && (
                                <div className="mt-4">
                                    {comments[post._id].map((comment, index) => (
                                        <p key={index}>{comment.content}</p>
                                    ))}
                                </div>
                            )} */}
                        </div>
                    )
                })
            ) : (
                <p className="text-center text-gray-500">No posts available</p>
            )}
            {openModal &&
                <div className="fixed inset-0 flex items-center justify-center z-50
                 bg-black bg-opacity-50">
                    <div ref={postInputRef} className="bg-white p-6 rounded-lg w-[90%] max-w-md">

                        <input
                            type="text"
                            name="content"
                            value={content}
                            placeholder="Content"
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full p-2 border border-blueSecondary rounded mb-4 focus:outline-none
                focus:ring-1 focus:ring-bg-bluePrimary focus:border-bg-bluePrimary"
                        />
                        <div
                            className="flex items-center mb-5 bg-gray-100 border border-gray-300 rounded-md p-2 mt-4 cursor-pointer"
                            onClick={() => fileInputRef.current.click()} // Open file selector when clicked
                        >
                            <AiOutlinePaperClip className="text-gray-600 mr-2" size={20} />
                            <span className="font-poppins text-gray-700">
                                {attachment ? attachment.name : 'Attach a file'}
                            </span>
                        </div>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileUpload} // Call `handleFileUpload` on file select
                            className="hidden"
                        />
                        <div onClick={(e) => handleSubmit(e)} className='cursor-pointer bg-blueSecondary text-center
                         mt-2 p-2 w-full rounded-lg text-white'>
                            {isLoading ? <div class="flex items-center justify-center ">
                                <div
                                    class="w-6 h-6 rounded-full animate-spin border border-solid border-cyan-500 border-t-transparent">
                                </div>
                            </div> : ' Add Post'}
                        </div>


                    </div>


                </div>}
        </div>
    )
}

export default Posts
