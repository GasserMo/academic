"use client"; // This will make it a Client Component

import { HiArrowLeft } from "react-icons/hi2";

function CancelButton({ onCancel }) {
    const handleCancel = () => {
        window.history.back(); // Go back to the previous page
    };
    return (
        <div onClick={handleCancel} className="p-5 cursor-pointer">
            <HiArrowLeft size={24} />
        </div>
    );
}

export default CancelButton;