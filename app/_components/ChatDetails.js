"use client";
import { useEffect, useRef, useState } from "react";
import { HiPaperAirplane } from "react-icons/hi2";
import { getChatMessages } from "../actions/chat";
import { format, isToday, isYesterday } from "date-fns";

const ChatDetails = ({ selectedChatId, userId }) => {
    const [chatMessages, setChatMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const bottomRef = useRef(null);

    useEffect(() => {
        const fetchChatMessages = async () => {
            if (!selectedChatId) return;

            setLoading(true);
            try {
                const data = await getChatMessages({ selectedChatId })
                setChatMessages(data.messages);
            } catch (err) {
                console.error("Error fetching chat messages:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchChatMessages();
    }, [selectedChatId]);
    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: "auto" });
        }
    }, [chatMessages]);
    if (!selectedChatId) {
        return <p className="text-center">Select a chat to view details.</p>;
    }

    const groupMessagesByDate = (messages) => {
        return messages.reduce((acc, msg) => {
            const date = new Date(msg.createdAt);
            const dateKey = format(date, "yyyy-MM-dd");
            if (!acc[dateKey]) acc[dateKey] = [];
            acc[dateKey].push(msg);
            return acc;
        }, {});
    };

    const groupedMessages = groupMessagesByDate(chatMessages);
    return (
        <div className="flex flex-col justify-between mx-5 min-h-[20vh] md:max-h-[90vh] max-h-[100vh] md:min-h-[80vh] bg-white rounded-2xl">
            <div className="flex m-3 items-start flex-col">
                <div className="flex flex-col ml-3">
                    <p className="font-poppins text-[15px]">Chat Details</p>
                </div>
                <hr className="w-full mt-1 h-0.2 bg-gray-100" />
            </div>

            <div className="flex-1 scrollbar-thin scrollbar-track-gray-200 scrollbar-thumb-bluePrimary overflow-y-auto p-3 space-y-4">
                {loading ? (
                    <div className="mt-3 flex justify-center items-center h-full ">
                        <div className="flex items-center justify-center self-center ">
                            <div className="w-8 h-8 rounded-full animate-spin border 
                    border-solid border-cyan-500 border-t-transparent"></div>
                        </div>
                    </div>
                ) : (
                    Object.keys(groupedMessages).map((dateKey) => {
                        const isGroupToday = isToday(new Date(dateKey));
                        const isGroupYesterday = isYesterday(new Date(dateKey));
                        const dateLabel = isGroupToday
                            ? "Today"
                            : isGroupYesterday
                                ? "Yesterday"
                                : format(new Date(dateKey), "EEEE, MMM d");

                        return (
                            <div key={dateKey}>
                                <p className="text-center text-gray-500 text-[12px] mb-2 font-poppins">
                                    {dateLabel}
                                </p>
                                {groupedMessages[dateKey].map((msg) => {
                                    const isSender = msg.sender._id === userId;
                                    return (
                                        <div
                                            ref={bottomRef}
                                            key={msg._id}
                                            className={`flex ${isSender ? "justify-end" : "justify-start"} mb-1`}
                                        >
                                            <div
                                                className={`p-3 rounded-3xl max-w-xs font-poppins ${isSender
                                                    ? "bg-bluePrimary text-white"
                                                    : "bg-gray-200 text-black"
                                                    }`}
                                            >
                                                <p className="text-[14px]">{msg.content}</p>
                                                <p className="text-[10px] mt-1 text-opacity-70">
                                                    {format(new Date(msg.createdAt), "h:mm a")}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })
                )}
                <div ref={bottomRef} />

            </div>

            <div>
                <hr className="w-full h-0.2 bg-gray-100 my-3" />
                <form className="flex mb-2">
                    <input
                        placeholder="Type a message..."
                        className="w-[90%] p-2 m-2 border border-gray-200 rounded-lg resize-none"
                    />
                    <div
                        type="submit"
                        className="self-center text-bluePrimary font-poppins px-4 rounded-lg"
                    >
                        <HiPaperAirplane size={24} />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ChatDetails
