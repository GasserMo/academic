"use client"
import { addMaterialsToAssessment, createAssignment, updateAssignment } from '@/app/actions/getAssignment';
import { GetAUser } from '@/app/actions/getUser';
import { useEffect, useRef, useState } from 'react';
import { AiOutlinePaperClip } from 'react-icons/ai'; // Import the attachment icon


function AddAssignment() {
    const [fileName, setFileName] = useState('');
    const fileInputRef = useRef(null);
    const [teacherCourses, setTeacherCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState("");
    const [modalData, setModalData] = useState({
        title: "",
        duration: "",
        description: "",
        courseId: "",
        startDate: "",
        endDate: "",
        score: "",

    });
    const [assignmentMaterials, setAssignmentMaterials] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setModalData({ ...modalData, [name]: value });
    };
    const handleOptionClick = (option) => {
        setSelectedOption(option); // Update the selected option
        setIsOpen(false); // Close the dropdown after selection
    };
    const handleFileUpload = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click(); // Trigger the file input click
        }
    };
    const handleFilesChange = (e) => {
        const files = e.target.files;
        setAssignmentMaterials(files);
        console.log("Selected files:", files);
    };
    /*    useEffect(() => {
           console.log("Updated assignment materials:", assignmentMaterials);
       }, [assignmentMaterials]); */
    const handleSave = async (e) => {
        const formData = new FormData();

        formData.append("title", modalData.title);
        formData.append("description", modalData.description);
        formData.append("duration", modalData.duration);
        formData.append("score", modalData.score);
        formData.append("startDate", modalData.startDate);
        formData.append("endDate", modalData.endDate);
        formData.append("courseId", modalData.courseId);
        const filesData = new FormData();
        for (let i = 0; i < assignmentMaterials.length; i++) {
            filesData.append("materials", assignmentMaterials[i]);
        }
        for (const [key, value] of filesData.entries()) {
            console.log(key, value); // This will log each key-value pair
        }
        try {
            const createdAssignment = await createAssignment({ type: "assignment" });
            const assignmentId = createdAssignment.assessment._id;
            const updatedAssignment = await updateAssignment({
                id: assignmentId,
                formData,
            });
            await addMaterialsToAssessment('6675b491e75f8503094f472c', filesData);
            console.log(filesData);

            console.log("Assignment updated successfully:", updatedAssignment);
        } catch (error) {
            console.log('Error:', error);
        }
    };
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const data = await GetAUser();
                console.log("User data is here:", data);
                setTeacherCourses(data.user.courses)
            } catch (error) {
                console.error("Error getting user data", error);
                throw error;
            }
        }
        fetchCourses();
    }, [])



    return (
        <div className="bg-white p-6 rounded-lg w-[90%] mx-auto">
            <h2 className="font-poppins text-center text-bluePrimary text-xl  mb-4">Add Assignment</h2>
            <div className="flex space-x-2">
                <input
                    type="text"
                    name="title"
                    value={modalData.title}
                    onChange={handleChange}
                    placeholder="Title"
                    className="w-full p-2 border border-gray-300 focus:outline-none focus:border-bluePrimary focus:ring-1 focus:ring-bluePrimary rounded mb-4"
                />
                <input
                    type="number"
                    name="score"
                    value={modalData.score}
                    onChange={handleChange}
                    placeholder="Score"
                    className="w-full p-2 border border-gray-300 focus:outline-none focus:border-bluePrimary focus:ring-1 focus:ring-bluePrimary rounded mb-4"

                />
            </div>
            <textarea
                name="description"
                value={modalData.description}
                onChange={handleChange}
                placeholder="Description"

                className="w-full p-2 border border-gray-300 focus:outline-none focus:border-bluePrimary focus:ring-1 focus:ring-bluePrimary rounded mb-4"

            >
            </textarea>
            <div className="flex flex-wrap justify-between space-x-2 items-center">
                <div >
                    <label className="text-[10px]">Start Date</label>
                    <input
                        type="date"
                        name="startDate"
                        value={modalData.startDate ? modalData.startDate.toISOString().substr(0, 10) : ""}
                        onChange={(e) => setModalData({ ...modalData, startDate: new Date(e.target.value) })}
                        className="w-full p-2 border border-gray-300 focus:outline-none focus:border-bluePrimary focus:ring-1 focus:ring-bluePrimary rounded mb-4"
                    />
                </div>
                <div>
                    <label className="text-[10px]">End Date</label>
                    <input
                        type="date"
                        name="endDate"
                        value={modalData.endDate ? modalData.endDate.toISOString().substr(0, 10) : ""}
                        onChange={(e) => setModalData({ ...modalData, endDate: new Date(e.target.value) })}
                        className="w-full p-2 border border-gray-300 focus:outline-none focus:border-bluePrimary focus:ring-1 focus:ring-bluePrimary rounded mb-4"
                    />
                </div>

                <div className="">
                    <label className="text-[10px]">Course</label>

                    <select
                        id="courseId"
                        name="courseId"
                        value={modalData.courseId}
                        onChange={(e) => setModalData({ ...modalData, courseId: e.target.value })}
                        className="w-full p-2 border border-gray-300 focus:outline-none focus:border-bluePrimary focus:ring-1 focus:ring-bluePrimary rounded mb-4"
                    >
                        <option value="">Select a course</option>
                        {teacherCourses.map((course) => (
                            <option key={course._id} value={course._id}>
                                {course.title}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='flex flex-col'>
                    <label className="text-[10px]">Duration</label>

                    <input
                        type="number"
                        name="duration"
                        value={modalData.duration}
                        onChange={handleChange}
                        placeholder="Duration"
                        className="border p-3 md:p-0 border-gray-300 focus:outline-none focus:border-bluePrimary focus:ring-1 focus:ring-bluePrimary rounded "
                    />
                </div>
            </div>
            <div
                className="flex items-center mb-5 bg-gray-100 border border-gray-300 rounded-md p-2 mt-4 cursor-pointer"
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
                onChange={handleFilesChange}
                className="hidden"
            />
            <div className="grid grid-cols-[50%_50%]">
                <button className="px-4 py-2 bg-gray-300 rounded mr-2">Cancel</button>
                <button onClick={() => handleSave({ modalData })} className="px-4 py-2 bg-bluePrimary text-white rounded">Save</button>
            </div>

        </div>

    )
}

export default AddAssignment
