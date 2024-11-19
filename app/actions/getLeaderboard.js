import { cookies } from "next/headers";

export async function getLeaderboard({ gradeClassId }) {

    const url = `https://academiq.onrender.com/gradeClasses/${gradeClassId}/students?points=true
`;
    const authToken = cookies().get("authToken")?.value;
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}`
            },
        })
        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error Data:", errorData);
            throw new Error(errorData.error || "Unknown error");
        }
        const data = response.json()
        return data
    } catch (error) {
        console.error("Error getting user data", error);
        throw error;
    }
}