

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
export async function getAssessmentByStatus() {

    const url = `https://academiq.onrender.com/assessments?status=completed&type=exam`;
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

export async function updateAssignment({ id, formData }) {
    const url = `https://academiq.onrender.com/assessments/${id}`;
    const token = JSON.parse(localStorage.getItem("userData"))?.token;

    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json", // Set Content-Type to JSON
                "Authorization": `Bearer ${token}`,  // Only set Authorization header
            },
            body: JSON.stringify(formData), // Convert formData to JSON string
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error Data:", errorData);
            throw new Error(errorData.error || "Unknown error");
        }

        const data = await response.json();
        console.log("Assignment updated successfully:", data);
        return data;
    } catch (error) {
        console.error("Error updating assignment:", error);
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


export async function addMaterialsToAssessment(id, materials) {
    const url = `https://academiq.onrender.com/assessments/${id}/materials`;
    const token = JSON.parse(localStorage.getItem("userData"))?.token;

    const formData = new FormData();
    for (let i = 0; i < materials.length; i++) {
        formData.append("materials", materials[i]);
    }

    try {
        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: materials, // Send the FormData directly
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error Data:", errorData);
            throw new Error(errorData.error || "Unknown error");
        }
        const data = await response.json();
        console.log("Material added successfully");
        return data;
    } catch (error) {
        console.error("Error adding materials", error);
        throw error;
    }
}

