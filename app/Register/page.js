"use client"
import '@/app/_styles/globals.css'
import Image from "next/image"
import learn from "@/public/learn.png"
import Logo from "@/app/_components/Logo"
import RegisterButton from "@/app/_components/RegisterButton"
import LogoWhite from "@/app/_components/LogoWhite";
import FormRow from "@/app/_components/FormRow";
import { useContext, useState } from "react"
import { login, loginUser } from '../actions/auth'
import { globalState } from "../context"; // Make sure the path is correct
import Spinner from '../_components/Spinner'
import LoadingLogin from '../_components/LoadingLogin'


function Page() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLogin, setLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const { setData } = useContext(globalState); // Access setData from the context

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        try {
            const data = await login({ email, password });
            console.log("Login Data:", data);
            setData((prevState) => ({
                ...prevState,
                userData: data,
            }));

            const userRole = data.user.role;
            const token = data.token;
            localStorage.setItem('authToken', token);

            if (userRole === "teacher") {
                window.location.href = "/Teacher/Home";  // Redirect to Teacher's Home
            } else if (userRole === "student") {
                window.location.href = "/Student/Home";  // Redirect to Student's Home
            } else if (userRole === "parent") {
                window.location.href = "/Parent/Home";  // Redirect to Parent's Home
            } else {
                setError("Unknown user role");
            }
        } catch (error) {
            setError("Login failed: " + error.message);
        } finally {
            setIsLoading(false)
        }
    };

    return (
        <div className="flex flex-col justify-center items-center md:grid md:grid-cols-[40%_60%] min-h-screen">
            <div className="hidden md:flex md:flex-col md:items-center md:justify-center md:h-screen md:bg-gradient-to-b from-bluePrimary to-greenPrimary">
                <LogoWhite height="100" width="200" />
                <Image src={learn} alt="learn" width={200} height={200} />
            </div>
            <div className="flex flex-col items-center justify-center min-h-screen bg-white py-10">
                <div className="flex justify-center md:w-full w-full mb-8">
                    <Logo height={100} width={300} />
                </div>
                <form onSubmit={handleLoginSubmit} className="md:w-3/4 w-[90%] md:max-w-md space-y-4">
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
                            showPassword={showPassword}
                            togglePasswordVisibility={togglePasswordVisibility}
                        />
                        {error && <p className="text-red-500">{error}</p>}
                        {/* <p className="flex justify-end mb-4 font-poppins text-[15px] md:text-headline-black">
                            Forgot Password?
                        </p> */}
                        <div className='mt-5'>
                            <RegisterButton>{isLoading ? <LoadingLogin /> : 'Login'}</RegisterButton>

                        </div>                        {/* <p className="text-center text-gray-600">
                            {isLogin ? "Don't have an account" : "Already have an account?"}
                            <span
                                onClick={() => setLogin((logged) => !logged)}
                                className="font-poppins md:text-headline-black text-bluePrimary cursor-pointer"
                            >
                                {isLogin ? " Sign up" : " Log in"}
                            </span>
                        </p> */}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Page;


