import ProfileDetails from "@/app/_components/Students/ProfileDetails"
import TimeTable from "@/app/_components/Students/TimeTable"
import Image from "next/image"
import { AiOutlineRight } from "react-icons/ai"
import '@/app/_styles/globals.css'
import Announcements from "@/app/_components/Students/Announcements"
import Leaderboard from "@/app/_components/Students/Leaderboard"
function Page() {
    return (
        <div className='text-center rounded-xl md:grid md:grid-cols-[70%_30%]'>
            <div>
                <Announcements />
                <Leaderboard />
            </div>
            <div className="mx-2">
                <TimeTable />
            </div>


        </div>

    )
}

export default Page
