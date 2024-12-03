"use client"
import { useEffect, useState } from 'react';
import '../../../../_styles/globals.css'; // Ensure your global styles are being imported

import { createSubmission, getStartedSubmission, submitExam } from '@/app/actions/submissions';
import { getOneAssignment } from '@/app/actions/getAssignment';
import { useRouter } from 'next/navigation';

function Page(context) {
    const router = useRouter(); // Use Next.js router to navigate programmatically

    const { id } = context.params;
    const [data, setData] = useState(null)
    const [answers, setAnswers] = useState({})
    const [hasSubmitted, setHasSubmitted] = useState(false); // State flag to track submission

    useEffect(() => {
        const fetchAssessment = async () => {
            try {
                const response = await getOneAssignment({ id });
                const startedSubmission = await getStartedSubmission({ id });

                if (startedSubmission.error === "Submission not found") {
                    console.warn("No submission exists. Proceeding to allow a new submission.");
                    setData(response.assessment);
                } else if (startedSubmission.submission) {
                    const { submittedAt } = startedSubmission.submission;
                    if (submittedAt && !hasSubmitted) { // Only show the alert once
                        alert("You have already submitted this exam.");
                        setHasSubmitted(true); // Set flag to prevent alert from showing again
                        router.push("/Student/Exams"); // Redirect to the desired path
                    } else {
                        console.log("Ongoing submission detected. Proceeding...");
                        setData(response.assessment);
                    }
                } else {
                    throw new Error("Unexpected response format");
                }
            } catch (err) {
                console.error("Error fetching assessment:", err);
            }
        };
        fetchAssessment();
    }, [id, router, hasSubmitted]);

    const handleChange = (e, questionId) => {
        const { value } = e.target;  // Extract the value (the option selected)

        console.log("Selected Value:", value);
        console.log("Question ID:", questionId);

        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionId]: {  // Use the questionId to store answers
                questionId: questionId,
                optionId: value,  // Store the optionId selected
            },
        }));
    };

    const handleSubmission = async () => {
        try {
            const answerValues = Object.values(answers).map(answer => ({
                questionId: answer.questionId,
                optionId: answer.optionId
            }));
            console.log("Submitting Answers:", answerValues);
            const response = await createSubmission({ id })
            console.log(response)
            const started = await getStartedSubmission({ id })
            console.log(started)

            const submitt = await submitExam({ id, answers: answerValues });
            console.log(submitt)

            alert("Exam submitted successfully!");
        } catch (err) {
            console.error("Error submitting exam:", err);
        }
    };

    if (data) {
        const {
            title, course, duration, score, startDate, questions, endDate
        } = data;
        const formatDate = (dateString) => {
            const date = new Date(dateString);
            const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
            const formattedDate = date.toLocaleDateString('en-GB', options); // format to "DD/MM/YYYY"
            const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }); // 12-hour format (AM/PM)
            return `(${formattedDate}) ${formattedTime}`;
        }
        return (
            <div className=' flex w-[90%] mx-auto flex-col min-h-[80vh] bg-white my-5
            md:mx-8 md:mt-4 rounded-xl md:max-h-[100vh] scrollbar-thin
                 scrollbar-track-gray-200 scrollbar-thumb-bluePrimary overflow-y-auto md:w-[90%]'>
                <p className="font-poppins text-headline-title mx-3 px-3">{title}</p>
                <div className="flex justify-between mx-3 p-3">
                    <p className="font-poppins text-bluePrimary">
                        Course : <span className="font-poppins text-black"> {course.title}</span></p>
                    <p className="font-poppins  text-bluePrimary">Start date :
                        <span className="font-poppins text-black"> {formatDate(startDate)}</span> </p>
                    <p className="font-poppins  text-bluePrimary">
                        End Date :<span className="font-poppins text-black"> {formatDate(endDate)}</span>
                    </p>
                </div>
                <div className="flex justify-between mx-3 px-3">
                    <p className="font-poppins  text-bluePrimary">Duration :
                        <span className="font-poppins text-black"> {duration}</span></p>
                    <p className="font-poppins  text-bluePrimary">Points :
                        <span className="font-poppins text-black"> {score}</span></p>
                </div>
                <hr className="w-full mt-1 h-0.2 bg-gray-100" />
                {questions.map((question, index) => (
                    <div key={question.question.id} className="p-2">
                        <div className="flex items-center justify-between font-poppins text-headline-title">
                            {index + 1 + ')'} {question.question.text}
                        </div>
                        <div>
                            {question.question.options.map((option) => (
                                <div key={option.id}>
                                    <label className="flex mb-2 space-x-2 items-center">
                                        <input
                                            type="radio"
                                            name={`question-${question.question.id}`} // Group by question ID
                                            value={option.id} // Use option ID as value
                                            onChange={(e) => handleChange(e, question.question.id)} // Pass question.question.id
                                            className="peer"
                                        />
                                        <span className="ml-2">{option.text}</span>
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                <button
                    onClick={handleSubmission}
                    className="bg-bluePrimary text-white p-2 rounded-md mx-auto mt-4 w-32"
                >
                    Submit
                </button>

            </div>
        )
    }
}
export default Page
