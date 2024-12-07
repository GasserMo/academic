import Link from "next/link";
import { globalState } from "../context";
import { useContext, useEffect } from "react";

function ActiveExams({ activeExams }) {
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
            {activeExams.map((exam) => (
                <Link key={exam._id} href={role === 'teacher' ? `/Teacher/Exams/details/${exam._id}` : `/Student/Exams/details/${exam._id}`}>
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
            ))
            }
        </div >
    )
}

export default ActiveExams
