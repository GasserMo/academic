import Image from "next/image"
import { cookies } from "next/headers";
import { getLeaderboard } from "@/app/actions/getLeaderboard";
import { Suspense } from "react";

const LeaderboardPage = async () => {
    const authToken = cookies().get("authToken")?.value;
    const userDataString = cookies().get('userData')?.value;
    const userData = userDataString ? JSON.parse(userDataString) : null;
    const role = userData?.user?.role;
    let gradeClassId = null;
    if (role === 'parent') {
        gradeClassId = userData.user?.children[0].gradeClassId
    } else if (role === 'student') {
        gradeClassId = cookies().get('gradeClassId')?.value
    }


    console.log(userDataString)
    console.log(userData)
    const url =
        `https://academiq.onrender.com/gradeClasses/${gradeClassId}/students?points=true`;
    let data = null
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}`
            },
        });
        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error Data:", errorData);
            throw new Error(errorData.error || "Unknown error");
        }
        data = await response.json();
        console.log('data' + JSON.stringify(data))
    } catch (error) {
        console.error("Error getting user data", error);
        throw error;
    }
    const leaderboard = data?.students;
    const sortedLeaderboard = leaderboard?.sort((a, b) => b.points - a.points);
    if (!leaderboard) {
        return <p className="font-poppins text-lg">No Leaderboard available</p>;
    }

    return (
        <div className='mt-5 mb-3 md:mt-10 mx-auto w-[90%] max-h-[60vh] rounded-md bg-white h-full'>
            <p className='font-poppins p-2 text-headline-small text-start'>Leaderboard</p>
            {sortedLeaderboard.map((student, index) => (
                <div key={student._id} className="flex 
                scrollbar-thumb-bluePrimary 
        overflow-y-auto scrollbar-thin scrollbar-track-gray-200
                flex-row items-center mb-4">
                    <div className="items-center justify-center w-6 ml-3 file:h-6 mr-5 rounded-xl bg-red-700 text-white">
                        {index + 1}
                    </div>
                    <div className="flex">
                        <div className="h-14 w-14 rounded-full bg-sky-900">
                            <Image
                                src='/learn.png'
                                alt="Image"
                                width={280}
                                height={150}
                            />
                        </div>
                        <div className="flex flex-col items-start overflow-x-auto ml-2 md:ml-4">
                            <p className="font-poppins">
                                {student.name.first} {student.name.last}
                            </p>
                            <p className="text-sm text-gray-500">{student.points} points</p>
                        </div>
                    </div>
                </div>
            ))}

        </div>
    )
}


const Leaderboard = () => {
    return (
        <Suspense fallback={
            <div className="flex flex-col border rounded-lg p-2 bg-white w-[90%] my-4 mx-auto">
                <div className="mt-3 flex justify-center items-center w-[90%]">
                    <div className="flex items-center justify-center self-center ">
                        <div className="w-8 h-8 rounded-full animate-spin border 
                border-solid border-cyan-500 border-t-transparent"></div>
                    </div>
                </div></div>}>
            <LeaderboardPage />
        </Suspense>
    );
};
export default Leaderboard
