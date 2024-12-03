
export async function getGradeClassStudents({ id }) {

    const url = `https://academiq.onrender.com/gradeClasses/${id}/students?points=true`;
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
        const data = response.json()
        return data
    } catch (error) {
        console.error("Error getting user data", error);
        throw error;
    }
}

export async function getGradeClass() {
    /*  const url = `https://academiq.onrender.com/gradeClasses/`;
     const token = cookies().get('authToken')?.value; */

    const url = `https://academiq.onrender.com/gradeClasses/`;
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
        const data = response.json()
        return data
    } catch (error) {
        console.error("Error getting user data", error);
        throw error;
    }
}