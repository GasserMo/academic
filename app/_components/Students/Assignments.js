"use client"
import { HiEllipsisVertical, HiDocument } from "react-icons/hi2";
import PlusIcon from '@/public/icons/PlusIcon'
import Image from 'next/image'
import { useEffect, useState } from "react";
import { getAssignmentByCourse } from "@/app/actions/getAssignment";
import { AiOutlineLink } from 'react-icons/ai'; // Example icon from react-icons
import Link from "next/link";
import { GetAUser } from "@/app/actions/getUser";

function Assignments({ id }) {
    const [role, setRole] = useState('')

    useEffect(() => {
        const getUser = async () => {
            const data = await GetAUser()
            console.log(data.user)
            setRole(data.user.role)
            console.log('role is ' + role)
        }
        getUser()

    }, [])
    const [assignments, setAssignments] = useState([])
    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                const data = await getAssignmentByCourse({ id });
                console.log("Assignmetns are:", data);
                setAssignments(data.assessments)
            } catch (error) {
                console.error("Error fetching ONE course:", error);
            }
        }
        fetchAssignments()
    }, [id])

    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-GB", {
            year: "numeric",
            month: "long",
            day: "numeric"
        });
    }
    return (
        <div>
            {role === 'teacher' && <Link href={`/Teacher/Assignment/addAssignment`}>
                <div className='w-[90%] md:w-[90%] mx-auto p-2 my-2 border space-x-2 rounded-md
             border-gray-300 flex items-center cursor-pointer'>
                    <PlusIcon />
                    <p>Add Assignment</p>
                </div>
            </Link>}
            {assignments.length === 0 ? (
                <p className="font-poppins text-center">No Assignments available</p>
            ) : (
                assignments.map((assignment) => (
                    <div key={assignment._id} className='w-[90%] md:w-[90%] justify-between flex flex-col mx-auto p-2 my-2 border rounded-md
                    border-gray-300 '>
                        <div className='flex flex-row justify-between'>
                            <div className='flex'>
                                <div className='h-14 w-14 rounded-full bg-sky-900'>
                                    <Image
                                        src='/learn.png'
                                        alt="Image"
                                        width={150}
                                        height={120}
                                    />
                                </div>
                                <div className='flex flex-col justify-evenly ml-2'>
                                    <p className='font-poppins'>{assignment.title}</p>
                                    <p className='font-poppins text-gray-400'>{formatDate(assignment.startDate)}</p>
                                </div>
                            </div>
                            <Link href={`/Student/Assignments`} >
                                <AiOutlineLink className="text-bluePrimary cursor-pointer
                             hover:text-blue-600 text-2xl" /></Link>

                        </div>

                        <p className='py-4 '>Deadline : {formatDate(assignment.endDate)} </p>
                        <div className='flex'>
                            <div className='h-5 w-5 rounded-full bg-sky-900'>
                                <Image
                                    src='/learn.png'
                                    alt="Image"
                                    width={150}
                                    height={120}
                                />
                            </div>
                            <div className='flex flex-col justify-evenly ml-2'>
                                <p className='font-poppins'>Assignment requirements</p>
                            </div>
                        </div>
                        {assignment.materials.length === 0 ?
                            <p className="font-poppins text-center">No Materials here</p> :
                            assignment?.materials?.map((material) => {
                                return <li key={material?._id} className="flex items-center space-x-2 mt-2">
                                    <HiDocument className="text-bluePrimary h-5 w-5" />
                                    <a
                                        href={`/path-to-file/${material?.name}`} // replace with actual URL if stored remotely
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-bluePrimary hover:underline overflow-x-hidden font-poppins"
                                    >
                                        {material?.title}
                                    </a>
                                </li>
                            })}



                    </div>
                ))
            )}
        </div>
    )
}

export default Assignments
