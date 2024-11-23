"use client";
import { useEffect, useRef, useState } from "react";
import { HiPaperAirplane } from "react-icons/hi2";
import { getChatMessages } from "../actions/chat";
import { format, isToday, isYesterday } from "date-fns";
import io from "socket.io-client";
const socket = io("https://academiq.onrender.com", {
    extraHeaders: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
    reconnectionAttempts: 5,  // Number of reconnection attempts before failure
    reconnectionDelay: 1000,  // Delay between each reconnection attempt (in ms)
    reconnectionDelayMax: 5000,  // Max delay between reconnection attempts
});
const subscribeToChatMessages = (chatId, callback) => {
    socket.on(`chat:${chatId}`, (message) => {
        callback(message);
    });
};

const unsubscribeFromChatMessages = (chatId) => {
    socket.off(`chat:${chatId}`);
};
const ChatDetails = ({ selectedChatId, userId, chats, }) => {
    const [error, setError] = useState("");  // State to hold the error message
    const [chat, setChat] = useState(null); // State to hold current chat

    const [chatMessages, setChatMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const bottomRef = useRef(null);

    useEffect(() => {
        socket.on("connect", () => {
            console.log("Successfully connected");
        });

        return () => {
            socket.off("connect");
        };
    }, []);

    useEffect(() => {
        const fetchChatMessages = async () => {
            if (!selectedChatId) return;
            const currentChat = chats.find(chat => chat._id === selectedChatId);
            setChat(currentChat);
            setLoading(true);
            try {
                const data = await getChatMessages({ selectedChatId });
                setChatMessages(data.messages);
                subscribeToChatMessages(selectedChatId, (newMessage) => {
                    setChatMessages((prevMessages) => [...prevMessages, newMessage]);
                });
            } catch (err) {
                console.error("Error fetching chat messages:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchChatMessages();
        return () => {
            if (selectedChatId) {
                unsubscribeFromChatMessages(selectedChatId);
            }
        };
    }, [selectedChatId]);

    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: "auto" });
        }
    }, [chatMessages]);

    const sendMessage = async (messageContent) => {
        if (!selectedChatId) return;
        if (!messageContent.trim()) {
            setError("Message cannot be empty.");
            return;
        }
        const messageData = {
            senderId: userId,
            content: messageContent,
            chatId: selectedChatId,
        };
        const tempMessage = {
            ...messageData,
            _id: Date.now().toString(),
            createdAt: new Date().toISOString(),
            sender: { _id: userId },
        };

        setChatMessages((prevMessages) => [...prevMessages, tempMessage]);
        try {
            const response = await fetch(
                `https://academiq.onrender.com/chats/${selectedChatId}/messages`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                    },
                    body: JSON.stringify(messageData),
                }
            );
            if (!response.ok) {
                throw new Error("Failed to send message");
            }
            const newMessage = await response.json();
            setChatMessages((prevMessages) => [...prevMessages, newMessage]);

            socket.emit("sendMessage", newMessage);
            setError("");
        } catch (error) {
            console.error("Error sending message:", error);
            setError(error.message);
        }
    };


    if (!selectedChatId) {
        return <p className="text-center">Select a chat to view details.</p>;
    }

    const groupMessagesByDate = (messages) => {
        return messages.reduce((acc, msg) => {
            const date = new Date(msg.createdAt);
            if (isNaN(date)) {
                console.warn("Invalid date:", msg.createdAt);
                return acc;
            }

            const dateKey = format(date, "yyyy-MM-dd");
            if (!acc[dateKey]) acc[dateKey] = [];
            acc[dateKey].push(msg);
            return acc;
        }, {});
    };

    const groupedMessages = groupMessagesByDate(chatMessages);

    const getUserEmails = (chat) => {
        if (chat.type === "private") {
            const otherUser = chat?.member
            return otherUser?.email || "No email available";
        } else if (chat.type === "group") {
            return chat.members.map(member => member.email).join(", ");
        }
        return "";
    };

    return (
        <div className="flex flex-col justify-between mx-5  max-h-[100vh] min-h-[40vh] md:max-h-[90vh] bg-white rounded-2xl">
            <div className="flex m-3 items-start flex-col">
                <div className="flex flex-col ml-3">
                    <p className="font-poppins text-[15px]">
                        {chat && getUserEmails(chat) && (
                            <span className="block overflow-hidden text-ellipsis line-clamp-2">
                                {getUserEmails(chat)}
                            </span>
                        )}</p>
                </div>
                <hr className="w-full mt-1 h-0.2 bg-gray-100" />
            </div>
            {error && (
                <div className="bg-red-100 text-red-600 p-2 rounded mb-3">
                    {error}
                </div>
            )}
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
                                                <p className="text-[14px] break-words">{msg.content}</p>
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
                <form onSubmit={(e) => {
                    e.preventDefault();
                    const messageContent = e.target.message.value.trim();
                    if (messageContent) {
                        sendMessage(messageContent); // Call the sendMessage function
                    }
                    e.target.message.value = ""; // Clear input after sending
                }} className="flex mb-2">
                    <input
                        name="message"  // Add name="message" so it can be accessed in e.target.message
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
