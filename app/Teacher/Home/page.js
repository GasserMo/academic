
import Announcements from "@/app/_components/Students/Announcements"
import TeacherHomeDetails from "@/app/_components/teacher/TeacherHomeDetails"
import { getCourses } from "@/app/actions/getCourses"
import Image from "next/image"

const Page = async () => {

    const data = await getCourses()
    const { courses } = data

    return (
        <div className=" md:grid md:grid-cols-[60%_40%]">
            <div className="flex flex-col ">
                <TeacherHomeDetails />
                <Announcements />
                <div className="mx-auto mt-3 w-[90%] bg-white flex p-3 
                justify-between rounded-xl space-x-2">
                    <HomeDetails image={'/laptop white screen.svg'}
                        number={courses.length} name={'Total Courses'} />
                    <HomeDetails image={'/laptop white screen.svg'} number={7} name={'Total Students'} />
                    <HomeDetails image={'/laptop white screen.svg'}
                        number={courses.length > 0 ? courses[0].department : 'N/A'} name={'Department'} />
                </div>
            </div>
            {/*             <TimeTable />
 */}
        </div>
    )
}

export default Page

function HomeDetails({ number, name, image }) {
    return <div className="flex flex-grow flex-col py-4 items-center
     bg-yellow-50 border
     border-gray-400 rounded-xl">
        <Image alt="Home" src={image}
            width={120}
            height={120}
        />
        <p className="font-poppins text-bluePrimary">{number}</p>
        <p className="font-poppins ">{name}</p>
    </div>

}