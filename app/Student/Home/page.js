
import '@/app/_styles/globals.css'
import Announcements from "@/app/_components/Students/Announcements"
import Leaderboard from "@/app/_components/Students/Leaderboard"
import GradeClassTimeTable from "@/app/_components/Students/GradeClassTimeTable"
function Page() {
    return (
        <div className=' text-center rounded-xl md:flex  md:flex-row overflow-hidden  min-h-screen'>
            <div className='md:w-[60%]'>
                <Announcements />
                <Leaderboard />
            </div>
            <div className="mx-2 flex-1">
                <GradeClassTimeTable />
            </div>


        </div>

    )
}

export default Page
