import { cookies } from "next/headers";
import ChatList from "./ChatList";

const ConnectInbox = async () => {
    const authToken = cookies().get("authToken")?.value;
    const userId = cookies().get("userId")?.value;
    const url = `https://academiq.onrender.com/chats`;

    let data = null;
    try {
        const response = await fetch(url, {
            method: "GET",
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

        data = await response.json();
    } catch (error) {
        console.error("Error getting user data", error);
        throw error;
    }

    return (
        <div className="mx-2">
            <ChatList chats={data?.chats} userId={userId} />
        </div>
    );
};

export default ConnectInbox;

/* 
function InboxChat({ data, userId }) {
    return <div className="space-y-4">
        {data?.map((chat, index) => {
            const member = chat.member ? chat.member : chat.members?.[0]; // handle private and group chats
            const lastMessage = chat.lastMessage?.[0] || {}; // Ensure lastMessage is not empty

            return (
                <div key={chat._id}  className="flex justify-between p-3 bg-blueHover rounded-2xl">
                    <div className="flex">
                        <div className="rounded-full p-1 w-10 h-10 bg-bluePrimary text-white
                        items-center flex justify-center">
                            <p>{member?.name?.first[0]}{member?.name?.last[0]}</p>
                        </div>

                        <div className="flex flex-col items-evenly ml-2">
                            <p className="font-poppins text-[10px]">
                                {member?.name?.first} {member?.name?.last}
                            </p>
                            <div className="flex items-center mt-1 ">
                                {lastMessage.sender._id === userId &&
                                    <HiCheck />
                                }
                                <p className="font-poppins text-[12px] text-gray-500">
                                    {lastMessage.content || "No message"}
                                </p>
                            </div>
                        </div>
                    </div>

                    <p className="font-poppins text-gray-500 text-[10px]">
                        {new Date(lastMessage.createdAt).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                        })}
                    </p>
                </div>
            );
        })}
    </div>
} */