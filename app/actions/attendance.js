
export async function getAttendance({ id, date, period }) {

    const url =
        `https://academiq.onrender.com/gradeClasses/${id}/attendance?date=${date}&period=${period}`;
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
        console.error("Error getting attendance data", error);
        throw error;
    }
}

export async function reTakeAttendance(formData, gradeClassId) {
    const token = JSON.parse(localStorage.getItem("userData"))?.token;
    const url = `https://academiq.onrender.com/gradeClasses/${gradeClassId}/attendance`
    try {
        const response = await fetch(url, {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: formData
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error Data:", errorData);
            throw new Error(errorData.error || "Unknown error");
        }
        const data = await response.json();
        return data.post;

    } catch (error) {
        console.error("Error logging in:", error);
        throw error;
    }
}