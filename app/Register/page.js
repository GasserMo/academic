"use client"
import '@/app/_styles/globals.css'
import Image from "next/image"
import learn from "@/public/learn.png"
import Logo from "@/app/_components/Logo"
import RegisterButton from "@/app/_components/RegisterButton"
import LogoWhite from "@/app/_components/LogoWhite";
import FormRow from "@/app/_components/FormRow";
import { useState } from "react"


function Page() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLogin, setLogin] = useState(true)
    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };
    return (
        <div className="flex flex-col justify-center items-center md:grid
         md:grid-cols-[40%_60%]  min-h-screen">
            <div className="hidden  md:flex md:flex-col md:items-center md:justify-center
             md:h-screen md:bg-gradient-to-b from-bluePrimary to-greenPrimary">
                <LogoWhite height="100" width="200" />
                <Image src={learn} alt="learn" width={200} height={200} />
            </div>
            <div className="flex flex-col items-center justify-center min-h-screen bg-white py-10">
                <div className="flex justify-center md:w-full w-full mb-8">
                    <Logo height={100} width={300} />
                </div>
                <form className="md:w-3/4 w-[90%] md:max-w-md space-y-4">
                    <div>
                        <p className="font-poppins md:text-headline-large mb-10 text-headline-medium font-semibold">
                            {isLogin ? "Log in" : "Sign up"}
                        </p>

                        <FormRow
                            value={email}
                            label="Email"
                            id="email"
                            type="text"
                            placeholder="Enter your Email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <FormRow
                            value={password}
                            label="Password"
                            id="password"
                            type="password"
                            placeholder="Enter your Password"
                            onChange={(e) => setPassword(e.target.value)}
                            showPassword={showPassword} // Pass showPassword state
                            togglePasswordVisibility={togglePasswordVisibility}
                        />
                        <p className="flex justify-end mb-4 font-poppins text-[15px] md:text-headline-black">
                            Forgot Password?
                        </p>
                        <RegisterButton>Log in</RegisterButton>
                        <p className="text-center text-gray-600">
                            {isLogin ? "Don't have an account" : "Already have an account?"}
                            <span
                                onClick={() => setLogin((logged) => !logged)}
                                className="font-poppins md:text-headline-black text-bluePrimary cursor-pointer"
                            >
                                {isLogin ? " Sign up" : " Log in"}
                            </span>
                        </p>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default Page
