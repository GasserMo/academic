
export async function getUsersReports({ role }) {
    const token = JSON.parse(localStorage.getItem("userData"))?.token;

    const url = `https://academiq.onrender.com/reports?sent=${role}`;

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
export async function getOneReport({ id }) {
    const token = JSON.parse(localStorage.getItem("userData"))?.token;
    const url = `https://academiq.onrender.com/reports/${id}?markAsSeen=true`;

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

export async function ReplyToReport({ id, message }) {
    const token = JSON.parse(localStorage.getItem("userData"))?.token;
    const url = `https://academiq.onrender.com/reports/${id}/reply`;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ body: message })

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
export async function SendReport({ sentReport }) {
    const token = JSON.parse(localStorage.getItem("userData"))?.token;
    const url = `https://academiq.onrender.com/reports`;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(sentReport)
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