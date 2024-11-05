"use client"
import '@/app/_styles/globals.css'
import clsx from "clsx";
import { useState, useRef, useEffect } from "react";
import { FaCheckCircle, FaRegCircle } from 'react-icons/fa';

function Page() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState({ title: "", description: "", date: new Date() });
    const [isSwitchOn, setIsSwitchOn] = useState(false);

    const [selectedDate, setSelectedDate] = useState(new Date()); // Set default to today
    const dateRefs = useRef([]);
    const modalRef = useRef(null);
    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            handleCloseModal();
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    },);
    const generateDates = () => {
        const dates = [];
        for (let i = 0; i <= 10; i++) {
            const date = new Date();
            date.setDate(date.getDate() + i);
            dates.push(date);
        }
        return dates;
    };

    const dates = generateDates();
    useEffect(() => {
        const todayIndex = dates.findIndex(
            (date) => date.toDateString() === new Date().toDateString()
        );

        if (dateRefs.current[todayIndex]) {
            dateRefs.current[todayIndex].scrollIntoView({
                behavior: "smooth",
                inline: "center",
                block: "nearest"
            });
        }
    }, [dates]);
    const handleDateClick = (date, index) => {
        setSelectedDate(date);
        if (dateRefs.current[index]) {
            dateRefs.current[index].scrollIntoView({
                behavior: "smooth",
                inline: "center",
                block: "nearest"
            });
        }
    };
    const [isChecked, setIsChecked] = useState(false);

    const toggleCheck = () => {
        setIsChecked(!isChecked);
    };
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setModalData({ title: "", description: "", date: new Date() });
    };
    const handleSave = () => {
        // Handle saving data here
        console.log("Modal Data Saved:", modalData);
        handleCloseModal();
    };

    const handleChange = (e) => {
        setModalData({ ...modalData, [e.target.name]: e.target.value });
    };

    const toggleSwitch = () => {
        setIsSwitchOn(!isSwitchOn);
    };
    return (
        <div className='flex flex-col px-2 md:flex md:flex-row md:justify-between w-full'>
            <div className='flex flex-col w-full md:w-[60%] rounded-xl'>
                <div className="bg-white md:mx-5 md:mt-3 rounded-xl md:rounded-2xl">
                    <div className="flex space-x-4  rounded-2xl overflow-x-auto  scrollbar-thin
             scrollbar-track-gray-200 scrollbar-thumb-bluePrimary
                     bg-white py-4 px-2">
                        {dates.map((date, index) => (
                            <div
                                key={index}
                                ref={(el) => (dateRefs.current[index] = el)}
                                onClick={() => handleDateClick(date, index)}
                                className={clsx(
                                    "text-center cursor-pointer p-3 rounded-md transition-all snap-start",
                                    selectedDate?.toDateString() === date.toDateString()
                                        ? "bg-bluePrimary text-white px-5 transform scale-y-125"
                                        : "bg-white text-bluePrimary border border-bluePrimary"
                                )}
                            >
                                <p className="font-bold">{date.getDate()}</p>
                                <p className="text-sm">{date.toLocaleString('default', { month: 'short' })}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='bg-white my-5 md:m-5 rounded-xl md:rounded-2xl'>
                    <div className='flex justify-between mt-4'>
                        <p className='font-poppins mx-4 text-lg'>Assigned</p>
                        <button onClick={handleOpenModal} className='font-poppins mr-4 px-2 text-lg text-white bg-bluePrimary rounded-md'>+ add</button>
                    </div>
                    <p className='pl-6 pb-2 text-sm'>Your Progress!</p>
                    <ProgressBar progress={50} />
                    <div className='flex bg-gray-100 mt-5 mx-3 mb-5 rounded-md p-2 items-center'>
                        <div onClick={toggleCheck} className="cursor-pointer text-3xl">
                            {isChecked ? (
                                <FaCheckCircle className="text-green-500" />
                            ) : (
                                <FaRegCircle className="text-gray-400" />
                            )}
                        </div>
                        <div className='flex flex-col'>
                            <p className='font-poppins mx-4'>Arabic</p>
                            <p className='font-poppins mx-4 text-sm text-gray-500'>Assignment no 2 tutorial</p>
                        </div>
                    </div>
                </div>
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div ref={modalRef} className="bg-white p-6 rounded-lg w-[90%] max-w-md">
                        <h2 className="font-poppins text-center text-bluePrimary text-xl  mb-4">Add to todo list</h2>
                        <label className="block mb-2 font-semibold">Add Title</label>
                        <input
                            type="text"
                            name="title"
                            value={modalData.title}
                            onChange={handleChange}
                            className="w-full p-2 border border-blueSecondary rounded mb-4 focus:outline-none
                             focus:ring-1 focus:ring-bg-bluePrimary focus:border-bg-bluePrimary"
                        />
                        <label className="block mb-2 font-semibold">Add Description</label>
                        <textarea
                            name="description"
                            value={modalData.description}
                            onChange={handleChange}
                            className="w-full p-2 border border-blueSecondary rounded mb-4 focus:outline-none
                             focus:ring-1 focus:ring-bg-bluePrimary focus:border-bg-bluePrimary"
                        ></textarea>
                        <label className="block mb-2 font-semibold">Date</label>

                        <input
                            type="date"
                            name="date"
                            value={modalData.date.toISOString().substr(0, 10)}
                            onChange={(e) => setModalData({ ...modalData, date: new Date(e.target.value) })}
                            className="w-full p-2 border border-blueSecondary rounded mb-4"
                        />
                        <label className="relative inline-flex cursor-pointer items-center">
                            <input
                                type="checkbox"
                                className="peer sr-only"
                                checked={isSwitchOn}
                                onChange={toggleSwitch}
                            />
                            <div className="h-4 w-11 rounded-full border bg-slate-200 
                after:absolute after:-top-1 after:left-0 after:h-6 after:w-6 
                after:rounded-full after:border after:border-gray-300 after:bg-white 
                after:transition-all after:content-[''] peer-checked:bg-bluePrimary
                peer-checked:after:translate-x-full peer-focus:ring-green-300">
                            </div>
                        </label>
                        <div className="grid grid-cols-[50%_50%]">
                            <button onClick={handleCloseModal} className="px-4 py-2 bg-gray-300 rounded mr-2">Cancel</button>
                            <button onClick={handleSave} className="px-4 py-2 bg-bluePrimary text-white rounded">Save</button>
                        </div>

                    </div>
                </div>
            )}
            <div className='flex flex-col bg-white rounde-xl w-full
             md:rounded-2xl md:mt-3 md:mx-5 md:w-[35%]'>
                <p className='font-poppins font-semibold text-lg p-2'>Done</p>
                <div className='flex mx-4 bg-gray-100 rounded-md p-2 mb-3 items-center'>
                    <div className="cursor-pointer text-xl">
                        <FaCheckCircle className="text-green-500" />
                    </div>
                    <div className='flex flex-col mx-2'>
                        <p className='font-poppins'>Arabic</p>
                        <p className='font-poppins text-sm text-gray-500'>Assignment no 2 tutorial</p>
                    </div>
                </div>

            </div>
        </div>
    );
}


export default Page

const ProgressBar = ({ progress }) => {
    return (
        <div className="w-[95%] bg-gray-200 rounded-full h-2 mx-4 overflow-hidden">
            <div
                style={{ width: `${progress}%` }}
                className="bg-greenPrimary h-full rounded-full transition-all duration-300 ease-in-out"
            ></div>
        </div>
    );
};
