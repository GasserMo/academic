import DeleteQuestionButton from "@/app/_components/DeleteQuestionButton";
import { cookies } from "next/headers";
import Link from "next/link";
import { HiOutlineTrash } from "react-icons/hi2";

const Page = async (context) => {
    const { id } = context.params;
    const authToken = cookies().get("authToken")?.value;
    const url = `https://academiq.onrender.com/assessments/${id}`;
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
        data = result.assessment
    } catch (error) {
        console.error("Error getting user data", error);
        throw error;
    }

    if (data) {
        const {
            status, title, course, duration, score, startDate, questions, endDate
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
                {questions.length > 0 ? (
                    questions.map((question, index) => (
                        <div key={question._id} className="p-2">
                            <div className="flex items-center justify-between font-poppins text-headline-title">
                                {index + 1 + ')'} {question.text}
                                {status === 'pending' &&
                                    <DeleteQuestionButton
                                        questionId={question._id}
                                        assessmentId={id}
                                    />}</div>
                            <div className="">
                                {question.options.map((option, index) => (
                                    <div key={option._id}>
                                        <label className="flex mb-2 space-x-2 items-center">
                                            <input
                                                type="radio"
                                                name="answer"
                                                value={option.text}
                                                checked={option.isCorrect}
                                                disabled
                                                className="peer hidden" // Hide the default radio button
                                            />
                                            <div className={`w-4 h-4 rounded-full border-2 border-gray-300 ${option.isCorrect ? 'bg-bluePrimary border-bluePrimary' : ''}`}></div>
                                            <span className="ml-2">{option.text}</span>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500 font-poppins mt-3">No questions available for this exam.</p> // Display message if no questions
                )}
                {status === 'pending' &&
                    <div className="flex flex-col">
                        <p className="font-poppins m-3">Do you want to....</p>
                        <div className="flex m-5 justify-center space-x-4 ">

                            <Link className="cursor-pointer hover:bg-blueSecondary
                            flex p-3 rounded-xl w-[30%] items-center justify-center bg-bluePrimary
                            text-white" href={`/Teacher/Exams/details/${id}/addQuestion`}>
                                <div className="">
                                    Add Question
                                </div>
                            </Link>
                        </div>

                    </div>}

            </div>
        )
    }
}
export default Page
