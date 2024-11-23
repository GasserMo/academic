"use client"
import { useContext, useEffect, useRef, useState } from "react";
import ChatDetails from "./ChatDetails";
import { HiCheck } from "react-icons/hi2";
import { searchUsers } from "../actions/Search";
import { HiXMark } from "react-icons/hi2";
import { HiXCircle } from "react-icons/hi2";
import { addGroup } from "../actions/chat";

const ChatList = ({ chats, userId }) => {
    const [selectedChatId, setSelectedChatId] = useState(null);
    const [localChats, setLocalChats] = useState(chats);

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredChats, setFilteredChats] = useState(chats);
    const [showSearch, setShowSearch] = useState(false);
    const [groupData, setGroupData] = useState({
        title: "", description: "", members: [],
    })
    const [searchingUser, setSearchingUser] = useState(false)
    const [userMap, setUserMap] = useState({});

    const [saving, setSaving] = useState(false)
    const [userSearchTerm, setUserSearchTerm] = useState("");
    const [userSearchResults, setUserSearchResults] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false);

    const modalRef = useRef(null);
    const handleChatClick = (chatId) => {
        setSelectedChatId(chatId);
        console.log("Selected Chat ID:", chatId);
    };
    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target) && modalRef.current && !modalRef.current.contains(event.target)) {
            handleCloseModal();
        }
    };
    const handleOpenModal = async () => {
        setIsModalOpen((e) => !e);
    };
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setUserSearchTerm('')
        setUserSearchResults([])
        setGroupData({
            title: "", description: "", members: []
        })
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setGroupData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleAddUserToGroup = (user) => {
        const userId = user._id;
        if (groupData.members.includes(userId)) {
            return
        }
        if (!groupData.members.some((member) => member._id === userId)) {
            setGroupData((prevData) => ({
                ...prevData,
                members: [...prevData.members, userId],
            }));
            setUserMap((prevMap) => ({
                ...prevMap,
                [user._id]: user,  // Use the user ID as the key, and the user as the value
            }));
        }
    };
    const handleRemoveUserFromGroup = (userId) => {
        setGroupData((prevData) => ({
            ...prevData,
            members: prevData.members.filter((id) => id !== userId),
        }));
    };
    const handleUserSearch = async (e) => {
        const query = e.target.value;
        setUserSearchTerm(query);

        if (query.trim() === "") {
            setUserSearchResults([]);
            return;
        }
        setSearchingUser(true)
        try {
            const results = await searchUsers({ query });
            setUserSearchResults(results.users);
        } catch (error) {
            console.error("Error searching users:", error);
            setUserSearchResults([]);
            setSearchingUser(false)
        } finally {
            setSearchingUser(false)
        }
    };
    const handleAddNewChat = (newChat) => {
        setLocalChats((prevChats) => [newChat, ...prevChats]);
    };
    const handleCreateGroup = async () => {
        const { title, description } = groupData;
        if (!title) {
            setErrorMessage("Title is Required");
            return;
        }
        if (!description) {
            setErrorMessage("Description is Required");
            return;
        }
        try {
            setSaving(true);
            const newChat = await addGroup(groupData); // Assuming this returns the created chat
            const updatedChat = {
                ...newChat.chat,
                createdAt: new Date().toISOString(), // Set the current timestamp
                lastMessage: { createdAt: new Date().toISOString() } // Set the last message's timestamp if needed
            };

            setLocalChats((prevChats) => {
                const updatedChats = [updatedChat, ...prevChats];
                const sortedChats = updatedChats.sort((a, b) =>
                    new Date(b.lastMessage.createdAt || b.createdAt) -
                    new Date(a.lastMessage.createdAt || a.createdAt));
                setFilteredChats(sortedChats);
                return sortedChats;
            });
            console.log(newChat.chat)
        } catch (err) {
            console.error("Error saving todo:", err);
            setErrorMessage(err)
        } finally {
            setSaving(false);
            handleCloseModal();
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    const handleSearch = async (e) => {
        const query = e.target.value;
        setSearchTerm(query);
        setShowSearch(true);

        const queryLower = query.toLowerCase();
        if (queryLower.trim() === "") {
            setFilteredChats(localChats);
            return;
        }
        const filtered = localChats.filter((chat) => {
            if (chat.type === "private") {
                const member = chat.member;
                if (member && member.name) {
                    const fullName = `${member.name.first} ${member.name.last}`.toLowerCase();
                    return fullName.includes(queryLower);
                }
                return false;
            } else if (chat.type === "group") {
                const membersMatch = chat.members.some((member) => {
                    const fullName = `${member.name.first} ${member.name.last}`.toLowerCase();
                    return fullName.includes(queryLower);
                });
                const titleMatch =
                    chat.title?.toLowerCase().includes(queryLower) || false;
                const descriptionMatch =
                    chat.description?.toLowerCase().includes(queryLower) || false;

                return membersMatch || titleMatch || descriptionMatch;
            }
            return false;
        });
        const sortedFilteredChats = filtered.sort((a, b) =>
            new Date(b.lastMessage.createdAt || b.createdAt) -
            new Date(a.lastMessage.createdAt || a.createdAt)
        );
        setFilteredChats(sortedFilteredChats);
    };

    useEffect(() => {
        const sortedChats = [...chats].sort((a, b) => {
            const aTimestamp = new Date(a.lastMessage?.createdAt || a.createdAt);
            const bTimestamp = new Date(b.lastMessage?.createdAt || b.createdAt);
            return bTimestamp - aTimestamp;
        });
        setLocalChats(sortedChats);
        setFilteredChats(sortedChats);
    }, [chats]);
    const handleClearSearch = () => {
        setSearchTerm('')
        setFilteredChats(chats);
    };

    return (
        <div className="md:grid md:grid-cols-[30%_70%] md:min-h-[70vh] md:max-h-[80vh]
        flex flex-col rounded-2xl  ">
            <div className="flex flex-col items-center overflow-x-hidden min-h-[40vh] md:max-h-[90vh] max-h-[100vh]
           
             bg-white rounded-2xl">
                <p className="font-poppins text-center text-headline-small pt-2">Inbox</p>
                <hr className="w-full h-0.2 my-2 bg-gray-100" />
                <div className="relative flex  w-full">
                    <input
                        type="text"
                        placeholder="Search by name..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="m-2 p-2 border rounded-xl w-[60%] mx-auto   pr-10"
                    />
                    {searchTerm && ( //
                        <button
                            onClick={handleClearSearch}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                        >
                            <HiXMark />
                        </button>
                    )}
                </div>
                {isModalOpen && <div onClick={handleClickOutside} className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div ref={modalRef} className="flex flex-col bg-white max-h-[80%]
                     p-2 rounded-lg w-[90%] max-w-xl overflow-y-auto">
                        <div className="flex flex-col w-full p-4">
                            <div className="flex justify-between w-[95%] mx-auto pt-2 pb-4">
                                <p className="font-poppins text-headline-title">Create Group</p>
                                <button
                                    onClick={handleCloseModal}
                                >
                                    <HiXMark />
                                </button>
                            </div>
                            <div className="w-[95%] mx-auto">
                                <label className="block mb-2 font-poppins">Add Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    required
                                    value={groupData.title}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-blueSecondary rounded mb-4 focus:outline-none
                             focus:ring-1 focus:ring-bg-bluePrimary focus:border-bg-bluePrimary"
                                />
                                <label className="block mb-2 font-poppins">Add Description</label>
                                <textarea
                                    name="description"
                                    value={groupData.description}
                                    required
                                    onChange={handleChange}
                                    className="w-full p-2 border border-blueSecondary rounded mb-4 focus:outline-none
                             focus:ring-1 focus:ring-bg-bluePrimary focus:border-bg-bluePrimary"
                                ></textarea>
                                <label className="block mb-2 font-poppins">Add Users</label>
                                <input
                                    type="text"
                                    name="members"
                                    required
                                    value={userSearchTerm}
                                    onChange={handleUserSearch}
                                    className="w-full p-2 border border-blueSecondary rounded mb-4 focus:outline-none
                             focus:ring-1 focus:ring-bg-bluePrimary focus:border-bg-bluePrimary"
                                />
                                {errorMessage && <p className="font-poppins text-md text-red-600">{errorMessage}</p>}
                            </div>
                            <div className={`max-h-40 overflow-y-auto border p-2 rounded mb-4 mx-3 bg-blueHover ${userSearchTerm ? 'block' : 'hidden'}`}>
                                {searchingUser && <div>
                                    <div className=" flex justify-center items-center h-full">
                                        <div className="flex items-center justify-center self-center ">
                                            <div className="w-8 h-8 rounded-full animate-spin border 
                                  border-solid border-cyan-500 border-t-transparent"></div>
                                        </div>
                                    </div>
                                </div>}
                                {userSearchTerm && userSearchResults.length > 0 && (
                                    userSearchResults.map((user) => (
                                        <div
                                            key={user._id}
                                            onClick={() => handleAddUserToGroup(user)}
                                            className="flex items-center justify-between p-3 mb-2 
                                            bg-white rounded-lg shadow-md hover:shadow-lg 
                                         hover:bg-blueHover transition-all cursor-pointer"
                                        >
                                            <div className="flex items-center">
                                                <div className="ml-3">
                                                    <p className="text-sm font-poppins">{user.email || 'No email available'}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                                {userSearchTerm && userSearchResults.length === 0 && !searchingUser && (
                                    <p className="text-center text-gray-500">No users found.</p>
                                )}
                            </div>
                            {groupData.members.length > 0 && (
                                <div className="mt-4 w-[95%] mx-auto ">
                                    <p className="font-poppins text-md   mb-2">Selected Members:</p>
                                    <div className="max-h-40 overflow-y-auto">
                                        <ul>
                                            {groupData.members.map((userId) => {
                                                const user = userMap[userId];
                                                return user ? (
                                                    <li key={userId} className="overflow-y-auto max-h-[30%]
                                                inline-flex items-center space-x-1 my-2
                                                 p-2 bg-bluePrimary rounded-full mr-1">
                                                        <span className="text-xs font-poppins text-white">
                                                            {user.name.first} {user.name.last}
                                                        </span>
                                                        <HiXCircle
                                                            className="text-white hover:text-black cursor-pointer"
                                                            onClick={() => handleRemoveUserFromGroup(userId)}
                                                        />
                                                    </li>
                                                ) : null;
                                            })}
                                        </ul>
                                    </div>

                                </div>
                            )}
                        </div>
                        <div onClick={() => handleCreateGroup(groupData)} className="
                        w-[90%] mx-auto text-white m-5
                         bg-bluePrimary hover:bg-blueSecondary cursor-pointer rounded-xl text-center p-3">
                            {saving ? "Creating..." : "Create a Group"}</div>

                    </div>
                </div>}
                <div onClick={handleOpenModal} className="w-[90%] mx-auto bg-slate-100 hover:bg-gray-300 cursor-pointer rounded-xl 
                text-center p-3">Create a Group</div>
                <hr className="w-full h-0.2 my-2 bg-gray-100" />
                <div className="space-y-2 w-[90%]  space-x-1 scrollbar-thin
                 scrollbar-track-gray-200 scrollbar-thumb-bluePrimary overflow-y-auto">
                    {filteredChats?.map((chat) => {
                        const member = chat.member || chat.members?.[0];
                        const lastMessage = chat.lastMessage?.[0] || {};
                        const messageTimestamp = lastMessage.createdAt ? new Date(lastMessage.createdAt) : new Date(chat.createdAt);

                        return (
                            <div
                                key={chat._id}
                                onClick={() => handleChatClick(chat._id)}
                                className="flex justify-between p-3 max-w-[95%] bg-blueHover rounded-2xl cursor-pointer whitespace-nowrap overflow-hidden text-ellipsis"
                            >
                                <div className="flex w-[95%]">
                                    <div className="rounded-full p-1 w-10 h-10 bg-bluePrimary text-white items-center flex justify-center">
                                        <p>
                                            {chat?.type === 'group' ? chat.title[0] :
                                                member?.name?.first[0] +
                                                member?.name?.last[0]}

                                        </p>
                                    </div>
                                    <div className="flex flex-col items-evenly ml-2">
                                        <p className="font-poppins text-[10px]">
                                            {chat?.type === 'group' ?
                                                chat.title + ' (group)'
                                                :
                                                member?.name?.first + ' ' + member?.name?.last
                                            }
                                        </p>
                                        <div className="flex items-center mt-1 space-x-1 w-full ">
                                            <span
                                                className={`text-blue-500 ${lastMessage?.sender?._id === userId ? "visible" : "hidden"}`}
                                            >
                                                <HiCheck />
                                            </span>
                                            <p className={`font-poppins text-[12px]  
                                            text-gray-500 ${lastMessage.content ? 'max-w-[80%]' : ''} whitespace-nowrap 
                                            overflow-hidden text-ellipsis`}>
                                                {lastMessage.content || "No message"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <p className="font-poppins text-gray-500 text-[10px]">
                                    {messageTimestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}

                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>

            {selectedChatId && <ChatDetails
                selectedChatId={selectedChatId} chats={chats} userId={userId} />}
        </div>
    );
};

export default ChatList;