

export async function getStartedSubmission({ id }) {
    const url = `https://academiq.onrender.com/submissions/assessments/${id}/started`;
    const token = JSON.parse(localStorage.getItem("userData"))?.token;


    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${token}`
            },
        });

        if (!response.ok) {
            // Handle non-200 responses
            const errorData = await response.json();
            if (errorData.error === "Submission not found") {
                console.warn("No submission found for this assessment.");
                return { error: "Submission not found" }; // Return structured error
            }
            console.error("Error Data:", errorData);
            throw new Error(errorData.error || "Unknown error");
        }
        const data = await response.json()
        console.log("submission created successfully");
        return data;
    } catch (error) {
        console.error("Error adding question", error);
        return error
    }
}

export async function createSubmission({ id }) {
    const url = `https://academiq.onrender.com/submissions/assessments/${id}`;
    const token = JSON.parse(localStorage.getItem("userData"))?.token;


    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error Data:", errorData);
            throw new Error(errorData.error || "Unknown error");
        }
        const data = await response.json()
        console.log("submission created successfully");
        return data;
    } catch (error) {
        console.error("Error adding question", error);
        throw error;
    }
}
export async function patchSubmission({ id, files }) {
    const url = `https://academiq.onrender.com/submissions/assessments/${id}/submit`;
    const token = JSON.parse(localStorage.getItem("userData"))?.token;

    const formData = new FormData();
    files.forEach((file) => formData.append("files", file)); // Append multiple files

    try {
        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`, // No need for Content-Type; FormData sets it automatically
            },
            body: formData,
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error Data:", errorData);
            throw new Error(errorData.error || "Unknown error occurred");
        }

        const data = await response.json();
        console.log("Files submitted successfully");
        return data;
    } catch (error) {
        console.error("Error submitting files", error);
        throw error;
    }
}
export async function submitExam({ id, answers }) {
    const url = `https://academiq.onrender.com/submissions/assessments/${id}/submit`;
    const token = JSON.parse(localStorage.getItem("userData"))?.token;

    try {
        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json", // Ensure proper content type
                "Authorization": `Bearer ${token}`, // Optional token for authentication
            },
            body: JSON.stringify({ answers }), // Send answers in the request body
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error submitting answers:", errorData);
            console.log(answers)
            throw new Error(errorData.error || "Unknown error occurred");
        }

        const data = await response.json();
        console.log("Files submitted successfully");
        return data;
    } catch (error) {
        console.error("Error submitting answers", error);
        throw error;
    }
}