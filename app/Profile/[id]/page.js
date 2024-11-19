import { cookies } from "next/headers";
import Image from "next/image";
import '@/app/_styles/globals.css'
import { HiArrowLeft } from "react-icons/hi2";
import CancelButton from "@/app/_components/CancelButton";
import Loading from "@/app/Student/loading";

const ProfilePage = async () => {
    const authToken = cookies().get("authToken")?.value;
    const id = cookies().get("userId")?.value;
    const url = `https://academiq.onrender.com/users/${id}`;
    let data = null;
    let isLoading = true;

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
        isLoading = false
    } catch (error) {
        console.error("Error getting user data", error);
        isLoading = false

        throw error;

    }

    const {
        user: { name: { first, last },
            email,
            profilePicture: { url: picture },
            ssn,
            birthdate,
            gender,
            role,
            userId,
            department, username,
            contactInformation: {
                address: {
                    street,
                    city,
                    state
                },
            },
        } } = data
    const fullName = `${first} ${last}`;
    if (isLoading) {
        return <div className="bg-gray-100 w-full min-h-[100vh] flex items-center justify-center ">
            <div class="flex items-center justify-center self-center">
                <div
                    class="w-12 h-12 rounded-full animate-spin border border-solid border-cyan-500 border-t-transparent">
                </div>
            </div>
        </div>
    }
    return (
        <div className="bg-gray-100 w-full min-h-[100vh]  flex items-center justify-center ">
            <div className="bg-white w-[90%]  my-4 overflow-y-auto scrollbar-thin
             scrollbar-track-white scrollbar-thumb-bluePrimary max-h-[100vh] rounded-2xl">
                <CancelButton />

                <div className='py-2 flex justify-center'>
                    {picture ? <Image
                        src={picture}
                        alt="Image"
                        width={150}
                        height={100}
                        className='rounded-full'
                    /> : <div className="flex items-center  rounded-full bg-bluePrimary
                     justify-center w-16 h-16">
                        <p className="font-poppins font-semibold text-white">{first.charAt(0)}</p>
                        <p className="font-poppins font-semibold text-white">{last.charAt(0)}</p>
                    </div>}
                </div>
                <p className="text-bluePrimary font-poppins text-center">{fullName}</p>
                <div className="flex flex-col">
                    <Details title={'Name:'} info={fullName} />
                    <Details title={'Role:'} info={role} />
                    <Details title={'Email:'} info={email} />
                    <Details title={'Username:'} info={username} />
                    <Details title={'User Id:'} info={userId} />
                    <Details title={'Birthdate:'} info={birthdate} />
                    <Details title={'Gender:'} info={gender} />
                    <Details title={'SSN:'} info={ssn} />
                    <Details title={'department:'} info={department} />
                    <Details title={'Address:'} info={street + ', ' + city + ', ' + state} />
                </div>
            </div>

        </div>
    )
}

export default ProfilePage

function Details({ title, info }) {
    return <div>
        <div className=" mx-5 flex justify-start space-x-4 items-center">
            <p className="font-poppins text-gray-600 text-[12px]">{title}</p>
            <p className="font-poppins text-gray-600">{info}</p>
        </div>
        <hr className="w-full h-0.5  my-2 bg-gray-100" />
    </div>
}