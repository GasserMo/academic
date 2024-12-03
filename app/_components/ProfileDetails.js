
import Image from "next/image"
import { cookies } from "next/headers";
import Link from "next/link";


const ProfileDetails = async () => {
    const authToken = cookies().get("authToken")?.value;
    const userId = cookies().get("userId")?.value;
    const url = `https://academiq.onrender.com/users/${userId}`;
    let data = null;
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}`
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

    const { user: { name: { first, last }, email, profilePicture: { url: picture }, } } = data
    const fullName = `${first} ${last}`;

    return (

        <div className="hidden md:flex space-x-5 cursor-pointer rounded-xl  pt-3 flex items-center justify-evenly ">
            <Link href={`/Profile/${userId}`} className={`${picture ? ' w-[15%]' :

                'w-12 h-12 rounded-full flex items-center justify-center bg-bluePrimary'}`}>
                {picture ? <Image
                    src={picture}
                    alt="Image"
                    width={80}
                    height={100}
                    className='rounded-full'
                /> : <div className="flex items-center justify-center">
                    <p className="text-white">{first.charAt(0)}</p>
                    <p className="text-white">{last.charAt(0)}</p>
                </div>}
            </Link>

            <Link className="bg-white w-[60%] rounded-xl " href={`/Profile/${userId}`}>
                <p className="font-poppins text-center">{fullName}</p>
                <p className="font-poppins truncate text-xs text-gray-600 text-center">
                    {email}</p>
            </Link>
        </div >
    )
}

export default ProfileDetails