"use client"
import { getOneReport, ReplyToReport } from "@/app/actions/reports";
import { useEffect, useState } from "react";

function ReportDetails({ selectedReportId }) {
    const [reportDetails, setReportDetails] = useState(null);
    const [replyMessage, setReplyMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('')
    const userId = JSON.parse(localStorage.getItem("userData"))?.user._id;
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (selectedReportId) {
            const fetchReportDetails = async () => {
                try {
                    const data = await getOneReport({ id: selectedReportId });
                    setReportDetails(data.report);
                    setLoading(false)
                } catch (err) {
                    console.error("Error fetching report details:", err);
                } finally {
                    setLoading(false)

                }
            };

            fetchReportDetails();
        }
    }, [selectedReportId]);

    if (!selectedReportId) {
        return <p className="flex items-center md:h-full justify-center font-poppins font-light 
        ">Select a report to view details</p>;
    }

    if (loading) return <div>
        <div className="mt-3 flex justify-center items-center h-full">
            <div className="flex items-center justify-center self-center ">
                <div className="w-8 h-8 rounded-full animate-spin border 
    border-solid border-cyan-500 border-t-transparent"></div>
            </div>
        </div>
    </div>;
    const handleReplyChange = (e) => {
        setReplyMessage(e.target.value);
    };
    const handleReplySubmit = async (e) => {
        e.preventDefault();
        if (!replyMessage.trim()) {
            setErrorMessage("Please enter a message to reply.");
            return;
        }

        try {
            const message = replyMessage

            const response = await ReplyToReport({ id: selectedReportId, message });
            console.log('Reply sent successfully:', response);

            setReplyMessage('');
        } catch (err) {
            console.error("Error sending reply:", err);
        }
    };
    const {
        subject,
        body,
        createdAt,
        reply,
        from,
        to,
    } = reportDetails;
    const isSender = userId === from._id;
    const isRecipient = userId === to._id;
    const formattedTime = new Date(createdAt).toLocaleString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        day: "2-digit",
        month: "short",
        year: "numeric",
    });

    return (
        <div className="flex flex-col justify-between
        md:mt-3 md:mx-5 min-h-[20vh] max-h-[100vh] md:min-h-[80vh] bg-white rounded-2xl">
            <div className="flex m-3 items-start flex-col">
                <div className="flex flex-col ml-3">
                    <p className="font-poppins text-[15px]">{`${to.name.first} ${to.name.last}`}</p>
                    <p className="font-poppins text-[10px] text-gray-500">{to.email}</p>
                    <p className="font-poppins text-[10px] text-gray-500">From: You</p>
                </div>
                <hr className="w-full mt-1 h-0.2 bg-gray-100" />
                <div className="flex m-3 space-x-2">
                    <p className="font-poppins text-[15px] font-semibold">Subject: </p>
                    <p className="font-poppins text-[14px] text-gray-600">{subject}</p>
                </div>
                <hr className="w-full h-0.2 bg-gray-100" />

            </div>
            <div>
                <div className="flex flex-col justify-between px-4 space-y-1">
                    <div className="flex flex-col bg-blueHover p-3 rounded-2xl">
                        <p className="font-poppins text-[15px] font-semibold">Your Message:</p>
                        <p className="font-poppins text-[14px] text-gray-600">{body}</p>
                    </div>
                    <p className="self-end text-[10px] text-gray-500">{formattedTime}</p>
                </div>
                <hr className="w-full h-0.2 bg-gray-100 mt-3" />
                {!isSender && (
                    <div className="p-3">
                        {reply ? (
                            <div className="flex flex-col bg-blueHover p-3 rounded-2xl">
                                <p className="font-poppins text-[15px] font-semibold">Reply</p>
                                <p className="font-poppins text-[14px] text-gray-600">{reply}</p>
                            </div>
                        ) : (
                            <form onSubmit={handleReplySubmit}>
                                <textarea
                                    value={replyMessage}
                                    onChange={handleReplyChange}
                                    placeholder="Type your reply..."
                                    className="w-full p-2 mt-2 border border-gray-300 rounded-lg resize-none"
                                    rows="2"
                                ></textarea>
                                {errorMessage && <p className="font-poppins text-red-700">{errorMessage}</p>}
                                <button
                                    type="submit"
                                    className="bg-bluePrimary text-white font-poppins py-2 px-4 mt-3 rounded-lg"
                                >
                                    Send Reply
                                </button>
                            </form>
                        )}
                    </div>
                )}
                {!isRecipient && (
                    <div className="p-3">
                        {reply ? (
                            <div className="flex flex-col bg-blueHover p-3 rounded-2xl">
                                <p className="font-poppins text-[15px] font-semibold">Reply</p>
                                <div className="flex items-center space-x-2">
                                    <p className="font-poppins text-[15px] ">From:</p>
                                    <p className="font-poppins text-[10px] text-gray-500 overflow-hidden">{to.email}</p>
                                </div>
                                <p className="font-poppins text-[14px] text-gray-600">{reply}</p>
                            </div>
                        ) : (
                            <div className="flex flex-col bg-blueHover p-3 rounded-2xl">
                                <p className="font-poppins text-[15px] font-semibold">You havent recieved a reply yet</p>
                            </div>
                        )}
                    </div>
                )
                }

            </div>
        </div>
    );
}

export default ReportDetails
