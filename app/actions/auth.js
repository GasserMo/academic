import Cookies from 'js-cookie';

export async function login({ email, password }) {

    const url = "https://academiq.onrender.com/auth/login";
    const requestBody = {
        email: email,
        password: password,
    };
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error Data:", errorData);
            throw new Error(errorData.error || "Unknown error");
        }
        const data = await response.json();
        console.log("Login successful:", data);
        localStorage.setItem("userData", JSON.stringify(data));
        Cookies.set("authToken", data.token, { expires: 7 }); // Expires in 7 days
        Cookies.set("userId", data.user._id, { expires: 7 }); // Expires in 7 days
        Cookies.set("userData", JSON.stringify(data), { expires: 7 }); // Serialize the data object
        if (data.user.gradeClass && data.user.gradeClass._id) {
            Cookies.set("gradeClassId", data.user.gradeClass._id, { expires: 7 }); // Expires in 7 days
        }
        return data;
    } catch (error) {
        console.error("Error logging in:", error);
        throw error;
    }
}