
import TimeTable from '@/app/_components/Students/CoursesTimeTable'
import '@/app/_styles/globals.css'
import { getCourses } from '@/app/actions/getCourses'
import Link from 'next/link'
const Courses = async () => {

    const data = await getCourses()
    const { courses } = data
    return (
        <div className='  grid grid-cols-[70%_30%]   '>
            <div className='flex flex-col w-[90%] mx-auto md:min-h-[50vh]
             bg-white mt-4
             md:ml-6 rounded-xl  overflow-x-hidden'>
                <p className='mx-4 text-headline-title
                        font-poppins text-md '>Courses</p>
                {courses.map((course) => {
                    return (
                        <Link href={`/Courses/Details/${course._id}`} key={course._id}>
                            <div className='w-[30%] p-7 border flex bg-blueHover hover:bg-bluePrimary
                                items-center justify-center text-center border-bluePrimary hover:text-white
                                m-4 rounded-2xl font-poppins text-bluePrimary'>
                                <p>{course.title}</p>
                            </div>
                        </Link>
                    );
                })}


            </div>
            {courses.length > 0 && <TimeTable courseId={courses[0]._id} />}
        </div>
    )
}

export default Courses
