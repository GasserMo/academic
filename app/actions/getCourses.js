import { cookies } from "next/headers";

export async function getCourses() {
    const url = `https://academiq.onrender.com/courses`;
    const token = cookies().get('authToken')?.value;

    try {

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        })
        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error Data:", errorData);
            throw new Error(errorData.error || "Unknown error");
        }
        let data = await response.json();

        return data
    } catch (error) {
        console.error("Error getting user data", error);
        throw error;
    }
}/* 
export async function getOneCourse({ id }) {
    const url = `https://academiq.onrender.com/courses`;
    const token = JSON.parse(localStorage.getItem("userData"))?.token;
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        })
        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error Data:", errorData);
            throw new Error(errorData.error || "Unknown error");
        }
        let data = await response.json();
        return data
    } catch (error) {
        console.error("Error getting user data", error);
        throw error;
    }
} */
export async function getStudents() {
    const url = `https://academiq.onrender.com/gradeClasses/${id}/students?points=true`;
/*     const token = cookies().get('authToken')?.value;
 */    const token = JSON.parse(localStorage.getItem("userData"))?.token;

    try {

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        })
        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error Data:", errorData);
            throw new Error(errorData.error || "Unknown error");
        }
        let data = await response.json();
        return data
    } catch (error) {
        console.error("Error getting user data", error);
        throw error;
    }
}