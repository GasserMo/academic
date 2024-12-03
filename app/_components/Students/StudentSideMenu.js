"use client";
import Logo from "../Logo"
import SidebarItem from "./SidebarItem"
import HomeIcon from '/public/icons/HomeIcon.js'

import AssignmentIcon from '/public/icons/AssignmentIcon.js'
import CalendarIcon from '/public/icons/CalendarIcons.js'
import SettingIcon from "@/public/icons/SettingIcon";
import LogoutIcon from "@/public/icons/LogoutIcon";
import Link from "next/link";
import { HiMenu } from "react-icons/hi";
import { useEffect, useState } from "react";
import CoursesIcon from "@/public/icons/CoursesIcon";
import ExamIcon from "@/public/icons/ExamIcon";
function StudentSideMenu() {
    const [isOpen, setIsOpen] = useState(false); // Sidebar state
    const [activeItem, setActiveItem] = useState("Home"); // Track the active sidebar item
    useEffect(() => {
        if (typeof window !== "undefined") {
            const pathToItem = {
                "/Student/Home": "Home",
                "/Student/Courses": "Courses",
                "/Student/TodoList": "TodoList",
                "/Student/Assignments": "Assignments",
                "/Student/Exams": "CourseExams",

            };
            setActiveItem(pathToItem[window.location.pathname] || "Home");
        }
    }, []);
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const handleItemClick = (item) => {
        setActiveItem(item);
        setIsOpen(false);
    };

    const logout = () => {
        localStorage.removeItem("userData");
        setData((prevState) => {
            return {
                ...prevState,
                userData: null,
            };
        });
        router.push('/Register');

    };
    return (
        <div>
            {/* Mobile Menu Toggle */}
            <div className="flex flex-row items-center  px-4 py-2 md:hidden">
                <HiMenu
                    className="text-bluePrimary cursor-pointer"
                    size={20}
                    onClick={toggleSidebar}
                />
                <div className="flex-1 flex justify-center">
                    <Logo height={40} width={100} />
                </div>
            </div>

            {/* Overlay Background */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={toggleSidebar}
                />
            )}

            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 z-50 h-full
                     bg-white shadow-md md:min-h-[50vh] md:max-h-[90vh]
                     md:rounded-xl md:mt-2 md:mx-2
                     transition-transform transform
                      ${isOpen ? "translate-x-0" : "-translate-x-full"
                    } md:relative md:translate-x-0 md:flex md:flex-col md:w-64 
                    md:shadow-none`}
            >
                {/* Logo */}
                <div className="flex flex-row items-center w-full px-4 py-2">
                    <HiMenu
                        className="md:hidden text-bluePrimary cursor-pointer"
                        size={20}
                        onClick={toggleSidebar}
                    />
                    <div className="flex-1 flex justify-center">
                        <Logo height={40} width={100} />
                    </div>
                </div>

                {/* Sidebar Links */}
                <div className="w-[80%] md:m-5 mt-4">
                    <Link href="/Student/Home">
                        <div onClick={() => handleItemClick("Home")}>
                            <SidebarItem active={activeItem === "Home"}>
                                <HomeIcon active={activeItem === "Home"} />
                            </SidebarItem>
                        </div>
                    </Link>
                    <Link href="/Student/Courses">
                        <div onClick={() => handleItemClick("Courses")}>
                            <SidebarItem active={activeItem === "Courses"}>
                                <CoursesIcon active={activeItem === "Courses"} />
                            </SidebarItem>
                        </div>
                    </Link>
                    <Link href="/Student/TodoList">
                        <div onClick={() => handleItemClick("TodoList")}>
                            <SidebarItem active={activeItem === "TodoList"}>
                                <CalendarIcon active={activeItem === "TodoList"} />
                            </SidebarItem>
                        </div>
                    </Link>

                    <Link href="/Student/Assignments">
                        <div onClick={() => handleItemClick("Assignments")}>
                            <SidebarItem active={activeItem === "Assignments"}>
                                <AssignmentIcon active={activeItem === "Assignments"} />
                            </SidebarItem>
                        </div>
                    </Link>
                    <Link href="/Student/Exams">
                        <div onClick={() => handleItemClick("Exams")}>
                            <SidebarItem active={activeItem === "Exams"}>
                                <ExamIcon active={activeItem === "Exams"} />
                            </SidebarItem>
                        </div>
                    </Link>
                </div>
                <hr className="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10" />
                <div className="w-[80%] md:m-5">
                    <Link href='/Settings'>
                        <div onClick={() => handleItemClick("Settings")}>
                            <SidebarItem>
                                <SettingIcon active={activeItem === "Settings"} />
                            </SidebarItem>
                        </div>
                    </Link>
                    <div className="cursor-pointer" onClick={() => logout()}>
                        <SidebarItem><LogoutIcon active={activeItem === "Logout"} /></SidebarItem>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StudentSideMenu
