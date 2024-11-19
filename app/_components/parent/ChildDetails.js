"use client"
import Image from "next/image"
import CourseText from "../CourseText"
import { useEffect, useState } from "react"
import Childbar from "./Childbar"
import ChildProfileDetails from "./ChildProfileDetails"
import ChildClasses from "./ChildExaminations"
import ChildExaminations from "./ChildExaminations"
import Assignments from "../Students/Assignments"
import ChildGrades from "./ChildGrades"
import ChildAssignments from "./ChildAssignments"
import { useRouter } from "next/navigation"

function ChildDetails({ id }) {
    const [loading, setLoading] = useState(true);

    const [active, setActive] = useState('Profile')
    const handleSetActive = (item) => {
        setActive(item)
    }
    const [data, setData] = useState(null);
    useEffect(() => {
        const fetchUser = async () => {
            const token = JSON.parse(localStorage.getItem("userData"))?.token;
            const url = `https://academiq.onrender.com/users/${id}`;
            try {
                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                });
                if (!response.ok) {
                    const errorData = await response.json();
                    console.error("Error Data:", errorData);
                    throw new Error(errorData.error || "Unknown error");
                }
                const result = await response.json();
                setData(result)
                setLoading(false)
            } catch (error) {
                console.error("Error getting user data", error);
                throw error;
            } finally {
                setLoading(false)
            }
        }
        fetchUser()

    }, [id])
    if (loading) {
        return <div className="items-center flex justify-center min-h-[40vh]
         md:min-h-[70vh] md:max-h-[100vh] mb-4
        mt-3 mx-auto w-[90%] bg-white rounded-2xl">
            <div className="w-8 h-8 rounded-full animate-spin border 
        border-solid border-cyan-500 border-t-transparent"></div>
        </div >
    }
    if (!data) {
        return <div className="items-center flex flex-col min-h-[40vh]
         md:min-h-[60vh] md:max-h-[100vh] mb-4
        mt-3 mx-auto w-[90%] font-poppins">No user data found</div>;
    }
    const {
        user: { name: { first, last },
            profilePicture: { url: picture } = {},

        } } = data
    const profileContent = picture ? (
        <Image
            src={`${picture}`}
            alt="Profile Picture"
            className="w-full h-full object-cover rounded-full"
            width={250}
            height={150}
        />
    ) : (
        <div className="w-full h-full flex items-center justify-center rounded-full bg-bluePrimary">
            <span className="text-white text-2xl font-poppins">{first[0] + ' ' + last[0]}</span>
        </div>
    );
    const fullName = `${first} ${last}`;
    return (
        <div className="items-center flex flex-col min-h-[40vh]
         md:min-h-[60vh] md:max-h-[100vh] mb-4
        mt-3 mx-auto w-[90%] bg-white rounded-2xl overflow-x-auto  scrollbar-thin
             scrollbar-track-gray-200 scrollbar-thumb-bluePrimary">
            <div className="mt-3">
                <div className="w-20 h-20 rounded-full flex items-center justify-center bg-bluePrimary">
                    {profileContent}
                </div>
            </div>
            <p className='font-poppins text-bluePrimary mt-2'>{fullName}</p>

            <div className='w-full flex flex-col bg-white 
            md:mx-8 md:mt-4  rounded-xl md:w-[90%]'>
                <div className='flex md:space-x-8 space-x-2 justify-center'>
                    <div onClick={() => handleSetActive('Profile')}>
                        <Childbar active={active === 'Profile'} name={'Profile'} />
                    </div>
                    <div
                        onClick={() => handleSetActive('Examinations')}>
                        <Childbar active={active === 'Examinations'} name={'Examinations'} />
                    </div>
                    <div onClick={() => handleSetActive('Assignments')}>
                        <Childbar active={active === 'Assignments'} name={'Assignments'} />
                    </div>
                    <div onClick={() => handleSetActive('grades')}>
                        <Childbar active={active === 'grades'} name={'grades'} />
                    </div>
                </div>
                <div className='flex-1 p-4'>
                    {active === 'Profile' && <div className="md:flex mt-6">
                        <ChildProfileDetails id={id} data={data} />
                    </div>}
                    {active === 'Examinations' && <ChildExaminations />}
                    {active === 'Assignments' && <ChildAssignments />}
                    {active === 'grades' && <ChildGrades />}
                </div>
            </div>

        </div>
    )
}

export default ChildDetails
