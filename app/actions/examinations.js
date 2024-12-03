


export async function getExamsByParent({ studentId, type }) {

    const url = `https://academiq.onrender.com/assessments?studentId=${studentId}&type=${type}`;
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

export async function getExamsByTeacher({ type }) {

    const url = `https://academiq.onrender.com/assessments?type=${type}`;
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
export async function RemoveQuestionInExam({ assessmentId, questionId }) {

    const url =
        `https://academiq.onrender.com/assessments/${assessmentId}/questions/${questionId}`;
    const token = JSON.parse(localStorage.getItem("userData"))?.token;
    try {
        const response = await fetch(url, {
            method: 'DELETE',
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


export async function CreateQuestionToExam({ id, modalData }) {
    const url = `https://academiq.onrender.com/assessments/${id}/questions/`;
    const token = JSON.parse(localStorage.getItem("userData"))?.token;

    const requestBody = {
        head: modalData.title,
        text: modalData.question,
        paragraph: modalData.description,
        type: "Multiple-Choice",
        options: modalData.options,
        tags: ["1", "2", "3"],
        difficulty: "easy",
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error Data:", errorData);
            throw new Error(errorData.error || "Unknown error");
        }

        console.log("Question added successfully");
        return await response.json();
    } catch (error) {
        console.error("Error adding question", error);
        throw error;
    }
}