"use client"

import { getAssignmentByCourse, getAssignments } from "@/app/actions/getAssignment";
import { useEffect, useRef, useState } from "react";
import AssignmentDetailPage from "./details/[id]/page";
import Link from "next/link";

function Page() {
    const fileInputRef = useRef(null); // Create a ref for the file input
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [assignments, setAssignments] = useState([])
    const [selectedAssignmentId, setSelectedAssignmentId] = useState(null); // New state for selected ID

    const modalRef = useRef(null);
    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            handleCloseModal();
        }
    };
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    },);

    const [isOpen, setIsOpen] = useState(false); // State to control dropdown visibility
    const [selectedOption, setSelectedOption] = useState('Active'); // State for the selected option

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };


    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                const data = await getAssignments()
                console.log('data yes ' + data.assessments)
                const filterAssingment = data.assessments.filter((assessment) => assessment.status !== 'draft')
                setAssignments(filterAssingment)
            } catch (error) {
                console.log('error yes' + error)
            }
        }
        fetchAssignments()
    }, [])
    const handleAssignmentClick = (id) => {
        setSelectedAssignmentId(id); // Set selected assignment ID
    };
    return (
        <div className="md:flex md:flex-row flex flex-col md:justify-between">
            <div className='min-h-[50vh] max-h-[80vh] scrollbar-thin scrollbar-track-white scrollbar-thumb-bluePrimary overflow-y-auto
             flex flex-col bg-white  w-[90%] mx-auto md:w-[30%]
             md:ml-4 mt-2 mr-4 rounded-xl'>
                <select className='m-2 p-2 border border-gray-300 focus:ring-1 focus:border-bluePrimary rounded-3xl' name='status'>
                    <option value='Active'>Active</option>
                    <option value='Upcoming'>Upcoming</option>
                    <option value='Completed'>Completed</option>
                </select>
                {assignments && assignments.map((assignment) => (
                    <div
                        key={assignment._id}
                        onClick={() => handleAssignmentClick(assignment._id)} // Set selected assignment ID
                        className='  bg-gray-200 m-4 rounded-2xl cursor-pointer'
                    >
                        <div className='flex flex-col p-3'>
                            <p className='font-poppins text-md'>{assignment.title}</p>
                            <p className='font-poppins text-sm text-gray-400'>{assignment.description}</p>
                        </div>
                    </div>
                ))}
                <Link href={`/Teacher/Assignment/addAssignment`}>
                    <div className='font-poppins mx-4 mb-5 justify-center flex
                 text-lg text-white bg-bluePrimary rounded-md'>+ add</div>
                </Link>

            </div>
            <div className="flex-1 bg-white w-[90%] mx-auto
             md:ml-4  mt-4 mr-4 my-2 rounded-xl">
                {selectedAssignmentId ? (
                    <AssignmentDetailPage assignmentId={selectedAssignmentId} />
                ) : (
                    <div className="flex h-full items-center  justify-center text-gray-500 font-poppins">
                        Select an assignment to view its details.
                    </div>
                )}
            </div>
        </div>
    )
}

export default Page
