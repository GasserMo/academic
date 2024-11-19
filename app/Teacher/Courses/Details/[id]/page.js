"use client"
import CourseText from "@/app/_components/CourseText";
import Assignments from "@/app/_components/Students/Assignments";
import Files from "@/app/_components/Students/Files";
import Posts from "@/app/_components/Students/Posts";
import Students from "@/app/_components/Students/Students";
import { getPosts } from "@/app/actions/discussions";
import { getOneCourse } from "@/app/actions/getOneCourse";
import { useEffect, useState } from "react";

function Page(context) {
    const { id } = context.params;
    const [active, setActive] = useState('Posts')
    const [posts, setPosts] = useState(null);
    const handleSetActive = (item) => {
        setActive(item)
    }

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await getPosts({ id });
                console.log("Fetched data:", data);

                setPosts(data.discussion.posts);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        }

        fetchPosts();
        /*  const intervalId = setInterval(fetchPosts, 10000);
         return () => clearInterval(intervalId); */
    }, [id])
    let studentId = null
    useEffect(() => {
        const fetchOneCourse = async () => {
            try {
                const data = await getOneCourse({ id });
                console.log("ONE COURSE data:", data);
                studentId = data.course.gradeClass._id;
            } catch (error) {
                console.error("Error fetching ONE course:", error);
            }
        }
        fetchOneCourse();

    }, [id])
    const addNewPost = (post) => {
        setPosts((prevPosts) => [...prevPosts, post]);
    };
    return (
        <div className='flex flex-col md:flex   md:flex-row '>

            <div className=' flex w-[90%] mx-auto flex-col min-h-[80vh] bg-white my-5
        md:mx-8 md:mt-4 rounded-xl md:w-[60%]'>
                <p className=' font-poppins text-headline-small p-5'>Course Details</p>

                <div className='flex space-x-4 justify-center'>
                    <div onClick={() => handleSetActive('Posts')}>
                        <CourseText active={active === 'Posts'} name={'Posts'} />
                    </div>
                    <div onClick={() => handleSetActive('File')}>
                        <CourseText active={active === 'File'} name={'File'} />
                    </div>
                    <div onClick={() => handleSetActive('Students')}>
                        <CourseText active={active === 'Students'} name={'Students'} />
                    </div>
                    <div onClick={() => handleSetActive('Assignments')}>
                        <CourseText active={active === 'Assignments'} name={'Assignments'} />
                    </div>
                </div>
                <div className='flex-1 p-4'>
                    {active === 'Posts' && <Posts id={id} posts={posts} addNewPost={addNewPost} />}
                    {active === 'File' && <Files id={id} />}
                    {active === 'Students' && <Students id={studentId} />}
                    {active === 'Assignments' && <Assignments id={id} />}
                </div>


            </div>
        </div>
    )
}

export default Page
