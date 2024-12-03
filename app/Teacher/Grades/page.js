"use client"

import { getAssessmentByStatus } from "@/app/actions/getAssignment";
import { getSubmissionGrades } from "@/app/actions/grades";
import SmCircle from "@/public/icons/Circle";
import { useEffect, useState } from "react";

function Page() {
    const [exams, setExams] = useState([])
    const [selectedExam, setSelectedExam] = useState("");
    const [grades, setGrades] = useState([])
    const [fullScore, setFullScore] = useState('')
    const [loading, setLoading] = useState(false)
    const fetchExams = async () => {
        try {
            const data = await getAssessmentByStatus();
            if (data?.assessments?.length > 0) {
                setExams(data.assessments);
            } else {
                console.error("No assessments found");
            }
        } catch (error) {
            console.error("Error fetching grade courses: ", error);
        }
    };
    useEffect(() => {
        fetchExams()
    }, [])
    const fetchExamGrades = async () => {
        if (!selectedExam) {
            console.warn("No exam selected, skipping grade fetch.");
            return;
        }
        setLoading(true); // Start loading

        try {
            const data = await getSubmissionGrades({ examId: selectedExam });
            setGrades(data?.submissions?.studentsScores);
            setFullScore(data?.submissions?.assessment?.score);

            console.log(data)
        } catch (error) {
            console.error("Error fetching grade courses: ", error);
        } finally {
            setLoading(false); // Start loading

        }
    };
    useEffect(() => {
        if (selectedExam) {
            fetchExamGrades();
        }
    }, [selectedExam]);

    const handleExamChange = (e) => {
        setSelectedExam(e.target.value);
    };
    const studentGradePercentage = (grade, totalScore) => {
        if (!totalScore || totalScore <= 0) return "0.00%"; // Handle division by zero or invalid total score
        const percentage = (grade / totalScore) * 100;
        return `${percentage.toFixed(2)}%`;
    }
    const calculateSuccessPercentage = () => {
        const passed = grades.filter(
            (grade) => grade?.submission?.score / fullScore >= 0.5
        );
        return (passed.length / grades?.length).toFixed(2) * 100;
    };

    return (
        <div>
            <div className='flex flex-col w-[90%] mx-auto md:min-h-[80vh] md:max-h-[100vh]
        bg-white mt-4 scrollbar-thin scrollbar-track-gray-200 scrollbar-thumb-bluePrimary overflow-y-auto
        md:ml-6 rounded-xl overflow-x-hidden'>
                <div className="flex justify-between items-center">
                    <p className='ml-6 text-headline-medium
            font-poppins text-md '>Grades</p>
                    <select
                        name="priority"
                        value={selectedExam || ""}
                        onChange={handleExamChange}
                        className="md:w-[20%] m-5 p-2 mb-4 border rounded-lg
                         bg-blueHover text-gray-700  focus:outline-none 
                         focus:ring-2 focus:ring-bluePrimary scrollbar-thin scrollbar-track-gray-200 scrollbar-thumb-bluePrimary"
                        required
                    >
                        <option value="" disabled selected>Select Exam</option>

                        {exams.map((exam) => (
                            <option className="bg-blueHover text-gray-800  focus:outline-none"

                                key={exam._id}
                                value={exam._id}>
                                {exam.title}

                            </option>

                        ))}
                    </select>

                </div>
                <div className="flex  flex-wrap ml-3 md:space-x-4">
                    <p className="font-poppins text-headline-title">Grade Sheet</p>
                    <div className="flex space-x-2">
                        <div className="flex items-center gap-1">
                            <SmCircle color={"#26B170"} />

                            <p className="font-poppins">{calculateSuccessPercentage() || '0'}% Passed</p>
                        </div>
                        <div className="flex items-center gap-1">
                            <SmCircle color={"#FE626B"} />
                            <p className="font-poppins">{100 - calculateSuccessPercentage() || '0'}% Failed</p>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between ">
                    <div className="md:w-[80%] w-[60%]  flex items-center justify-center  bg-blueHover rounded-xl p-2 m-2 md:p-3">
                        <p className="font-poppins text-sm md:text-md text-bluePrimary">Name</p>
                    </div>
                    <div className="md:w-[10%] w-[20%]  flex items-center justify-center   bg-blueHover m-2 p-2 md:p-3 rounded-xl">
                        <p className="font-poppins text-sm md:text-md text-bluePrimary">Score: {fullScore}</p>
                    </div>
                    <div className="md:w-[10%] w-[20%]  flex items-center justify-center   bg-blueHover m-2 p-2 md:p-3 rounded-xl">
                        <p className="font-poppins text-sm md:text-md text-bluePrimary">Status</p>
                    </div>


                </div>
                <hr className="w-full mt-1 h-0.3 bg-bluePrimary" />
                {selectedExam ? (
                    <>
                        {loading ? (
                            <div className="mt-3 flex justify-center items-center w-full h-[40vh]">
                                <div className="flex items-center justify-center self-center">
                                    <div className="w-12 h-12 rounded-full animate-spin border border-solid border-cyan-500 border-t-transparent"></div>
                                </div>
                            </div>
                        ) : (
                            <div>
                                {grades.map((grade) => (
                                    <div className="flex" key={grade.student._id}>
                                        <div className="md:w-[80%] w-[60%] overflow-hidden bg-blueHover m-2 p-3 rounded-xl">
                                            <p>{grade.student.email}</p>
                                        </div>
                                        <div className="md:w-[10%] w-[20%] text-center text-sm md:text-md bg-blueHover m-2 p-3 rounded-xl">
                                            <p>{grade.submission.score}</p>
                                        </div>
                                        <div className="md:w-[10%] w-[20%] text-center text-sm md:text-md bg-blueHover m-2 p-3 rounded-xl">
                                            <p>{studentGradePercentage(grade.submission.score, fullScore)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                ) : (
                    <p className="text-center flex justify-center items-center font-poppins text-xl h-[40vh]
                     text-gray-500 mt-8">Please select an exam</p>
                )}

            </div>

        </div>
    )
}

export default Page
