
export async function getPosts({ id }) {
    const token = JSON.parse(localStorage.getItem("userData"))?.token;
    const url = `https://academiq.onrender.com/discussions/${id}`;
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
        const data = await response.json();
        return data
    } catch (error) {
        console.error("Error getting user data", error);
        throw error;
    }
}

export async function LikePost({ id }) {
    const token = JSON.parse(localStorage.getItem("userData"))?.token;

    const url = `https://academiq.onrender.com/discussions/posts/likes/${id}`;

    try {
        const response = await fetch(url, {
            method: "POST",
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

    } catch (error) {
        console.error("Error logging in:", error);
        throw error;
    }
}

export async function getComment({ postId }) {
    const token = JSON.parse(localStorage.getItem("userData"))?.token;

    const url = `https://academiq.onrender.com/discussions/posts/comments/${postId}`;

    try {
        const response = await fetch(url, {
            method: "GET",
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
        const data = await response.json();
        return data

    } catch (error) {
        console.error("Error logging in:", error);
        throw error;
    }
}


export async function addPost(formData) {
    const token = JSON.parse(localStorage.getItem("userData"))?.token;

    const url = `https://academiq.onrender.com/discussions/posts`;

    const formDataToSend = new FormData();
    formDataToSend.append("content", formData.get("content"));
    formDataToSend.append("courseId", formData.get("id"));
    const attachments = formData.get("attachments");
    if (attachments && attachments.length > 0) {
        Array.from(attachments).forEach((file) => {
            formDataToSend.append("attachments", file);
        });
    }
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`

            },
            body: formDataToSend
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error Data:", errorData);
            throw new Error(errorData.error || "Unknown error");
        }
        const data = await response.json();
        console.log('data in api:', data);  // Log the entire response object
        return data.post;

    } catch (error) {
        console.error("Error logging in:", error);
        throw error;
    }
}