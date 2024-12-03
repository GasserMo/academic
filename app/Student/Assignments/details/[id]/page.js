"use client"
import { getOneAssignment } from "@/app/actions/getAssignment"
import { FaCamera } from 'react-icons/fa'; // Font Awesome camera icon
import { useEffect, useRef, useState } from "react"
import { HiDocument } from "react-icons/hi2";
import { AiOutlinePaperClip } from 'react-icons/ai'; // Import the attachment icon
import { HiCheckCircle } from "react-icons/hi2";

function AssignmentDetailPage({ assignmentId, submitted }) {
    const [files, setFiles] = useState([]); // Add this line to initialize the files state

    // The rest of your code remains the same

    const handleFileUpload = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (event) => {
        const selectedFiles = Array.from(event.target.files);
        setFiles((prevFiles) => [...prevFiles, ...selectedFiles]); // Append new files to the state
    };

    const handleRemoveFile = (index) => {
        setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index)); // Remove a file from the list
    };
    const [assignment, setAssignment] = useState(null);
    const fileInputRef = useRef(null); // Create a ref for the file input
    const [isLoading, setLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);



    const handleSubmit = async () => {
        if (files.length === 0) {
            alert("Please attach at least one file before submitting.");
            return;
        }

        setIsSubmitting(true);
        try {
            // Call the API function to submit the files
            const response = await patchSubmission({ id: assignmentId, files });
            console.log("Submission successful:", response);
            alert("Files submitted successfully!");
        } catch (error) {
            console.error("Error during submission:", error);
            alert("Failed to submit files. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };


    useEffect(() => {
        setLoading(true)
        const fetchAssignment = async () => {
            try {
                const data = await getOneAssignment({ id: assignmentId });
                setAssignment(data.assessment);
            } catch (error) {
                console.error("Error fetching ONE assignment:", error);
            } finally {
                setLoading(false)
            }
        };
        fetchAssignment();
    }, [assignmentId]);

    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-GB", {
            year: "numeric",
            month: "long",
            day: "numeric"
        });
    }

    return (
        isLoading ?
            <div class="flex h-full justify-center items-center">
                <div
                    class="w-8 h-8 rounded-full animate-spin border border-solid
                 border-cyan-500 border-t-transparent">
                </div>
            </div> :
            <div className="flex  max-h-[100vh] md:justify-between overflow-y-auto  scrollbar-thin
             scrollbar-track-gray-200 flex-col bg-white my-2 md:pb-5 md:bg-white md:mt-2 md:mx-8 rounded-xl w-[90%] mx-auto" >
                <p className="font-poppins text-headline-small p-2">Assignment Details</p>
                <div className="p-4">
                    <div className="flex items-center justify-between">
                        <p className="font-poppins font-semibold text-lg text-bluePrimary">{assignment?.title}</p>
                        <p className="font-poppins text-sm text-greenPrimary pr-4">{assignment?.score} points</p>
                    </div>

                    <div>
                        <p className="font-poppins text-sm pt-4">Description</p>
                        <p className="font-poppins text-sm text-gray-500 pr-4">{assignment?.description}</p>
                    </div>

                    <hr className="my-4 border-t border-gray-300" />

                    <div>
                        <p className="font-poppins text-sm pt-4">Start Date</p>
                        <p className="font-poppins text-sm text-gray-500 pr-4">{formatDate(assignment?.startDate)}</p>
                    </div>

                    <div>
                        <p className="font-poppins text-sm pt-4">Deadline</p>
                        <p className="font-poppins text-sm text-gray-500 pr-4">{formatDate(assignment?.endDate)} (12:00 PM)</p>
                    </div>

                    <div>
                        <p className="font-poppins text-sm pt-4">Course</p>
                        <p className="font-poppins text-sm text-gray-500 pr-4">{assignment?.course.title} - {assignment?.course.department}</p>
                    </div>



                    <div>
                        <p className='font-poppins text-sm pt-4'>Materials</p>

                        {assignment?.materials?.length === 0 ?
                            <div className="flex">
                                <p className="font-poppins text-sm text-gray-500 pr-4">No Materials here</p>
                                <FaCamera size={14} color="black" />

                            </div> :
                            assignment?.materials?.map((material) => {
                                return (
                                    <li key={material._id} className="flex items-center space-x-2 mt-2">
                                        <HiDocument className="text-bluePrimary h-5 w-5" />
                                        <a
                                            href={`/path-to-file/${material.name}`} // replace with actual URL if stored remotely
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-bluePrimary hover:underline font-poppins"
                                        >
                                            {material.title}
                                        </a>
                                    </li>
                                );
                            })}
                    </div>

                    {submitted ?
                        <div className="w-full  flex mt-2 justify-center">
                            <HiCheckCircle color='#26B170' size={24} />
                            <p className="text-greenPrimary font-poppins">Submitted</p>
                        </div>
                        : (
                            <div>
                                <div
                                    className="flex items-center mb-5 bg-gray-100 border border-gray-300 rounded-md p-2 mt-4 cursor-pointer"
                                    onClick={handleFileUpload}
                                >
                                    <AiOutlinePaperClip className="text-gray-600 mr-2" size={20} />
                                    <span className="font-poppins text-gray-700">Attach files</span>
                                </div>
                                <ul>
                                    {files.map((file, index) => (
                                        <li key={index} className="flex items-center space-x-2 mt-2">
                                            <p className="font-poppins text-gray-700">{file.name}</p>
                                            <button
                                                onClick={() => handleRemoveFile(index)}
                                                className="text-red-500 hover:underline text-sm"
                                            >
                                                Remove
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    multiple // Allow multiple file selection
                                    className="hidden"
                                />
                                <button
                                    onClick={handleSubmit}
                                    disabled={isSubmitting}
                                    className="max-w-full px-4 py-2 text-center bg-bluePrimary text-white rounded mt-4"
                                >
                                    {isSubmitting ? "Submitting..." : "Submit"}
                                </button>
                            </div>
                        )}
                </div>
            </div >
    );
}

export default AssignmentDetailPage;
