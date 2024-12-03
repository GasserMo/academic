import Image from "next/image";
import { cookies } from "next/headers";
import { Suspense } from "react";

const AnnouncementsPage = async () => {
    const authToken = cookies().get("authToken")?.value;
    let data = null;
    try {
        const url = `https://academiq.onrender.com/discussions/global`;
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
    } catch (err) {
        console.error("Error getting posts data", err);
    }

    const posts = data?.discussion?.posts;

    if (!posts) {
        return <p className="font-poppins text-lg">No Announcements available</p>;
    }

    return (
        <div className="flex flex-col border rounded-lg p-2 
        bg-white w-[95%]  md:w-[90%] my-4 mx-auto">
            <h1 className="text-lg font-poppins mb-1">Announcement</h1>
            <div className="flex overflow-x-auto space-x-4 scrollbar-thin scrollbar-track-white scrollbar-thumb-bluePrimary">
                {posts.map((post) => (
                    <div key={post._id} className="flex-shrink-0 mb-2">
                        {post.attachments && post.attachments.length > 0 && (
                            <Image
                                src={post.attachments[0]} // Assuming the first attachment is an image URL
                                alt={`Attachment`}
                                width={280}
                                height={150}
                                className="rounded-lg"
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

const Announcements = () => {
    return (
        <Suspense fallback={
            <div className="flex flex-col border rounded-lg p-2 bg-white w-[90%] my-4 mx-auto">
                <div className="mt-3 flex justify-center items-center w-[90%]">
                    <div className="flex items-center justify-center self-center ">
                        <div className="w-8 h-8 rounded-full animate-spin border 
                border-solid border-cyan-500 border-t-transparent"></div>
                    </div>
                </div></div>}>
            <AnnouncementsPage />
        </Suspense>
    );
};

export default Announcements;



