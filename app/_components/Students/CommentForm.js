"use client"

import { useState } from "react";

function CommentForm() {
    const [comment, setComment] = useState('');
    const handleChange = (event) => {
        setComment(event.target.value);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        setComment('');
    };

    return (
        <div className=" mt-4  rounded-lg w-full  ">
            <h2 className="font-poppins  mb-4">Add a Comment (Optional)</h2>
            <form >
                <textarea
                    id="comment"
                    value={comment}
                    onChange={handleChange}
                    rows="3"
                    className="border border-gray-300 bg-gray-100  rounded-md p-2 w-full focus:outline-none focus:ring-1 focus:ring-bluePrimary"
                />
            </form>
        </div>
    );
}
export default CommentForm