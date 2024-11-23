"use client"
import SettingIcon from "@/public/icons/SettingIcon";
import SidebarItem from "../Students/SidebarItem";
import LogoutIcon from "@/public/icons/LogoutIcon";
import Link from "next/link";
import HomeIcon from "@/public/icons/HomeIcon";
import { HiMenu } from "react-icons/hi";
import Logo from "../Logo";
import { useContext, useEffect, useState } from "react";
import ChildIcon from "@/public/icons/ChildIcon";
import ReportIcon from "@/public/icons/ReportIcon";
import '@/app/_styles/globals.css'
import ConnectIcon from "@/public/icons/ConnectIcon";
import { getChildByParent } from "@/app/actions/getChild";
import { globalState } from "@/app/context";
import { useRouter } from "next/navigation";
function ParentSideMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeItem, setActiveItem] = useState("Home");
    const [childMenuOpen, setChildMenuOpen] = useState(false);
    const [childList, setChildList] = useState([]);
    const { data } = useContext(globalState)
    const userId = data?.userData?.user?._id
    const router = useRouter();


    useEffect(() => {
        if (typeof window !== "undefined") {
            const pathToItem = {
                "/Parent/Home": "Home",
                "/Parent/Child": "Child",
                "/Parent/Connect": "Connect",
                "/Parent/Report": "Report",
            };
            setActiveItem(pathToItem[window.location.pathname] || "Home");
        }
    }, []);
    useEffect(() => {
        const fetchChildren = async () => {
            try {
                const data = await getChildByParent({ parentId: userId })
                setChildList(data.children)
                /* if (data.length > 0 && activeItem === "Child") {
                    router.push(`/Parent/Child/${data[0].id}`);
                } */
            } catch (err) {
                console.error("Error getting child data", err);

            }
        }
        fetchChildren()
    }, [userId])
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const handleItemClick = (item) => {
        setActiveItem(item);
        setIsOpen(false);
        if (!item.startsWith("Child")) {
            setChildMenuOpen(false);
        }
    };
    const toggleChildMenu = () => {
        setChildMenuOpen(!childMenuOpen);
        setActiveItem("Child"); // Set "Child" as the active item

        /* if (childList.length > 0) {
            router.push(`/Parent/Child/${childList[0]._id}`);
        } */
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
                className={`fixed top-0 left-0 z-50 h-full w-64
                     bg-white shadow-md  md:max-h-[100vh]
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
                    <Link href="/Parent/Home">
                        <div onClick={() => handleItemClick("Home")}>
                            <SidebarItem active={activeItem === "Home"}>
                                <HomeIcon active={activeItem === "Home"} />
                            </SidebarItem>
                        </div>
                    </Link>
                    <Link href="/Parent/Child">
                        <div className="cursor-pointer">
                            <div onClick={toggleChildMenu}>
                                <SidebarItem active={activeItem.startsWith("Child")}>
                                    <ChildIcon active={activeItem.startsWith("Child")} />
                                </SidebarItem>
                            </div>
                            {childMenuOpen && (
                                <div
                                    className={`ml-2 rounded-bl-lg w-full 
                                    border-l-2 border-bluePrimary transition-all duration-1000 ease-in-out
                                     ${childMenuOpen ? "max-h-screen" : "max-h-0"
                                        }`}
                                >
                                    {childList.map((child) => (
                                        <Link key={child._id} href={`/Parent/Child/details/${child._id}`}>
                                            <div
                                                className="cursor-pointer text-sm py-2 bg-blueHover"
                                                onClick={() => handleItemClick(`Child-${child._id}`)}
                                            >
                                                <ChildName active={activeItem === `Child-${child._id}`}>
                                                    {child.name.first + ' ' + child.name.last}
                                                </ChildName>
                                            </div>
                                        </Link>
                                    ))}
                                </div>

                            )}
                        </div>
                    </Link>


                    <Link href="/Parent/Connect">
                        <div onClick={() => handleItemClick("Connect")}>
                            <SidebarItem active={activeItem === "Connect"}>
                                <ConnectIcon active={activeItem === "Connect"} />
                            </SidebarItem>
                        </div>
                    </Link>
                    <Link href="/Parent/Report">
                        <div onClick={() => handleItemClick("Report")}>
                            <SidebarItem active={activeItem === "Report"}>
                                <ReportIcon active={activeItem === "Report"} />
                            </SidebarItem>
                        </div>
                    </Link>
                </div>
                <hr className="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10" />
                <div className="w-[80%] md:m-5">
                    <SidebarItem><SettingIcon active={activeItem === "Settings"} /></SidebarItem>
                    <SidebarItem><LogoutIcon active={activeItem === "Logout"} /></SidebarItem>
                </div>
            </div>
        </div>
    )
}



export default ParentSideMenu
function ChildName({ active, children }) {
    const color = active ? "bg-white" : "bg-transparent";
    const textColor = active ? "text-bluePrimary" : "text-[#94A3B8]";

    return (
        <div
            className={`space-x-2 flex items-center  ${color}
             hover:bg-white w-[90%] rounded-2xl ml-2 `}
        >
            <div
                className="w-6 h-6 flex items-center 
                justify-center rounded-full bg-bluePrimary text-xs text-white"
            >
                MM
            </div>
            <p className={`font-poppins overflow-hidden whitespace-nowrap text-ellipsis 
                text-xs ${textColor}`}>{children}</p>
        </div>
    );
}