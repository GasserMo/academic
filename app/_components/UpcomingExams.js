import Link from "next/link";
import { useContext } from "react";
import { globalState } from "../context";

function UpcomingExams({ upcomingExams }) {
    const { data } = useContext(globalState)
    const role = data?.userData?.user?.role
    function formatDate(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Ensure 2 digits for month
        const day = String(date.getDate()).padStart(2, "0"); // Ensure 2 digits for day
        return `${year}-${month}-${day}`;
    }
    return (
        <div>
            {upcomingExams.map((exam) => (
                <Link key={exam._id} href={role === 'teacher' ? `/Teacher/Exams/details/${exam._id}` : ''}>
                    <div
                        className="flex border p-3 rounded-xl justify-between m-2">
                        <div className="flex items-center">
                            <p className="text-black font-poppins">{exam.title}</p>
                            <p className="text-gray-500 text-xs font-poppins ml-2">({formatDate(exam.startDate)})</p>
                            <p className="text-gray-500 text-xs font-poppins mx-2"> to </p>
                            <p className="text-gray-500 text-xs font-poppins">({formatDate(exam.endDate)})</p>
                        </div>
                        <p className="text-black font-poppins overflow-hidden">{exam.questions?.length} Questions</p>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default UpcomingExams
