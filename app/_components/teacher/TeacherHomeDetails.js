

import { cookies } from "next/headers";

const TeacherHomeDetails = async () => {
    const authToken = cookies().get("authToken")?.value;
    const userId = cookies().get("userId")?.value;
    const url = `https://academiq.onrender.com/users/${userId}`;
    let data = null;
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

    } catch (error) {
        console.error("Error getting user data", error);
        throw error;
    }

    const { user: { name: { first, last }, email, profilePicture: { url: picture }, } } = data
    const fullName = `${first} ${last}`;


    return (
        <div>
            <div className="flex flex-col mx-auto mt-3 w-[90%] bg-white p-3 rounded-xl">
                <p className="font-poppins text-headline-title">Hello, {fullName}</p>
                <p className="font-poppins text-gray-500">Welcome To our School
                    <br />Start creating highly engaging
                    courses now!</p>
            </div>
        </div>
    )
}

export default TeacherHomeDetails
