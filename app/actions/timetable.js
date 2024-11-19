

export async function getTimeTable({ courseId }) {
    const url = `https://academiq.onrender.com/courses/${courseId}/timetables`;
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
}
export async function getGradeClassTimetable({ gradeClassId }) {
    const url = `https://academiq.onrender.com/gradeClasses/${gradeClassId}/timetables`;
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
}

export async function getTeacherTimeTable({ id }) {
    const url = `https://academiq.onrender.com/users/${id}/timetables`;
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
}