import TimeTable from '@/app/_components/Students/CoursesTimeTable'
import '@/app/_styles/globals.css'
import { getCourses } from '@/app/actions/getCourses'
import Link from 'next/link'

const Courses = async () => {

    const data = await getCourses()
    const { courses } = data

    return (
        <div className='flex flex-col w-[90%] mx-auto md:min-h-[80vh]
         bg-white mt-4 md:ml-6 rounded-xl'>
            <p className='mx-4 text-headline-title font-poppins text-md'>Courses</p>
            <div className='flex flex-wrap justify-start gap-4'>
                {courses.map((course) => {
                    return (
                        <div key={course._id} className='w-full sm:w-1/2 md:w-1/3'>
                            <Link href={`/Student/Courses/details/${course._id}`}>
                                <div className='p-7 border bg-blueHover hover:bg-bluePrimary items-center justify-center text-center border-bluePrimary hover:text-white m-4 rounded-2xl font-poppins text-bluePrimary'>
                                    <p>{course.title}</p>
                                </div>
                            </Link>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default Courses
