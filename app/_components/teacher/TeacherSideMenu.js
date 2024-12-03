"use client"

import '@/app/_styles/globals.css'
import SidebarItem from '../Students/SidebarItem';
import SettingIcon from '@/public/icons/SettingIcon';
import LogoutIcon from '@/public/icons/LogoutIcon';
import { HiMenu } from 'react-icons/hi';
import Logo from '../Logo';
import Link from 'next/link';
import HomeIcon from '@/public/icons/HomeIcon';
import CoursesIcon from '@/public/icons/CoursesIcon';
import QuestionBankIcon from '@/public/icons/QuestionBankIcon';
import ExamIcon from '@/public/icons/ExamIcon';
import GradesIcon from '@/public/icons/GradesIcon';
import AttendanceIcon from '@/public/icons/AttendanceIcon';
import ReportIcon from '@/public/icons/ReportIcon';
import ConnectIcon from '@/public/icons/ConnectIcon';
import { useEffect, useState } from 'react';
import AssignmentIcon from '@/public/icons/AssignmentIcon';

function TeacherSideMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeItem, setActiveItem] = useState("Home");

    useEffect(() => {
        if (typeof window !== "undefined") {
            const pathToItem = {
                "/Teacher/Home": "Home",
                "/Teacher/Courses": "Courses",
                "/Teacher/QuestionBank": "QuestionBank",
                "/Teacher/Exams": "CourseExams",
                "/Teacher/Grades": "Grades",
                "/Teacher/Attendance": "Attendance",
                "/Teacher/Assignment": "Assignment",
                "/Teacher/Connect": "Connect",
                "/Teacher/Report": "Report",
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


    return (
        <div>
            <div className="flex flex-row items-center   px-4 py-2 md:hidden">
                <HiMenu
                    className="text-bluePrimary cursor-pointer"
                    size={20}
                    onClick={toggleSidebar}
                />
                <div className="flex-1 flex justify-center">
                    <Logo height={40} width={100} />
                </div>
            </div>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={toggleSidebar}
                />
            )}

            <div
                className={`fixed top-0 left-0 z-50 h-full w-64 
                     bg-white shadow-md  md:max-h-[120vh]
                     md:rounded-xl md:my-2 md:mx-2
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
                <div className=" w-[80%] md:m-5 mt-4">
                    <Link href="/Teacher/Home">
                        <div onClick={() => handleItemClick("Home")}>
                            <SidebarItem active={activeItem === "Home"}>
                                <HomeIcon active={activeItem === "Home"} />
                            </SidebarItem>
                        </div>
                    </Link>
                    <Link href="/Teacher/Courses">
                        <div onClick={() => handleItemClick("Courses")}>
                            <SidebarItem active={activeItem === "Courses"}>
                                <CoursesIcon active={activeItem === "Courses"} />
                            </SidebarItem>
                        </div>
                    </Link>
                    <Link href="/Teacher/QuestionBank">
                        <div onClick={() => handleItemClick("QuestionBank")}>
                            <SidebarItem active={activeItem === "QuestionBank"}>
                                <QuestionBankIcon active={activeItem === "QuestionBank"} />
                            </SidebarItem>
                        </div>
                    </Link>
                    <Link href="/Teacher/Exams">
                        <div onClick={() => handleItemClick("Exams")}>
                            <SidebarItem active={activeItem === "Exams"}>
                                <ExamIcon active={activeItem === "Exams"} />
                            </SidebarItem>
                        </div>
                    </Link>
                    <Link href="/Teacher/Grades">
                        <div onClick={() => handleItemClick("Grades")}>
                            <SidebarItem active={activeItem === "Grades"}>
                                <GradesIcon active={activeItem === "Grades"} />
                            </SidebarItem>
                        </div>
                    </Link>

                    <Link href="/Teacher/Attendance">
                        <div onClick={() => handleItemClick("Attendance")}>
                            <SidebarItem active={activeItem === "Attendance"}>
                                <AttendanceIcon active={activeItem === "Attendance"} />
                            </SidebarItem>
                        </div>
                    </Link>
                    <Link href="/Teacher/Assignment">
                        <div onClick={() => handleItemClick("Assignment")}>
                            <SidebarItem active={activeItem === "Assignment"}>
                                <AssignmentIcon active={activeItem === "Assignment"} />
                            </SidebarItem>
                        </div>
                    </Link>
                    <Link href="/Teacher/Connect">
                        <div onClick={() => handleItemClick("Connect")}>
                            <SidebarItem active={activeItem === "Connect"}>
                                <ConnectIcon active={activeItem === "Connect"} />
                            </SidebarItem>
                        </div>
                    </Link>
                    <Link href="/Teacher/Report">
                        <div onClick={() => handleItemClick("Report")}>
                            <SidebarItem active={activeItem === "Report"}>
                                <ReportIcon active={activeItem === "Report"} />
                            </SidebarItem>
                        </div>
                    </Link>

                </div>
                <hr className="overflow-y-auto w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10" />
                <div className="w-[80%] md:mx-5">
                    <SidebarItem><SettingIcon active={activeItem === "Settings"} /></SidebarItem>
                    <SidebarItem><LogoutIcon active={activeItem === "Logout"} /></SidebarItem>
                </div>
            </div>
        </div>
    )
}



export default TeacherSideMenu
