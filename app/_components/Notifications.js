"use client";
import { useEffect, useRef, useState } from 'react';
import { MdNotifications } from 'react-icons/md';
import { getNotifications } from '../actions/Notifications';

function Notifications() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const modalRef = useRef(null);
    const notificationRef = useRef(null); // Reference for the notification icon

    const fetchNotifications = async () => {
        try {
            const data = await getNotifications();
            setNotifications(data.notifications); // Assuming data contains notifications
            console.log(data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleOpenModal = async () => {
        setIsModalOpen((e) => !e);
        await fetchNotifications();
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target) && notificationRef.current && !notificationRef.current.contains(event.target)) {
            handleCloseModal();
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    },);

    return (
        <div className="md:flex cursor-pointer rounded-xl px-3 flex items-center"
            onClick={handleOpenModal} ref={notificationRef}>
            <div className="bg-white flex justify-center rounded-xl h-10">
                <MdNotifications className="self-center" size={24} />
            </div>
            {isModalOpen && (
                <div className="fixed   z-50  bg-black bg-opacity-30">
                    <div ref={modalRef} className="bg-white w-80 scrollbar-thin
             scrollbar-track-gray-200 scrollbar-thumb-bluePrimary overflow-y-auto
                    p-6 rounded-lg absolute right-0 max-h-[80vh]">
                        <h2 className="text-lg font-bold mb-4">Notifications</h2>
                        {notifications.length === 0 ? (
                            <p>No notifications available.</p>
                        ) : (
                            notifications.map((notification, index) => (
                                <div key={index} className="py-2 my-2 border-b bg-[#EBF4F7] ">
                                    <p className='font-poppins font-semibold'>{notification.title}</p>
                                    <p className='font-poppins '>{notification.message}</p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Notifications;