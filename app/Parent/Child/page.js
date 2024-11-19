import ChildDetails from "@/app/_components/parent/ChildDetails"
import ChildProfileDetails from "@/app/_components/parent/ChildProfileDetails"
import Announcements from "@/app/_components/Students/Announcements"
import TimeTable from "@/app/_components/Students/CoursesTimeTable"

function Page() {
    return (
        <div className='flex flex-col text-center rounded-xl'>
            <div className="items-center flex flex-col min-h-[40vh]
         md:min-h-[70vh] md:max-h-[100vh] mb-4
        mt-3 mx-auto w-[90%] bg-white rounded-2xl font-poppins justify-center ">
                please choose a  child
            </div>
        </div>
    )
}

export default Page
