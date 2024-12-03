"use client"

import { getAttendance } from "@/app/actions/attendance";
import { getCourses } from "@/app/actions/Courses";
import SmCircle from "@/public/icons/Circle";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

function Page(context) {
    const [courses, setCourses] = useState([])
    const [courseId, setCourseId] = useState('')
    const [error, setError] = useState('')
    const [students, setStudents] = useState([]);
    const [period, setPeriod] = useState(0);

    const { id } = context.params

    const handleSetPeriod = () => {
        const hour = new Date().getHours();
        console.log(hour)
        if (hour >= 8 && hour < 9) {
            setPeriod(1);
        } else if (hour >= 9 && hour < 10) {
            setPeriod(2);
        } else if (hour >= 10 && hour < 11) {
            setPeriod(3);
        } else if (hour >= 11 && hour < 12) {
            setPeriod(4);
        } else if (hour >= 12 && hour < 13) {
            setPeriod(5);
        } else if (hour >= 13 && hour < 14) {
            setPeriod(6);
        } else {
            setPeriod(0);
        }
        console.log('hour: ', hour, 'period: ', period)
    };

    const fetchData = async () => {
        try {
            const token = JSON.parse(localStorage.getItem("userData"))?.token;
            if (!token) throw new Error("User not authenticated");

            const coursesResponse = await fetch(
                `https://academiq.onrender.com/courses`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            const gradeClassResponse = await fetch(
                `https://academiq.onrender.com/gradeClasses/${id}/students?points=true`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            const [coursesData, gradeClassData] = await Promise.all([
                coursesResponse.json(),
                gradeClassResponse.json(),
            ]);

            setCourses(coursesData.courses || []);
            setStudents(gradeClassData.students || []);
            setCourseId(coursesData.courses?.[0]?._id || "");
        } catch (error) {
            console.error("Error fetching data: ", error.message);
            setError("Failed to fetch data.");
        }
    };

    useEffect(() => {
        fetchData();
        handleSetPeriod();
    }, []);

    /* const fetchAttendance = async () => {
        if (!courseId) {
            return;
        }
        try {
            const response = await getAttendance({ id, date: dayjs().format("YYYY-MM-DD"), period });
            console.log(response)
            const { attendance } = response;
            if (attendance) {
                setStudents(
                    attendance.students.map((student) => ({
                        id: student.student._id,
                        name: student.student.username,
                        checked: student?.status,
                    }))
                );
            }
        } catch (error) {
            setError("There is no attendance for this period.");
            setTimeout(() => {
                setError(null);
            }, 3000);
        }
    };

    useEffect(() => {
        fetchAttendance();
    }, [courseId, period]); */
    const handleCourseChange = (e) => {
        setCourseId(e.target.value); // Update courseId with the selected course's _id
    };

    const selectAll = () => {
        setStudents(students.map((student) => ({ ...student, checked: true })));
    };

    const deselectAll = () => {
        setStudents(students.map((student) => ({ ...student, checked: false })));
    };

    /*     let studentsAttended = students.filter((student) => student.checked).length;
     */

    return (
        <div className='md:grid md:grid-cols-[70%_30%]'>
            <div>
                <div className='flex flex-col w-[90%] mx-auto md:min-h-[80vh]
            bg-white mt-4 min-h-[80vh]
            md:ml-6 rounded-xl overflow-x-hidden'>
                    <div className="flex justify-between items-center">
                        <p className='m-4 text-headline-medium
                font-poppins text-md '>Attendance</p>
                        {error &&
                            <div className="w-[50%] h-[50%] flex items-center justify-center  rounded-xl text-center bg-red-200 text-red-800">{error}</div>}
                        <select
                            name="priority"
                            value={courseId}
                            onChange={handleCourseChange}
                            className="w-[20%] m-5 p-2 mb-4 border rounded"
                            required
                        >
                            {courses?.map((course) => (
                                <option key={course._id}
                                    value={course._id}>
                                    {course.title}</option>

                            ))}
                        </select>

                    </div>
                    <div className="flex justify-between mx-3">
                        <p className="font-poppins text-bluePrimary">Name</p>
                        <div className="flex space-x-2 ">
                            <div className="flex items-center gap-1">
                                <SmCircle color={"#00769E"} />
                                <p>{students?.length} Total</p>
                            </div>
                            {/* <div className="flex items-center gap-1">
                                <SmCircle color={"#26B170"} />
                                <p>{studentsAttended} Attend</p>
                            </div>
                            <div className="flex items-center gap-1">
                                <SmCircle color={"#FE626B"} />
                                <p>{students.length - studentsAttended} Absent</p>
                            </div> */}
                        </div>
                        <p className="font-poppins text-bluePrimary">Status</p>

                    </div>
                    <hr className="w-full mt-1 h-0.3 bg-bluePrimary" />
                    <div>
                        {students?.map((student) => (
                            <div className="flex" key={student._id}>
                                <div className="w-[65%] flex space-x-1 overflow-hidden bg-blueHover m-2 p-3 rounded-xl">
                                    <p>{student.name.first}</p>
                                    <p>{student.name.last}</p>
                                </div>
                                <div className="w-[20%] text-center bg-blueHover m-2 p-3 rounded-xl">
                                    <p>{student.points}</p>
                                </div>
                                <div className="w-[15%] text-center bg-blueHover m-2 p-3 rounded-xl">
                                    <p>St</p>
                                </div>

                            </div>
                        ))}
                    </div>



                </div>
                <div className="flex justify-between w-[90%] mt-2 mx-6">
                    <button
                        className="md:w-[20%] w-[50%]  bg-bluePrimary
                         text-white py-1 rounded-lg hover:bg-blueSecondary transition duration-300"
                    >
                        Submit
                    </button>
                    <div className="flex w-[50%] justify-end space-x-2 ">
                        <button
                            className="md:w-[30%] w-[40%] text-greenPrimary py-2 border border-greenPrimary rounded-lg hover:bg-greenPrimary hover:text-white transition duration-300"
                        >
                            Select All
                        </button>
                        <button
                            className="md:w-[30%] w-[40%] text-red-700 py-2 border border-red-700 rounded-lg hover:bg-red-700 hover:text-white transition duration-300"
                        >
                            Unselect All
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page
