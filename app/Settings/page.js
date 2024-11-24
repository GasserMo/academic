"use client"
import Image from "next/image";
import '@/app/_styles/globals.css'
import CancelButton from "@/app/_components/CancelButton";
import FormRow from "../_components/FormRow";
import { useContext, useEffect, useState } from "react";
import { HiMiniPencilSquare } from "react-icons/hi2";
import { AiOutlineClose } from "react-icons/ai";
import { resetPassword, ResetPassword } from "../actions/getUser";
const SettingsPage = () => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [userId, setUserId] = useState(null);
    const [changingPassowrd, setChangingPassword] = useState(false)
    const [error, setError] = useState(null); // For error handling

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!oldPassword || !newPassword) {
            setError("Both fields are required");
            return;
        }
        setChangingPassword(true);
        setError(null);
        const passwordData = { oldPassword, password: newPassword };
        try {
            await resetPassword(passwordData);
            alert("Password changed successfully!");
        } catch (err) {
            setError(err.message || "An error occurred while changing the password");
        } finally {
            setChangingPassword(false);
        }
    };
    const toggleOldPasswordVisibility = () => {
        setShowOldPassword((prev) => !prev);
    };

    const toggleNewPasswordVisibility = () => {
        setShowNewPassword((prev) => !prev);
    };
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedUserData = localStorage.getItem("userData");
            if (storedUserData) {
                const userData = JSON.parse(storedUserData);
                setUserId(userData?.user?._id);  // Set userId if available
            }
        }
    }, []);

    useEffect(() => {
        if (userId) {
            const fetchUser = async () => {
                const token = JSON.parse(localStorage.getItem("userData"))?.token;
                const url = `https://academiq.onrender.com/users/${userId}`;
                try {
                    const response = await fetch(url, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        },
                    });
                    if (!response.ok) {
                        const errorData = await response.json();
                        console.error("Error Data:", errorData);
                        throw new Error(errorData.error || "Unknown error");
                    }
                    const result = await response.json();
                    setData(result.user);
                    setLoading(false);
                } catch (error) {
                    console.error("Error getting user data", error);
                    setLoading(false);
                }
            };
            fetchUser();
        }
    }, [userId]);
    if (!data) {
        return <div className="bg-gray-100 w-full min-h-[100vh] flex items-center justify-center ">
            <div class="flex items-center justify-center self-center">
                <div
                    class="w-12 h-12 rounded-full animate-spin border border-solid border-cyan-500 border-t-transparent">
                </div>
            </div>
        </div>
    }
    const {
        name: { first, last },
        email,
        profilePicture: { url: picture },
        ssn,
        birthdate,
        gender,
        department,
        role,
        userId: fetchedUserId,
        username,
        contactInformation: { address: { street, city, state } },
    } = data;

    const fullName = `${first} ${last}`;
    if (loading) {
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
                <div className="flex flex-col mt-5">
                    <div className="flex justify-evenly w-full">
                        <Details title={'Name:'} info={fullName} />
                        <Details title={'Role:'} info={role} />
                    </div>
                    <div className="flex justify-evenly w-full">
                        <Details title={'Email:'} info={email} />
                        <Details title={'Username:'} info={username} />
                    </div>
                    <div className="flex justify-evenly w-full"> <Details title={'User Id:'} info={fetchedUserId} />
                        <Details title={'Birthdate:'} info={birthdate} /></div>
                    <div className="flex justify-evenly w-full"><Details title={'Gender:'} info={gender} />
                        <Details title={'SSN:'} info={ssn} /></div>
                    <div className="flex justify-evenly w-full">
                        <Details title={'department:'} info={department} />
                        <Details title={'Address:'} info={street + ', ' + city + ', ' + state} />
                    </div>
                    <form onSubmit={handleSubmit} className="flex mx-3 mb-5 justify-between flex-wrap">
                        {/*  <div className="w-full md:w-1/2 px-2 mb-4">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                Old Password
                            </label>
                            <input
                                className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                                type="password"
                                placeholder="Please enter your old password"
                            />
                        </div> */}
                        <div className="w-full md:w-1/2 px-2 mb-4">
                            <FormRow
                                label="Old Password"
                                id="oldPassword"
                                type="password"
                                placeholder="Please enter your old password"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                showPassword={showOldPassword}
                                togglePasswordVisibility={toggleOldPasswordVisibility}
                            />
                        </div>
                        <div className="w-full md:w-1/2 px-2 mb-4">
                            <FormRow
                                label="New Password"
                                id="newPassword"
                                type="password"
                                placeholder="Please enter your new password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                showPassword={showNewPassword}
                                togglePasswordVisibility={toggleNewPasswordVisibility}
                            />
                        </div>
                        {error && <p className="text-red-500 text-sm font-poppins ">{error}</p>}

                        <button
                            type="submit"
                            className="w-full py-2 px-4 text-center text-white hover:bg-blueSecondary bg-bluePrimary cursor-pointer rounded-md font-poppins"
                            disabled={changingPassowrd}
                        >
                            {changingPassowrd ? "Changing Password..." : "Change Password"}
                        </button>

                    </form>

                </div>
            </div>
        </div>
    )
}

export default SettingsPage

function Details({ title, info }) {
    return <div className="w-full mx-4">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
            {title}
        </label>
        <input class=" block w-full bg-gray-200
       text-gray-700 border rounded py-3 px-4 mb-3 cursor-not-allowed
        focus:outline-none focus:bg-white"
            disabled placeholder={info} value={info || 'No Data Available'}></input>
    </div>
    {/* <div>
        <div className=" mx-5 flex justify-start space-x-4 items-center">
            <p className="font-poppins text-gray-600 text-[12px]">{title}</p>
            <p className="font-poppins text-gray-600">{info}</p>
        </div>
        <hr className="w-full h-0.5  my-2 bg-gray-100" />
    </div> */}
}