

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
            body: JSON.stringify(modalData),
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