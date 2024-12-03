"use client"
import CommentForm from '@/app/_components/Students/CommentForm';
import '@/app/_styles/globals.css'
import { getAssignments } from '@/app/actions/getAssignment';
import { useEffect, useRef, useState } from 'react';
import { HiCheckCircle } from "react-icons/hi2";
import AssignmentDetailPage from './details/[id]/page';

function Page() {
    const fileInputRef = useRef(null); // Create a ref for the file input
    const [assignments, setAssignments] = useState([])
    const [selectedAssignmentId, setSelectedAssignmentId] = useState(null); // New state for selected ID
    const [loading, setLoading] = useState(true); // State for loading

    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('Active'); // State for the selected option

    const toggleDropdown = () => {
        setIsOpen(!isOpen); // Toggle the dropdown open/close
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option); // Update the selected option
        setIsOpen(false); // Close the dropdown after selection
    };

    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                const data = await getAssignments()
                console.log(data.assessments)
                const filterAssingment = data.assessments.filter((assessment) =>
                    assessment.status !== 'draft' && assessment.status !== 'pending')
                setAssignments(filterAssingment)
            } catch (error) {
                console.log('error yes' + error)
                setLoading(false);
            } finally {
                setLoading(false); // Set loading to false when data is fetched
            }
        }
        fetchAssignments()
    }, [])
    const handleAssignmentClick = (id) => {
        setSelectedAssignmentId(id); // Set selected assignment ID
    };
    const selectedAssignment = assignments.find(assignment => assignment._id === selectedAssignmentId);

    return (
        <div className='md:flex md:flex-row flex flex-col scrollbar-thumb-bluePrimary'>
            <div className='flex flex-col bg-white min-h-[80vh]
         max-h-[100vh] overflow-y-auto scrollbar-thin scrollbar-track-gray-200
         w-[90%] mx-auto md:w-[30%] md:ml-4 mt-2 mr-4 rounded-xl '>
                {/* <select className='m-2 p-2 border border-gray-300 focus:ring-1 focus:border-bluePrimary rounded-3xl' name='status'>
                    <option value='Active'>Active</option>
                    <option value='Upcoming'>Upcoming</option>
                    <option value='Completed'>Completed</option>
                </select> */}
                {loading ? (
                    <div className="mt-3 flex  h-full justify-center items-center">
                        <div className="flex items-center justify-center self-center ">
                            <div className="w-8 h-8 rounded-full animate-spin border 
                     border-solid border-cyan-500 border-t-transparent"></div>
                        </div>
                    </div>
                ) : (
                    assignments.map((assignment) => (
                        <div
                            key={assignment._id}
                            onClick={() => handleAssignmentClick(assignment._id)} // Set selected assignment ID
                            className='bg-gray-200 m-4 rounded-2xl flex justify-between cursor-pointer'>
                            <div className='flex flex-col p-3'>
                                <p className='font-poppins text-md'>{assignment.title}</p>
                                <p className='font-poppins text-sm text-gray-400'>{assignment.description}</p>
                            </div>
                            <div className='p-3'>
                                {assignment.isSubmitted ? <HiCheckCircle color='#26B170' /> : ''}
                            </div>
                        </div>
                    ))
                )}
            </div>
            <div className="flex-1 bg-white w-[90%] mx-auto
             md:ml-4 mt-4  mr-4 my-2 rounded-xl">
                {selectedAssignmentId ? (
                    <AssignmentDetailPage
                        submitted={selectedAssignment.isSubmitted}
                        assignmentId={selectedAssignmentId} />
                ) : (
                    <div className="flex h-full  items-center  justify-center text-gray-500 font-poppins">
                        Select an assignment to view its details.
                    </div>
                )}
            </div>
        </div>
    )
}

export default Page
