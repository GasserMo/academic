"use client"
import { HiArrowLeft } from "react-icons/hi2";

import { CreateQuestionToExam } from "@/app/actions/examinations";
import { createQuestion } from "@/app/actions/questionBanks";
import Loading from "@/app/Student/loading";
import { useState } from "react";
import { useRouter } from "next/navigation";

function Page({ params }) {
    const { id } = params;

    const [modalData, setModalData] = useState({
        title: "",
        description: "",
        question: "",
        options: [
            { text: "", isCorrect: false },
            { text: "", isCorrect: false },
            { text: "", isCorrect: false },
            { text: "", isCorrect: false }
        ],
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSave = async () => {
        try {
            setLoading(true);
            setError(null);
            const savedData = await CreateQuestionToExam({
                id,
                modalData
            });
            setSuccess(true);
            console.log("Question saved:", savedData);

            setTimeout(() => {
                setSuccess(false);
            }, 5000);
        } catch (error) {
            const errorMessage = error.response?.data?.error || error.message || "An unknown error occurred";
            setError(errorMessage);
        } finally {

            setLoading(false); // Stop loading indicator once fetch is complete
        }
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setModalData({ ...modalData, [name]: value });
    };
    const handleOptionChange = (index, field, value) => {
        const updatedOptions = modalData.options.map((option, idx) =>
            idx === index ? { ...option, [field]: value } : option
        );
        setModalData({ ...modalData, options: updatedOptions });
    };
    const router = useRouter();

    const handleCorrectAnswerChange = (index) => {
        const updatedOptions = modalData.options.map((option, idx) => ({
            ...option,
            isCorrect: idx === index
        }));
        setModalData({ ...modalData, options: updatedOptions });
    };
    // This will navigate back to the previous page (exams list page) and reload it
    const handleCancel = () => {
        router.push(`/Teacher/Exams/details/${id}`);

        router.replace(`/Teacher/Exams/details/${id}`);
    };

    return (
        <div className="flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-[90%] max-w-full">
                <div onClick={handleCancel} className=" cursor-pointer"><HiArrowLeft />
                </div>

                <h2 className="font-poppins text-center text-bluePrimary text-xl mb-4">Add a question</h2>
                {error && <div className="text-red-500 mb-4  font-poppins">{error}</div>}
                {success && <div className="text-greenPrimary mb-4 font-poppins">Your Question is added successfully</div>}

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
                    name="question"
                    placeholder="Question"
                    value={modalData.question}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-1 focus:ring-bg-bluePrimary focus:border-bg-bluePrimary"
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={modalData.description}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-1 focus:ring-bg-bluePrimary focus:border-bg-bluePrimary"
                ></textarea>

                <label className="block mb-2 font-semibold">Options</label>
                {modalData.options.map((option, index) => (
                    <div key={index} className="flex items-center mb-2">
                        <input
                            type="text"
                            placeholder={`Option ${index + 1}`}
                            value={option.text}
                            onChange={(e) => handleOptionChange(index, "text", e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-bg-bluePrimary focus:border-bg-bluePrimary mr-2"
                        />
                        <input
                            type="radio"
                            name="correctAnswer"
                            checked={option.isCorrect}
                            onChange={() => handleCorrectAnswerChange(index)}
                            className="form-radio h-5 w-5 text-bluePrimary"
                        />
                    </div>
                ))}

                <div className="grid grid-cols-[50%_50%]">
                    <button onClick={handleCancel} className="px-4 py-2 bg-gray-300 rounded mr-2">Cancel</button>
                    <button onClick={handleSave} className="px-4 py-2 bg-bluePrimary text-white rounded">
                        {loading ? <div class="flex items-center justify-center self-center ">
                            <div
                                class="w-5 h-5 rounded-full animate-spin border border-solid border-cyan-500 border-t-transparent">
                            </div>
                        </div> : 'Save'}</button>
                </div>
            </div>
        </div>
    )
}

export default Page
