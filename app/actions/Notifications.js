


export async function getNotifications() {
    const token = JSON.parse(localStorage.getItem("userData"))?.token;
    const url = `https://academiq.onrender.com/users/notifications`;
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error Data:", errorData);
            throw new Error(errorData.error || "Unknown error");
        }
        const data = await response.json();
        return data;
    } catch (err) {
        console.error("Error getting posts data", err);
        throw err;
    }
} 