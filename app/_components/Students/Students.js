"use client"
import { getGradeClassStudents } from "@/app/actions/getGradeClassStudents"
import Image from "next/image"
import { useEffect, useState } from "react"

function Students({ id }) {
    const [students, setStudents] = useState([])
    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const data = await getGradeClassStudents({ id });
                console.log("students data:", data);
                console.log("students data:", data.students);
                setStudents(data.students)
            } catch (error) {
                console.error("Error fetching ONE course:", error);
            }
        }
        fetchStudents();
    }, [id])
    return (
        <div className='flex flex-col  justify-start '>
            {students.map((student, index) => {
                return <div key={student._id} className="flex items-center space-x-2  p-2">
                    <p className="font-poppins font-semibold mr-3">{index + 1}</p>
                    <div className='flex items-center justify-center h-10 text-white w-10 rounded-full bg-sky-900'>
                        <p>{student.name.first.charAt(0)}</p>
                        <p>{student.name.last.charAt(0)}</p>


                    </div>
                    <p className='font-poppins'>{student.name.first} {student.name.last}</p>
                </div>
            })}

        </div>
    )
}

export default Students
