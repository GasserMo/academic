

export async function getAssignmentByCourse({ id }) {

    const url = `https://academiq.onrender.com/assessments/courses/${id}?type=assignment`;
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

export async function getAssignments() {

    const url = `https://academiq.onrender.com/assessments?type=assignment`;
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
export async function getOneAssignment({ id }) {

    const url = `https://academiq.onrender.com/assessments/${id}`;
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


export async function updateAssignment({ id, modalData }) {
    const url = `https://academiq.onrender.com/assessments/${id}`;
    const token = JSON.parse(localStorage.getItem("userData"))?.token;

    const requestBody = {
        title: modalData.title,
        description: modalData.description,
        duration: modalData.duration,
        score: modalData.score,
        startDate: modalData.startDate,
        endDate: modalData.endDate,
        courseId: modalData.courseId,
    };

    try {
        const response = await fetch(url, {
            method: 'PUT',
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
        console.log("data of assignment added successfully");
        return data;
    } catch (error) {
        console.error("Error adding question", error);
        throw error;
    }
}

export async function createAssignment(modalData) {
    const url = `https://academiq.onrender.com/assessments?type=assignment`;
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
        console.log("assignment added successfully");
        return data;
    } catch (error) {
        console.error("Error adding question", error);
        throw error;
    }
}


export async function addMaterial(file) {
    const url =
        `https://academiq.onrender.com/assessments/6675b491e75f8503094f472c/materials`;
    const token = JSON.parse(localStorage.getItem("userData"))?.token;


    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(file),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error Data:", errorData);
            throw new Error(errorData.error || "Unknown error");
        }
        const data = await response.json()
        console.log("material added successfully");
        return data;
    } catch (error) {
        console.error("Error adding question", error);
        throw error;
    }
}

