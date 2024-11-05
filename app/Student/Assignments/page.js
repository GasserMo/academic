"use client"

import CommentForm from '@/app/_components/Students/CommentForm';
import '@/app/_styles/globals.css'
import { useRef, useState } from 'react';
import { AiOutlinePaperClip } from 'react-icons/ai'; // Import the attachment icon

function Page() {
    const fileInputRef = useRef(null); // Create a ref for the file input
    const [fileName, setFileName] = useState(''); // State to hold the name of the attached file

    const handleFileUpload = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click(); // Trigger the file input click
        }
    };
    const handleFileChange = (event) => {
        const files = event.target.files;
        if (files.length > 0) {
            setFileName(files[0].name); // Set the file name to state
        }
    };
    const [isOpen, setIsOpen] = useState(false); // State to control dropdown visibility
    const [selectedOption, setSelectedOption] = useState('Active'); // State for the selected option

    const toggleDropdown = () => {
        setIsOpen(!isOpen); // Toggle the dropdown open/close
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option); // Update the selected option
        setIsOpen(false); // Close the dropdown after selection
    };
    return (
        <div className='md:flex md:flex-row flex flex-col md:justify-between'>
            <div className='flex flex-col bg-white w-full md:w-[30%] md:ml-4 mt-2 mr-4 rounded-xl'>
                <select className='m-2 p-2 border border-gray-300 focus:ring-1 focus:border-bluePrimary rounded-3xl' name='status'>
                    <option value='Active'>Active</option>
                    <option value='Upcoming'>Upcoming</option>
                    <option value='Completed'>Completed</option>
                </select>
                <div className='bg-gray-400  m-4 rounded-2xl'>
                    <div className='flex flex-col p-3'>
                        <div className='flex items-center justify-between w-full'>
                            <div className='flex items-center'>
                                <p className='font-poppins text-lg'>Subject</p>
                                <p className='font-poppins text-gray-600 text-sm ml-3'>Name</p>
                            </div>
                            <p className='font-poppins text-gray-600 text-sm'>8:00 PM</p>
                        </div>
                        <p className='font-poppins  text-sm'>I want to  view the titles of tasks or assignments assigned by my teacher...</p>
                    </div>

                </div>
            </div>
            <div className="flex flex-col md:pb-5 md:bg-white w-full md:w-[60%] md:mt-2 md:mx-8 rounded-xl  ">
                <p className=' font-poppins text-headline-small p-2'>Assignment Details</p>
                <div className='p-4'>
                    <div className='flex items-center justify-between'>
                        <p className=' font-poppins font-semibold text-lg text-bluePrimary '>Assignment Name</p>
                        <p className=' font-poppins text-sm text-greenPrimary pr-4'>points</p>

                    </div>
                    <div>
                        <p className=' font-poppins text-sm  pt-4'>Description</p>
                        <p className=' font-poppins text-sm text-gray-500 pr-4'>I want to easily view the titles of tasks or assignments assigned by my teachers for todays homework.</p>
                    </div>
                    <hr className="my-4 border-t border-gray-300" />
                    <div>
                        <p className=' font-poppins text-sm  pt-4'>Deadline</p>
                        <p className=' font-poppins text-sm text-gray-500 pr-4'>24, May 2024    (12:00 PM)</p>
                    </div>
                    <p className=' font-poppins text-lg text-bluePrimary pt-5'>Send your answer</p>
                    <div
                        className="flex items-center bg-gray-100 border border-gray-300 rounded-md p-2 mt-4 cursor-pointer"
                        onClick={handleFileUpload}
                    >
                        <AiOutlinePaperClip className="text-gray-600 mr-2" size={20} />
                        <span className="font-poppins text-gray-700">Attach a file</span>

                    </div>
                    {fileName && <p className="font-poppins text-greenPrimary">item is added Successfully
                    </p>}
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                    />
                    <CommentForm />
                    <button className='bg-blueSecondary mt-2 p-2 w-full rounded-lg text-white'>
                        Submit
                    </button>
                </div>


            </div>
        </div>
    )
}

export default Page
