import { getCourses } from "@/app/actions/getCourses";
import Link from "next/link";
import '@/app/_styles/globals.css'
import { getGradeClass } from "@/app/actions/getGradeClassStudents";
import { cookies } from "next/headers";

const Attendance = async () => {
    const authToken = cookies().get("authToken")?.value;
    let gradeClasses = [];
    const url = `https://academiq.onrender.com/gradeClasses/`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}`,
            },
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to fetch grade classes");
        }

        const data = await response.json();
        gradeClasses = data.gradeClasses || [];
    } catch (error) {
        console.error("Error fetching grade classes:", error.message);
    }
    return (
        <div className='md:grid md:grid-cols-[70%_30%]'>
            <div className='flex flex-col w-[95%] md:w-[90%] mx-auto md:min-h-[80vh]
                bg-white mt-4
                md:ml-6 rounded-xl overflow-x-hidden'>
                <p className='mx-4 text-headline-title
                    font-poppins text-md '>Courses</p>

                <div className='flex flex-wrap  gap-4 mx-4'> {/* Parent container for course cards */}
                    {gradeClasses.map((gradeClass) => {
                        return (
                            <Link className=" my-3 md:my-6 w-[30%]" href={`/Teacher/Attendance/${gradeClass._id}`} key={gradeClass._id}>
                                <div className='w-full p-4 md:p-7 border bg-blueHover hover:bg-bluePrimary
                                items-center justify-center text-center border-bluePrimary hover:text-white
                                rounded-2xl font-poppins text-bluePrimary'>
                                    <p>Class {gradeClass.level}{gradeClass.letter}</p>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}

export default Attendance
