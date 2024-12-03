"use client"
import { GetAUser } from '@/app/actions/getUser'
import { createQuestionBank, getQuestionBanks } from '@/app/actions/questionBanks'
import Loading from '@/app/Student/loading'
import PlusIcon from '@/public/icons/PlusIcon'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

function Page() {
    const [questionBanks, setQuestionBanks] = useState([])
    const [loading, setLoading] = useState(true);
    const [teacherCourses, setTeacherCourses] = useState([]);
    const createBankRef = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedCourse, setSelectedCourse] = useState("");
    const [error, setError] = useState('')
    const [modalData, setModalData] = useState({
        title: "",
        description: "",
        courseId: "",
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setModalData({ ...modalData, [name]: value });
    };
    const handleSave = async () => {
        try {
            setLoading(true);
            setError(null);
            const savedData = await createQuestionBank({
                courseId: selectedCourse,
                modalData
            });
            console.log("Question saved:", savedData);
            setQuestionBanks((prevQuestionBanks) => [
                ...prevQuestionBanks,
                savedData,
            ]);
            setIsModalOpen(false);

        } catch (error) {
            const errorMessage = error.response?.data?.error || error.message || "An unknown error occurred";
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        const fetchQuestionBanks = async () => {
            try {
                const data = await getQuestionBanks();
                console.log("Assignments are:", data);
                setQuestionBanks(data.questionBanks);
            } catch (error) {
                console.error("Error fetching ONE assignment:", error);
            } finally {
                setLoading(false);
            }
        }
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
        fetchQuestionBanks();
    }, [])

    const handleClickOutside = (event) => {
        if (createBankRef.current && !createBankRef.current.contains(event.target)) {
            handleCloseModal();
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    },);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    if (loading) {
        return <Loading />;
    }
    if (!questionBanks || questionBanks.length === 0) {
        return <p>No Question Banks available.</p>
    }

    return (
        <div className='bg-white w-[90%] mx-6 rounded-xl p-3'>
            {isModalOpen && <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                <div ref={createBankRef} className="flex flex-col bg-white p-2 rounded-lg w-[90%] max-w-xl">
                    <div className="flex items-center justify-center">
                        <div className="bg-white p-6 rounded-lg w-[90%] max-w-full">
                            <h2 className="font-poppins text-center text-bluePrimary text-xl mb-4">Create Question Bank</h2>
                            {error && <div className="text-red-500 mb-4">{error}</div>}

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
                                placeholder="description"
                                value={modalData.description}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-1 focus:ring-bg-bluePrimary focus:border-bg-bluePrimary"
                            />
                            <div className="mb-4">
                                <label htmlFor="courseId" className="block mb-2 text-sm font-medium">Select Course</label>
                                <select
                                    id="courseId"
                                    name="courseId"
                                    value={selectedCourse}
                                    onChange={(e) => setSelectedCourse(e.target.value)}
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



                            <div className="grid grid-cols-[50%_50%]">
                                <button onClick={handleCloseModal} className="px-4 py-2 bg-gray-300 rounded mr-2">Cancel</button>
                                <button onClick={handleSave} className="px-4 py-2 bg-bluePrimary text-white rounded">
                                    {loading ? <div class="flex items-center justify-center self-center ">
                                        <div
                                            class="w-5 h-5 rounded-full animate-spin border border-solid border-cyan-500 border-t-transparent">
                                        </div>
                                    </div> : 'Save'}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
            <p className='font-poppins text-headline-small'>Question Banks</p>

            <div onClick={() => handleOpenModal()} className='md:w-[30%] p-1 my-4 border space-x-2 rounded-md
             border-bluePrimary flex items-center cursor-pointer'>
                <PlusIcon />
                <p className='font-poppins text-bluePrimary text-[15px]'>Create Question Bank</p>
            </div>

            {questionBanks.map((question) => (
                <div key={question._id}>
                    <Link href={`/Teacher/QuestionBank/unit/${question._id}`}>
                        <div className='p-2 my-4 border justify-between space-x-2 rounded-md border-gray-300 flex items-center'>
                            <p className='font-poppins text-[15px]'>{question.title}</p>
                            <p className='font-poppins text-[15px]'>{question.questions?.length} Questions</p>
                        </div>
                    </Link>
                </div>
            ))}
        </div>


    )
}

export default Page
