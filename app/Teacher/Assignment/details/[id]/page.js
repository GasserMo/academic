"use client"
import { getOneAssignment } from "@/app/actions/getAssignment"
import { FaCamera } from 'react-icons/fa'; // Font Awesome camera icon
import { useEffect, useState } from "react"
import { HiDocument } from "react-icons/hi2";

function AssignmentDetailPage({ assignmentId }) {

    const [assignment, setAssignment] = useState(null);

    const [isLoading, setLoading] = useState(false);

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

    const addMaterial = async (e) => {

        try {
            const createdAssignment = await addMaterial();
            const assignmentId = createdAssignment.assessment._id;
            const updatedAssignment = await updateAssignment({ id: assignmentId, modalData });
            console.log("Assignment updated successfully:", updatedAssignment);
        } catch (error) {
            console.log('HERE' + error)
        }

    }

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
            <div div className="flex flex-col bg-white my-2 md:pb-5 md:bg-white md:mt-2 md:mx-8 rounded-xl w-[90%] mx-auto" >
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
                        <p className="font-poppins text-sm pt-4">Status</p>
                        <p className="font-poppins text-sm text-gray-500 pr-4">{assignment?.status}</p>
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
                </div>
            </div >
    );
}

export default AssignmentDetailPage;
