


export async function getTodos({ date }) {
    const token = JSON.parse(localStorage.getItem("userData"))?.token;
    const url = `https://academiq.onrender.com/todos?date=${date}`;
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
export async function updateTodo({ id, dataToSave }) {
    const token = JSON.parse(localStorage.getItem("userData"))?.token;
    const url = `https://academiq.onrender.com/todos/${id}`;
    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(dataToSave)
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

export async function addTodo(modalData) {
    const token = JSON.parse(localStorage.getItem("userData"))?.token;
    const url = `https://academiq.onrender.com/todos`;
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(modalData)
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

export async function deleteTodo(id) {
    const token = JSON.parse(localStorage.getItem("userData"))?.token;
    const url = `https://academiq.onrender.com/todos/${id}`;
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
        const data = await response.json();
        return data
    } catch (error) {
        console.error("Error getting user data", error);
        throw error;
    }
}
