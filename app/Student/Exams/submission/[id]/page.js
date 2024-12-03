import '../../../../_styles/globals.css';

import { cookies } from "next/headers";
const Page = async (context) => {
    const { id } = context.params;
    const authToken = cookies().get("authToken")?.value;
    const studentId = cookies().get("userId")?.value;

    const url = `https://academiq.onrender.com/submissions/assessments/${id}/students/${studentId}`;
    let data = null;
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}`
            },
        });
        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error Data:", errorData);
            throw new Error(errorData.error || "Unknown error");
        }
        const result = await response.json();
        data = result.submission;
    } catch (error) {
        console.error("Error getting user data", error);
        throw error;
    }

    if (data) {
        const { answeredQuestions } = data.submissionData;
        const { title, duration, score, startDate, endDate } = data.assessment;

        const formatDate = (dateString) => {
            const date = new Date(dateString);
            const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
            const formattedDate = date.toLocaleDateString('en-GB', options);
            const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
            return `(${formattedDate}) ${formattedTime}`;
        }

        return (
            <div className='flex w-[90%] mx-auto flex-col min-h-[80vh] bg-white my-5
            md:mx-8 md:mt-4 rounded-xl md:max-h-[100vh] scrollbar-thin
            scrollbar-track-gray-200 scrollbar-thumb-bluePrimary overflow-y-auto md:w-[90%]'>
                <p className="font-poppins text-headline-title mx-3 px-3">{title}</p>
                <div className="flex justify-between mx-3 p-3">
                    <p className="font-poppins text-bluePrimary">Start date:
                        <span className="font-poppins text-black"> {formatDate(startDate)}</span></p>
                    <p className="font-poppins text-bluePrimary">
                        End Date: <span className="font-poppins text-black"> {formatDate(endDate)}</span>
                    </p>
                </div>
                <div className="flex justify-between mx-3 px-3">
                    <p className="font-poppins text-bluePrimary">Duration:
                        <span className="font-poppins text-black"> {duration} minutes</span></p>
                    <p className="font-poppins text-bluePrimary">Points:
                        <span className="font-poppins text-black"> {score}</span></p>
                </div>
                <hr className="w-full mt-1 h-0.2 bg-gray-100" />
                {answeredQuestions.map((answer) => {
                    const questionData = answer.answeredQuestionData.question;
                    const userAnswerStatus = answer.answer.status;
                    const userAnswer = answer.answer.text;

                    return (
                        <div key={answer.answeredQuestionData._id} className="border p-3 my-2 rounded">
                            <h4 className="font-semibold">{questionData.text}</h4>
                            <div className="flex flex-col">
                                {questionData.options.map(option => {
                                    const isCorrect = option.isCorrect;
                                    const isSelected = userAnswer === option.text;

                                    return (
                                        <div key={option._id} className={`flex items-center p-2 
                                            ${isSelected && isCorrect
                                                ? "bg-green-100" // Green background if selected and correct
                                                : isSelected && !isCorrect
                                                    ? "bg-red-100" // Red background if selected and incorrect
                                                    : ""
                                            }`}>
                                            <input
                                                type="radio"
                                                name={questionData.questionId}
                                                checked={isSelected}
                                                disabled
                                            />
                                            <label className={`ml-2 ${isCorrect ? 'text-green-600' : ''}`}>{option.text}</label>
                                            {isSelected && !isCorrect && (
                                                <span className="text-red-600 ml-2">(Your answer)</span>
                                            )}
                                            {isCorrect && !isSelected && (
                                                <span className="text-green-600 ml-2">(Correct answer)</span>
                                            )}
                                            {isCorrect && isSelected && (
                                                <span className="text-green-600 ml-2">(Your answer is Correct)</span>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                            <p className="mt-2 text-gray-500">Status: {userAnswerStatus}</p>
                        </div>
                    );
                })}
            </div>
        );
    }

    return null;
};

export default Page


/*
const Page = async (context) => {
    const { id } = context.params;
    const authToken = cookies().get("authToken")?.value;
    const studentId = cookies().get("userId")?.value;

    const url =
        `https://academiq.onrender.com/submissions/assessments/${id}/students/${studentId}`;
    let data = null;
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}`
            },
        });
        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error Data:", errorData);
            throw new Error(errorData.error || "Unknown error");
        }
        const result = await response.json();
        console.log(result)
        data = result.submission
    } catch (error) {
        console.error("Error getting user data", error);
        throw error;
    }

    if (data) {
        const { answeredQuestions } = data.submissionData
        const {
            title, duration, score, startDate, endDate
        } = data.assessment;

        const formatDate = (dateString) => {
            const date = new Date(dateString);
            const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
            const formattedDate = date.toLocaleDateString('en-GB', options); // format to "DD/MM/YYYY"
            const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }); // 12-hour format (AM/PM)
            return `(${formattedDate}) ${formattedTime}`;
        }
        return (
            <div className="flex w-[90%] mx-auto flex-col min-h-[80vh] bg-white my-5
                md:mx-8 md:mt-4 rounded-xl md:max-h-[100vh] scrollbar-thin
                scrollbar-track-gray-200 scrollbar-thumb-bluePrimary overflow-y-auto md:w-[90%]">
                <p className="font-poppins text-headline-title mx-3 px-3">{title}</p>
                <div className="flex justify-between mx-3 p-3">
                    <p className="font-poppins text-bluePrimary">
                        Start date: <span className="font-poppins text-black">{formatDate(startDate)}</span>
                    </p>
                    <p className="font-poppins text-bluePrimary">
                        End date: <span className="font-poppins text-black">{formatDate(endDate)}</span>
                    </p>
                </div>
                <div className="flex justify-between mx-3 px-3">
                    <p className="font-poppins text-bluePrimary">
                        Duration: <span className="font-poppins text-black">{duration}</span>
                    </p>
                    <p className="font-poppins text-bluePrimary">
                        Points: <span className="font-poppins text-black">{score}</span>
                    </p>
                </div>
                <hr className="w-full mt-1 h-0.2 bg-gray-100" />
                {answeredQuestions.map((answer, index) => {
                    const { question } = answer.answeredQuestionData;
                    const chosenAnswer = answer.answer?.status === "answered"
                        ? question.options.find((opt) => opt._id === answer.answer.choice)
                        : null;
                    const correctAnswer = question.options.find((opt) => opt.isCorrect);

                    return (
                        <div key={answer.answeredQuestionData._id} className="p-4 border-b">
                            <p className="font-poppins font-medium text-bluePrimary">{`Q${index + 1}: ${question.text}`}</p>
                            <div className="ml-4">
                                {question.options.map((option, idx) => (
                                    <p
                                        key={option._id}
                                        className={`font-poppins ${option._id === chosenAnswer?._id ? "text-yellow-500" : ""}
                                            ${option.isCorrect ? "text-green-500" : "text-black"}`}
                                    >
                                        {`${String.fromCharCode(65 + idx)}. ${option.text}`}
                                        {option._id === chosenAnswer?._id && " (Your Choice)"}
                                        {option.isCorrect && " (Correct Answer)"}
                                    </p>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }
}
*/