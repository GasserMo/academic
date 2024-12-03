'use client'

import { createAssignment, updateAssignment } from "@/app/actions/getAssignment";
import { GetAUser } from "@/app/actions/getUser";
import { useEffect, useState } from "react";

function Page() {
    const [success, setSuccess] = useState(false)
    const [isCreating, setIsCreating] = useState(false)
    const [selectedCourseId, setSelectedCourseId] = useState("");  // Store the _id of the selected course
    const [teacherCourses, setTeacherCourses] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");  // Use a single value for selected level
    const levels = Array.from({ length: 12 }, (_, i) => i + 1);  // Grades from 1 to 12

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const data = await GetAUser();
                console.log("User data is here:", data);
                setTeacherCourses(data.user.courses);
            } catch (error) {
                console.error("Error getting user data", error);
            }
        };
        fetchCourses();
    }, []);
    const validateInputs = () => {
        if (!modalData.title.trim()) {
            return "Title is required.";
        }
        if (!modalData.description) {
            return "Please add a description.";
        }
        if (isNaN(modalData.duration) || modalData.duration <= 0) {
            return "Duration must be a positive number.";
        }
        if (!selectedCourseId) {
            return "Please select a course.";
        }

        if (!modalData.startDate) {
            return "Start Date is required.";
        }
        if (!modalData.endDate) {
            return "End Date is required.";
        }
        if (new Date(modalData.startDate) >= new Date(modalData.endDate)) {
            return "End Date must be later than Start Date.";
        }
        return null; // No errors
    };
    const [modalData, setModalData] = useState({
        title: "",
        duration: 0,
        courseId: null,
        description: "",
        startDate: "",
        endDate: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setModalData({ ...modalData, [name]: value });
        console.log(name, value)
    };

    const handleSave = async () => {
        setSuccess(false)

        setErrorMessage("");
        const error = validateInputs();
        if (error) {
            setErrorMessage(error); // Display the error message
            return; // Stop execution if validation fails
        }
        const durationNumber = Number(modalData.duration);

        const body = {
            'title': `${modalData.title}`,
            'duration': durationNumber,  // Ensure duration is a number
            'description': `${modalData.description}`,
            'courseId': `${selectedCourseId}`,  // Use the selected course _id
            'startDate': `${new Date(modalData.startDate).toISOString()}`,
            'endDate': `${new Date(modalData.endDate).toISOString()}`,
        };

        console.log("Course ID being sent:", selectedCourseId);  // Log the courseId to verify it's correct
        console.log("Modal Data:", body);
        console.log("Duration as Number:", durationNumber);  // Log to ensure it's a number

        try {
            setIsCreating(true)
            const createdAssignment = await createAssignment({ type: "exam", title: 'modalData.title' });
            const assignmentId = createdAssignment.assessment._id;

            const updatedAssignment = await updateAssignment({
                id: assignmentId,
                formData: body,  // Send the body with the correct structure
            });

            console.log("Updated Assignment:", updatedAssignment);
            if (updatedAssignment.assessment.status === 'pending') {
                console.log('pending right')
                setSuccess(true)
            }
        } catch (error) {
            console.error("Error saving assignment:", error);
            setIsCreating(false)

        } finally {
            setIsCreating(false)

        }
    };

    return (
        <div className='flex flex-col md:flex md:flex-row '>
            <div className='flex w-full mx-auto flex-col min-h-[80vh] bg-white my-5
                    md:mx-8 md:p-4 md:mt-4 p-4 rounded-xl md:w-[90%]'>

                <p className='font-poppins text-headline-small py-5'>Create Exam</p>
                {success && <p className="font-poppins text-greenPrimary">Your Exams is created successfully</p>}
                {errorMessage && <p className="font-poppins text-red-500">{errorMessage}</p>}

                <div>
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={modalData.title}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-1 focus:ring-bg-bluePrimary focus:border-bg-bluePrimary"
                    />
                    <input
                        type="text"
                        name="description"
                        placeholder="Description"
                        value={modalData.description}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-1 focus:ring-bg-bluePrimary focus:border-bg-bluePrimary"
                    />
                    <input
                        type="number"
                        name="duration"
                        placeholder="Duration"
                        value={modalData.duration}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-1 focus:ring-bg-bluePrimary focus:border-bg-bluePrimary"
                    />

                    <div className="mb-4">
                        <label htmlFor="courseId" className="block mb-2 text-sm font-medium">Select Course</label>
                        <select
                            id="courseId"
                            name="courseId"
                            value={selectedCourseId}  // Use the _id of the selected course
                            onChange={(e) => {
                                setSelectedCourseId(e.target.value);
                                setModalData({ ...modalData, courseId: e.target.value })
                                console.log("Selected course _id:", e.target.value);  // Log the selected course _id
                            }}  // Update the selected course _id
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-bg-bluePrimary focus:border-bg-bluePrimary"
                        >
                            <option value="">Select a course</option>
                            {teacherCourses.map((course) => (
                                <option key={course._id} value={course._id}>
                                    {course.title}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* <div className="mb-4">
                        <label htmlFor="gradeId" className="block mb-2 text-sm font-medium">Select Grade</label>
                        <select
                            id="gradeId"
                            name="gradeId"
                            value={selectedLevel}
                            onChange={(e) => setSelectedLevel(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-bg-bluePrimary focus:border-bg-bluePrimary"
                        >
                            <option value="">Select a Grade</option>
                            {levels.map((level) => (
                                <option key={level} value={level}>
                                    Grade {level}
                                </option>
                            ))}
                        </select>
                    </div> */}

                    <div>
                        <label className="text-[10px]">Start Date</label>
                        <input
                            type="datetime-local"
                            name="startDate"
                            value={modalData.startDate}
                            onChange={(e) => setModalData({ ...modalData, startDate: e.target.value })}
                            className="w-full p-2 border border-gray-300 focus:outline-none focus:border-bluePrimary focus:ring-1 focus:ring-bluePrimary rounded mb-4"
                        />
                    </div>

                    <div>
                        <label className="text-[10px]">End Date</label>
                        <input

                            type="datetime-local"
                            name="endDate"
                            value={modalData.endDate}
                            onChange={(e) => setModalData({ ...modalData, endDate: e.target.value })}
                            className="w-full p-2 border border-gray-300 focus:outline-none focus:border-bluePrimary focus:ring-1 focus:ring-bluePrimary rounded mb-4"
                        />
                    </div>
                </div>

                <div
                    onClick={handleSave}
                    className="p-4 cursor-pointer my-3 text-center bg-bluePrimary text-white rounded mr-2"
                >
                    {isCreating ? (
                        <div className="lex justify-center items-center h-full ">
                            <div className="flex items-center justify-center self-center ">
                                <div className="w-6 h-6 rounded-full animate-spin border 
                 border-solid border-cyan-500 border-t-transparent"></div>
                            </div>
                        </div>
                    ) : (
                        <p className="font-poppins text-white">Create Exam</p>
                    )}
                </div>

            </div>
        </div>
    );
}

export default Page;
