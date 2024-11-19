import Announcements from '@/app/_components/Students/Announcements'
import Leaderboard from '@/app/_components/Students/Leaderboard'
import TimeTable from '@/app/_components/Students/CoursesTimeTable'
import '@/app/_styles/globals.css'

function Page() {
    return (
        <div className='text-center rounded-xl md:grid md:grid-cols-[70%_30%]'>
            <div>
                <Announcements />
                <Leaderboard />
            </div>
            {/* <div className="mx-2">
                <TimeTable />
            </div> */}


        </div>
    )
}

export default Page
