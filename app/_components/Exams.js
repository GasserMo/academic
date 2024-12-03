"use client"
import ActiveExams from "@/app/_components/ActiveExams";
import CourseText from "@/app/_components/CourseText"
import LastExams from "@/app/_components/LastExams";
import UpcomingExams from "@/app/_components/UpcomingExams";
import { getExamsByTeacher } from "@/app/actions/examinations";
import Link from "next/link";
import { useEffect, useState } from "react";
import { globalState } from "../context";
import { useContext } from "react";

function Exams() {
    const { data } = useContext(globalState)
    const role = data?.userData?.user?.role
    const [exams, setExams] = useState([])
    const [loading, setLoading] = useState(false)
    const [active, setActive] = useState('Last Exams')
    const handleSetActive = (item) => {
        setActive(item)
    }
    useEffect(() => {
        const fetchExams = async () => {
            try {
                setLoading(true)
                const data = await getExamsByTeacher({ type: 'exam' });
                setExams(data.assessments)
            } catch (err) {
                console.log(err)
            } finally {
                setLoading(false)

            }
        }
        fetchExams()
    }, [])
    let lastExams = exams.filter((exam) => exam.status === 'completed')
    let activeExams = exams.filter((exam) => exam.status === 'published')
    let upcomingExams = exams.filter((exam) => exam.status === 'pending')


    return (
        <div className='flex flex-col md:flex   md:flex-row '>
            <div className=' flex w-[90%] mx-auto flex-col min-h-[80vh] bg-white my-5
    md:mx-8 md:mt-4 rounded-xl md:w-[90%]'>
                <p className=' font-poppins text-headline-small p-5'>Course Details</p>

                <div className='flex space-x-4 justify-center'>
                    <div onClick={() => handleSetActive('Last Exams')}>
                        <CourseText active={active === 'Last Exams'} name={'Last Exams'} />
                    </div>
                    <div onClick={() => handleSetActive('Active Exams')}>
                        <CourseText active={active === 'Active Exams'} name={'Active Exams'} />
                    </div>
                    <div onClick={() => handleSetActive('Upcoming Exams')}>
                        <CourseText active={active === 'Upcoming Exams'} name={'Upcoming Exams'} />
                    </div>

                </div>
                <div className='flex-1 p-4'>
                    {loading ? (
                        <div className="mt-3 flex justify-center items-center h-full ">
                            <div className="flex items-center justify-center self-center ">
                                <div className="w-8 h-8 rounded-full animate-spin border 
                   border-solid border-cyan-500 border-t-transparent"></div>
                            </div>
                        </div>
                    ) : (
                        <>
                            {active === 'Last Exams' && <LastExams lastExams={lastExams} />}
                            {active === 'Active Exams' && <ActiveExams activeExams={activeExams} />}
                            {active === 'Upcoming Exams' && <UpcomingExams upcomingExams={upcomingExams} />}
                        </>
                    )}
                </div>

                {role !== 'student' && <Link href={'/Teacher/Exams/createExam'} className="md:w-[30%] self-end">
                    <div className="p-4 my-3 text-center bg-bluePrimary
                     text-white rounded mr-2">Create Exam</div>
                </Link>}

            </div>
        </div>
    )
}

export default Exams
