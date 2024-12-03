"use client";

import { useState } from "react";
import { HiOutlineTrash } from "react-icons/hi2";

const DeleteQuestionButton = ({ questionId, assessmentId }) => {
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        setLoading(true);
        const authToken = document.cookie.split('; ').find(row => row.startsWith('authToken')).split('=')[1];
        const url = `https://academiq.onrender.com/assessments/${assessmentId}/questions/${questionId}`;

        try {
            const response = await fetch(url, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authToken}`,
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Error Data:", errorData);
                throw new Error(errorData.error || "Unknown error");
            }

            const data = await response.json();
            console.log("Question deleted:", data);

            window.location.reload();

        } catch (error) {
            console.error("Error deleting question", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="cursor-pointer" onClick={handleDelete}>
            {loading ? (
                <div className="mt-3 flex justify-center items-center h-full ">
                    <div className="flex items-center justify-center self-center ">
                        <div className="w-6 h-6 rounded-full animate-spin border 
             border-solid border-cyan-500 border-t-transparent"></div>
                    </div>
                </div>
            ) : (
                <HiOutlineTrash color="#00769E" />
            )}
        </div>
    );
};
export default DeleteQuestionButton;