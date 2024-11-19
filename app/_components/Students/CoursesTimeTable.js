"use client";
import { useEffect, useState } from "react";
import { getTimeTable } from "@/app/actions/timetable";
import '@/app/_styles/globals.css';

const CourseTimetable = ({ courseId }) => {
    const [timeTable, setTimetable] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCourseTimetable = async () => {
            try {
                const data = await getTimeTable({ courseId });
                console.log(data);
                setTimetable(data.timetable || []);
                setIsLoading(false)
            } catch (error) {
                console.error("Error fetching timetable:", error);
                setError("Failed to fetch timetable");
                setIsLoading(false)

            } finally {
                setIsLoading(false)

            }
        };

        if (courseId) {
            fetchCourseTimetable();
        }
    }, [courseId]);

    if (isLoading) {
        return <div className="mt-5 md:mt-3 md:w-[30%] md:min-h-[60vh] max-h-[80vh] bg-white rounded-2xl">
            <div className="mt-3 flex justify-center items-center ">
                <div className="flex items-center justify-center  ">
                    <div className="w-8 h-8 rounded-full animate-spin border 
                border-solid border-cyan-500 border-t-transparent"></div>
                </div>
            </div>
        </div>
    }
    if (error) {
        return <p className="text-red-500 font-poppins">{error}</p>;
    }

    return (
        <div className="mt-5 md:mt-3 md:w-[30%] md:min-h-[60vh] max-h-[80vh] scrollbar-thumb-bluePrimary
        overflow-y-auto scrollbar-thin scrollbar-track-gray-200 bg-white rounded-2xl">
            <p className="p-2 font-poppins text-headline-title text-center">
                Course Timetable
            </p>
            <div className="flex flex-col gap-y-5 w-full">
                {timeTable.length > 0 ? (
                    timeTable.map((period, index) => (
                        <div key={index} className="flex items-start bg-slate-200 p-4 rounded-xl mx-2">
                            <div className="flex  w-full">
                                <div className="h-10 w-10 self-center rounded-full bg-sky-900 flex text-white justify-center items-center">
                                    {period.course.title.charAt(0)}
                                </div>
                                <div className="flex flex-col mx-4 flex-grow">
                                    <div className="flex justify-between items-center">
                                        <p className="font-poppins">
                                            {period.course.title || "Course"}
                                        </p>
                                    </div>
                                    <p className="font-poppins text-sm text-gray-500">
                                        {period.day || "Day"}
                                    </p>
                                    <p className="font-poppins text-xs text-gray-500">
                                        {period.teacher.name.first || "Day"}
                                        {' ' + period.teacher.name.last || "Day"}
                                    </p>
                                </div>
                                <div className="flex flex-col  justify-start items-end">
                                    <p className="font-poppins text-[10px] text-gray-500">
                                        {period.gradeClass.room || "Room"}
                                    </p>
                                    <p className="font-poppins text-[10px] text-gray-500">
                                        {period.startTime.hour || "Lab"}
                                        {':' + period.startTime.minute + '0' || "Lab"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="font-poppins text-center text-gray-500">
                        No timetable data available for this course.
                    </p>
                )}
            </div>
        </div>
    );
};

export default CourseTimetable;
