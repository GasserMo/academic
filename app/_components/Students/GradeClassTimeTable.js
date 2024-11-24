"use client";
import { useEffect, useState } from "react";
import { getGradeClassTimetable } from "@/app/actions/timetable";
import { GetAUser, GetAUserByParent } from "@/app/actions/getUser";
import '@/app/_styles/globals.css';

const GradeClassTimeTable = ({ id }) => {
    const [timeTable, setTimetable] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [todayTimetable, setTodayTimetable] = useState([]);

    useEffect(() => {
        const fetchGradeClassTimetable = async () => {
            try {
                if (!id) {
                    const userData = await GetAUser();
                    const gradeClassId = userData.user.gradeClass._id;
                    const data = await getGradeClassTimetable({ gradeClassId });
                    setTimetable(data.timetable || []);
                }
                /*  const userData = await GetAUser();
                 const gradeClassId = userData.user.gradeClass._id;
                 const data = await getGradeClassTimetable({ gradeClassId }); */
                const userData = await GetAUserByParent({ id })
                const gradeClassId = userData?.user?.gradeClass._id;
                const data = await getGradeClassTimetable({ gradeClassId });
                setTimetable(data.timetable || []);
            } catch (error) {
                console.error("Error fetching timetable:", error);
                setError("Failed to fetch timetable");
            } finally {
                setIsLoading(false);
            }
        };

        fetchGradeClassTimetable();
    }, []);

    useEffect(() => {
        if (timeTable.length > 0) {
            const today = new Date();
            const currentDay = today.toLocaleString('en-US', { weekday: 'long' });
            const schedule = createSchedule(currentDay, timeTable);
            setTodayTimetable(schedule);
        }
    }, [timeTable]);

    const createSchedule = (day, timetable) => {
        const schedule = [];
        const startHour = 8;
        const endHour = 14;

        for (let hour = startHour; hour < endHour; hour++) {
            const currentPeriod = timetable.filter(period => period.day === day &&
                period.startTime.hour === hour);

            if (currentPeriod.length) {
                schedule.push(currentPeriod[0]);
            } else {
                schedule.push({ break: true, hour });
            }
        }

        return schedule;
    };

    if (isLoading) {
        return (
            <div className="mt-5 md:mt-3 w-full md:min-h-[60vh] justify-center items-center max-h-[80vh] bg-white rounded-2xl">
                <div className="mt-3 flex  h-full justify-center items-center">
                    <div className="flex items-center justify-center self-center ">
                        <div className="w-8 h-8 rounded-full animate-spin border 
                     border-solid border-cyan-500 border-t-transparent"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return <p className="text-red-500 font-poppins">{error}</p>;
    }

    return (
        <div className="mt-5 md:mt-3 md:min-h-[60vh] max-h-[90vh] scrollbar-thumb-bluePrimary
        overflow-y-auto scrollbar-thin scrollbar-track-gray-200 bg-white rounded-2xl">
            <p className="p-2 font-poppins text-headline-title text-center">
                Today s Timetable
            </p>
            <div className="flex flex-col gap-y-5">
                {isLoading ? (
                    <div className="mt-8 flex  justify-center items-center">
                        <div className="flex items-center justify-center  ">
                            <div className="w-8 h-8 rounded-full animate-spin border 
                     border-solid border-cyan-500 border-t-transparent"></div>
                        </div>
                    </div>
                )
                    :
                    todayTimetable.length > 0 ? (
                        todayTimetable.map((item, index) => (
                            <div key={index} className="flex items-start bg-slate-200 p-4 rounded-xl mb-1 mx-2">
                                {item.break ? (
                                    <p className="font-poppins text-center w-full">Break</p>
                                ) : (
                                    <>
                                        <div className="flex w-full">
                                            <div className="h-10 w-10 self-center rounded-full bg-sky-900 flex text-white justify-center items-center">
                                                {item.course.title.charAt(0)}
                                            </div>
                                            <div className="flex flex-col items-start mx-4 flex-grow">
                                                <p className="font-poppins">
                                                    {item.course.title || "Course"}
                                                </p>
                                                <p className="font-poppins text-xs text-gray-500">
                                                    {item.teacher.name.first || "Teacher"}
                                                    {' ' + item.teacher.name.last || ""}
                                                </p>
                                            </div>
                                            <div className="flex flex-col justify-start items-end">
                                                <p className="font-poppins text-[10px] text-gray-500">
                                                    {item.gradeClass.room || "Room"}
                                                </p>
                                                <p className="font-poppins text-[10px] text-gray-500">
                                                    {item.startTime.hour || "Lab"}
                                                    {':' + item.startTime.minute + '0' || "Lab"}
                                                </p>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))
                    ) : (
                        <p className="font-poppins text-center text-gray-500">
                            No timetable data available for today.
                        </p>
                    )
                }



            </div>
        </div>
    );
};

export default GradeClassTimeTable;