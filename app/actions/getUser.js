
export async function GetAUser() {
    const token = JSON.parse(localStorage.getItem("userData"))?.token;
    const user = JSON.parse(localStorage.getItem('userData'))?.user;
    const userId = user?._id

    const url = `https://academiq.onrender.com/users/${userId}`;

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
        console.log("User data is here:", data);
        return data;
    } catch (error) {
        console.error("Error getting user data", error);
        throw error;
    }
}