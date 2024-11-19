


export async function getQuestionBanks() {

    const url = `https://academiq.onrender.com/questionBanks`;
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

export async function getOneQuestionBank({ id }) {
    const url = `https://academiq.onrender.com/questionBanks/${id}`;
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
export async function createQuestion({ questionBankId, modalData }) {
    const url = `https://academiq.onrender.com/questionBanks/${questionBankId}/questions/`;
    const token = JSON.parse(localStorage.getItem("userData"))?.token;

    const requestBody = {
        head: modalData.title,
        text: modalData.question,
        paragraph: modalData.description,
        type: "Multiple-Choice",
        options: modalData.options,
        tags: ["1", "2", "3"],
        difficulty: "easy",
        authorId: "65df77eeb90f0cfa55ffd0ec" // replace with actual authorId if needed
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
export async function createQuestionBank({ courseId, modalData }) {
    const url = `https://academiq.onrender.com/questionBanks`;
    const token = JSON.parse(localStorage.getItem("userData"))?.token;

    const requestBody = {
        title: modalData.title,
        description: modalData.description,
        courseId: courseId// replace with actual authorId if needed
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
        const data = await response.json()
        console.log("Question added successfully");
        return data.questionBank;
    } catch (error) {
        console.error("Error adding question", error);
        throw error;
    }
}

export async function deleteQuestion({ courseId, questionId }) {

    const url = `https://academiq.onrender.com/questionBanks/${courseId}/questions/${questionId}`;
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
        console.log('delete done')
    } catch (error) {
        console.error("Error getting user data", error);
        throw error;
    }


}