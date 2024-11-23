"use client"
import Image from "next/image";
import PlusIcon from '@/public/icons/PlusIcon'

import { useState, useRef, useEffect } from "react";
import { HiEllipsisVertical } from "react-icons/hi2";
import { deleteQuestion, getOneQuestionBank } from "@/app/actions/questionBanks";
import Link from "next/link";
import Loading from "@/app/Student/loading";

function Page({ params }) {
    const [loading, setLoading] = useState(true);
    const { id } = params;
    const [showOptions, setShowOptions] = useState({}); // State for tracking options visibility
    const [isQuestionModal, setIsQuestionModal] = useState(false)
    const [selectedQuestion, setSelectedQuestion] = useState(null); // Store selected question
    const [selectedAnswer, setSelectedAnswer] = useState("");

    const questionModalRef = useRef(null); // Ref for the question modal

    const handleClickOutside = (event) => {

        if (questionModalRef.current && !questionModalRef.current.contains(event.target)) {
            handleCloseQuestionModal();
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    },);


    const optionsRef = useRef(null); // Ref for the options dropdown

    const toggleOptions = (questionId) => {
        setShowOptions((prev) => ({
            ...prev,
            [questionId]: !prev[questionId],
        }));
    };


    const handleOpenQuestionModal = (question) => {
        setSelectedQuestion(question); // Set selected question
        setIsQuestionModal(true);
    };
    const handleCloseQuestionModal = () => {
        setIsQuestionModal(false);
        setSelectedAnswer(""); // Reset selected answer when closing modal
    };

    const [questionBank, setQuestionBank] = useState([])

    async function handleDeleteQuestion(e, questionId) {
        e.stopPropagation();
        e.preventDefault();
        try {
            await deleteQuestion({ courseId: id, questionId });
            setQuestionBank((prevBank) => {
                return {
                    ...prevBank,
                    questions: prevBank.questions.filter((question) => question._id !== questionId),
                };
            });
        } catch (error) {
            console.error("Error deleting question:", error);
        }

    }
    useEffect(() => {
        const fetchQuestionBank = async () => {
            try {
                const data = await getOneQuestionBank({ id });
                console.log("Assignments are:", data);
                setQuestionBank(data.questionBank);
            } catch (error) {
                console.error("Error fetching ONE assignment:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchQuestionBank()
    }, [id])

    if (loading) {
        return <Loading />; // Show loading indicator
    }

    if (!questionBank || questionBank.length === 0) {
        return <p>No Questions available.</p>
    }
    return (
        <div className='bg-white w-[90%] mx-6 rounded-xl p-3'>
            <p className='font-poppins text-headline-small'>Unit Bank</p>

            {questionBank?.questions?.map((question, index) => {
                return (
                    <div key={question._id} className="flex items-center justify-between">
                        <div onClick={() => handleOpenQuestionModal(question)}
                            className='p-2 my-4 border flex-grow justify-between space-x-2 rounded-md
        cursor-pointer border-gray-300 flex items-center' key={question._id}>
                            <div className="flex space-x-3 items-center">
                                <p className='font-poppins text-[15px]'>
                                    {index + 1}
                                </p>
                                <p className='font-poppins text-[15px]'>
                                    {question.text}
                                </p></div>

                        </div>
                        <div className="relative " ref={optionsRef}>
                            <HiEllipsisVertical className="cursor-pointer"
                                onClick={() => toggleOptions(question._id)} // Pass question ID to toggle its options
                            />
                            {showOptions[question._id] && ( // Only show options if this question's options are true
                                <div className="absolute right-0 w-32 bg-gray-200 border border-gray-300 rounded-md shadow-md">
                                    <IconDetails image={'/icons/Edit.svg'} name={'Edit'} onClick={() => handleOpenQuestionModal(question)} />
                                    <IconDetails onClick={(e) => handleDeleteQuestion(e, question._id)}
                                        image={'/icons/Delete.svg'} name={'Delete'} />
                                </div>
                            )}
                        </div>
                    </div>

                );
            })}

            {isQuestionModal && selectedQuestion && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div ref={questionModalRef} className="flex flex-col bg-white p-2 rounded-lg w-[90%] max-w-xl">
                        <div className="flex justify-between">
                            <p className="font-poppins">MCQ</p>
                            <button onClick={handleCloseQuestionModal}>X</button>
                        </div>
                        <p className="font-poppins text-[15px] mt-5">{selectedQuestion.text}</p>
                        <div className="mt-4">
                            {selectedQuestion.options?.map((option, index) => (
                                <label key={index} className="block mb-2 space-x-2 flex items-center">
                                    <input
                                        type="radio"
                                        name="answer"
                                        value={option.text}
                                        checked={option.isCorrect}
                                        disabled
                                        className="peer hidden"  // Hide the default radio button
                                    />
                                    <div className="w-4 h-4 rounded-full border-2 border-gray-300 peer-checked:bg-bluePrimary peer-checked:border-bluePrimary"></div>
                                    <span className="ml-2">{option.text}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
            )}
            <Link href={`/Teacher/QuestionBank/unit/${id}/addQuestion`}>
                <div className='flex justify-end w-full p-1 my-4 cursor-pointer'>
                    <div className='w-[30%] p-1 space-x-2 rounded-md flex justify-center bg-bluePrimary'>
                        <p className='font-poppins text-white text-[15px]'>Add Question</p>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default Page

function IconDetails({ image, name, onClick }) {
    return (
        <div onClick={onClick} className="flex items-center cursor-pointer hover:bg-gray-400 px-2 py-1">
            <Image
                src={image}
                width={20}
                height={20}
                alt={name}
                className="mr-2"
            />
            <span className="font-poppins text-sm">{name}</span>
        </div>
    );
}
