"use client"
import { useContext, useState } from "react";
import ChatDetails from "./ChatDetails";
import { HiCheck } from "react-icons/hi2";
const ChatList = ({ chats, userId }) => {
    const [selectedChatId, setSelectedChatId] = useState(null);

    const handleChatClick = (chatId) => {
        setSelectedChatId(chatId); // Save the selected chat ID
        console.log("Selected Chat ID:", chatId);
    };

    return (
        <div className="md:grid md:grid-cols-[30%_70%] md:min-h-[90vh] 
        flex flex-col rounded-2xl">
            <div className="flex flex-col items-center min-h-[40vh] md:max-h-[90vh] max-h-[100vh]
            scrollbar-thinscrollbar-track-gray-200 scrollbar-thumb-bluePrimary overflow-y-auto
             bg-white rounded-2xl">
                <p className="font-poppins text-center text-headline-small pt-2">Inbox</p>
                <hr className="w-full h-0.2 my-2 bg-gray-100" />
                <div className="space-y-2 w-[90%]  space-x-1">
                    {chats?.map((chat) => {
                        const member = chat.member || chat.members?.[0];
                        const lastMessage = chat.lastMessage?.[0] || {};

                        return (
                            <div
                                key={chat._id}
                                onClick={() => handleChatClick(chat._id)}
                                className="flex justify-between p-3 
                                 bg-blueHover rounded-2xl cursor-pointer"
                            >
                                <div className="flex">
                                    <div className="rounded-full p-1 w-10 h-10 bg-bluePrimary text-white items-center flex justify-center">
                                        <p>
                                            {member?.name?.first[0]}
                                            {member?.name?.last[0]}
                                        </p>
                                    </div>
                                    <div className="flex flex-col items-evenly ml-2">
                                        <p className="font-poppins text-[10px]">
                                            {member?.name?.first} {member?.name?.last}
                                        </p>
                                        <div className="flex items-center mt-1 space-x-1">
                                            {/* Reserve space for the checkmark */}
                                            <span
                                                className={`text-blue-500 ${lastMessage.sender._id === userId
                                                    ? "visible"
                                                    : "hidden"
                                                    }`}
                                            >
                                                <HiCheck />
                                            </span>
                                            <p className="font-poppins text-[12px] text-gray-500">
                                                {lastMessage.content || "No message"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <p className="font-poppins text-gray-500 text-[10px]">
                                    {new Date(lastMessage.createdAt).toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>

            {selectedChatId && <ChatDetails selectedChatId={selectedChatId}
                userId={userId} />}
        </div>
    );
};

export default ChatList;