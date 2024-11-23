"use client"
import '@/app/_styles/globals.css'
import { addTodo, deleteTodo, getTodos, updateTodo } from '@/app/actions/todos';
import clsx from "clsx";
import { useState, useRef, useEffect } from "react";
import { FaCheckCircle, FaRegCircle } from 'react-icons/fa';
import { HiOutlineTrash } from "react-icons/hi2";

function Page() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState({ title: "", description: "", date: new Date() });
    const [isSwitchOn, setIsSwitchOn] = useState(false);
    const [todos, setTodo] = useState([])
    const [completedTodos, setCompletedTodos] = useState([])
    const [assignedTodos, setAssignedTodos] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const [saving, setSaving] = useState(false)
    const [errorMessage, setErrorMessage] = useState(""); // State for error message
    const [selectedTodo, setSelectedTodo] = useState(null);

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
    const handleDateClick = async (date, index) => {
        setSelectedDate(date);
        const formattedDate = date.toISOString().split("T")[0];
        setIsLoading(true)
        try {
            const data = await getTodos({ date: formattedDate });
            setTodo(data.todos);
            setCompletedTodos(data.todos.todo.filter((todo) => todo.completed));
            setAssignedTodos(data.todos.todo.filter((todo) => !todo.completed));
        } catch (error) {
            console.error("Error fetching todos:", error);
        } finally {
            setIsLoading(false)

        }

        if (dateRefs.current[index]) {
            dateRefs.current[index].scrollIntoView({
                behavior: "smooth",
                inline: "center",
                block: "nearest",
            });
        }
    };
    const [isChecked, setIsChecked] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target; // Destructure name and value from the event target
        setModalData((prevData) => ({
            ...prevData,
            [name]: value, // Update the specific field based on the input's name
        }));
    };
    const handleOpenModal = (todo = null) => {
        if (todo) {
            setModalData({
                title: todo.title,
                description: todo.description,
                date: new Date(todo.schedule),
            });
            setSelectedTodo(todo._id);
        } else {

            setModalData({ title: "", description: "", date: new Date() });
            setSelectedTodo(null);
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setErrorMessage(""); // Clear error message on close
    };

    const fetchTodos = async () => {
        const formattedDate = selectedDate.toISOString().split("T")[0];
        try {
            setIsLoading(true);
            const data = await getTodos({ date: formattedDate });
            setTodo(data.todos);
            setCompletedTodos(data.todos.todo.filter((todo) => todo.completed));
            setAssignedTodos(data.todos.todo.filter((todo) => !todo.completed));
        } catch (error) {
            console.error("Error fetching todos:", error);
        } finally {
            setIsLoading(false);
        }
    };
    const handleSave = async () => {
        const { title, description, date } = modalData;
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const formattedDate = `${date.toISOString().split("T")[0]}T${hours}:${minutes}`;

        const dataToSave = {
            title,
            description,
            schedule: formattedDate,
            completed: isSwitchOn ? true : false, // Default to false when adding new todos
        };

        if (!title || !description || !date) {
            setErrorMessage("All fields are required.");
            return;
        }


        try {
            setSaving(true);
            if (selectedTodo) {
                const data = await updateTodo({ id: selectedTodo, dataToSave });
                console.log(data)
            } else {
                await addTodo(dataToSave);
            }
            await fetchTodos(); // Fetch updated todos
        } catch (err) {
            console.error("Error saving todo:", err);
        } finally {
            setSaving(false);
            handleCloseModal();
        }
    };

    const toggleSwitch = () => {
        setIsSwitchOn(!isSwitchOn);
    };

    useEffect(() => {
        fetchTodos();
    }, [selectedDate]);

    const handleCheck = async (id, currentCompletedStatus) => {
        const updatedCompletedStatus = !currentCompletedStatus;
        const updatedAssignedTodos = assignedTodos.map(todo =>
            todo._id === id ? { ...todo, completed: updatedCompletedStatus } : todo
        );
        setAssignedTodos(updatedAssignedTodos);
        const dataToSave = { completed: updatedCompletedStatus };
        try {
            await updateTodo({ id, dataToSave });
        } catch (err) {
            console.error("Error updating todo:", err);
        }
    };
    const handleDelete = async (id) => {
        try {
            setIsDeleting(true)
            const data = await deleteTodo(id)
            console.log(data)
            await fetchTodos()
        } catch (err) {
            setIsDeleting(false)
            console.log(err)
        } finally {
            setIsDeleting(false)
        }

    }

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
                <div className='bg-white max-h-[80vh] overflow-y-auto overflow-x-hidden  scrollbar-thin
             scrollbar-track-gray-200 scrollbar-thumb-bluePrimary
                 my-5 md:m-5 rounded-xl md:rounded-2xl'>
                    <div className='flex justify-between mt-4'>
                        <p className='font-poppins mx-4 text-lg'>Assigned</p>
                        <button onClick={handleOpenModal} className='font-poppins mr-4 px-2 text-lg text-white bg-bluePrimary rounded-md'>+ add</button>
                    </div>
                    <p className='pl-6 pb-2 text-sm'>Your Progress!</p>
                    <ProgressBar progress={50} />
                    {isLoading ? <div className="mt-3 mb-3 flex justify-center items-center w-[90%]">
                        <div className="flex items-center justify-center self-center ">
                            <div className="w-8 h-8 rounded-full animate-spin border 
                border-solid border-cyan-500 border-t-transparent"></div>
                        </div>
                    </div> :
                        assignedTodos?.length > 0 ? (
                            assignedTodos.map((todo) => (
                                <div onClick={() => handleOpenModal(todo)} key={todo._id}
                                    className='cursor-pointer
                                flex bg-gray-100 mt-5 mx-3 mb-5 rounded-md p-2 items-center'>
                                    <div onClick={(e) => {
                                        e.stopPropagation(); // Prevent modal from opening
                                        handleCheck(todo._id, todo.completed);
                                    }} className="cursor-pointer text-3xl">
                                        {todo.completed ? <FaCheckCircle className="text-green-500" /> : <FaRegCircle className="text-gray-400" />}
                                    </div>
                                    <div className='flex flex-col'>
                                        <p className='font-poppins mx-4'>{todo.title}</p>
                                        <p className='font-poppins mx-4 text-sm text-gray-500'>{todo.description}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className='flex justify-center m-5'>
                                <p className='font-poppins'>No todos available</p>
                            </div>
                        )}

                </div>
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div ref={modalRef} className="bg-white p-6 rounded-lg w-[90%] max-w-md">
                        <h2 className="font-poppins text-center text-bluePrimary text-xl mb-4">
                            {selectedTodo ? "Edit Todo" : "Add to Todo List"}
                        </h2>
                        {errorMessage && <p className="text-red-500 text-center font-poppins">{errorMessage}</p>} {/* Display error message */}
                        <label className="block mb-2 font-semibold">Add Title</label>
                        <input
                            type="text"
                            name="title"
                            required
                            value={modalData.title}
                            onChange={handleChange}
                            className="w-full p-2 border border-blueSecondary rounded mb-4 focus:outline-none
                             focus:ring-1 focus:ring-bg-bluePrimary focus:border-bg-bluePrimary"
                        />
                        <label className="block mb-2 font-semibold">Add Description</label>
                        <textarea
                            name="description"
                            value={modalData.description}
                            required
                            onChange={handleChange}
                            className="w-full p-2 border border-blueSecondary rounded mb-4 focus:outline-none
                             focus:ring-1 focus:ring-bg-bluePrimary focus:border-bg-bluePrimary"
                        ></textarea>
                        <label className="block mb-2 font-semibold">Date</label>

                        <input
                            type="date"
                            name="date"
                            value={modalData.date instanceof Date && !isNaN(modalData.date) ? modalData.date.toISOString().substr(0, 10) : ""} onChange={(e) => {
                                const newDate = new Date(e.target.value);
                                setModalData({ ...modalData, date: newDate });
                            }}
                            className="w-full p-2 border border-blueSecondary rounded mb-4"
                        />
                        <div className='flex justify-between my-2'>
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
                            {selectedTodo ? (
                                <div onClick={() => handleDelete(selectedTodo)}>
                                    {isDeleting ? (
                                        <div className="flex justify-center items-center">
                                            <div className="flex items-center justify-center self-center ">
                                                <div className="w-5 h-5 rounded-full animate-spin border 
                            border-solid border-cyan-500 border-t-transparent"></div>
                                            </div>
                                        </div>
                                    ) : (
                                        <HiOutlineTrash size={24} className='cursor-pointer' color='#00769E' />
                                    )}
                                </div>
                            ) : null}
                        </div>
                        <div className="grid grid-cols-[50%_50%]">
                            <button onClick={handleCloseModal} className="px-4 py-2 bg-gray-300 rounded mr-2">Cancel</button>
                            <button onClick={() => handleSave(modalData)} className="px-4 py-2 bg-bluePrimary text-white rounded">
                                {saving ? "Saving..." : (selectedTodo ? "Update" : "Save")}
                            </button>
                        </div>

                    </div>
                </div>
            )}
            {isLoading ? <div className="mt-3 mb-3 flex justify-center items-center w-[90%]">
                <div className="flex items-center justify-center self-center ">
                    <div className="w-8 h-8 rounded-full animate-spin border 
                border-solid border-cyan-500 border-t-transparent"></div>
                </div>
            </div> : <div className='max-h-[80vh] overflow-y-auto  scrollbar-thin
             scrollbar-track-gray-200 scrollbar-thumb-bluePrimary
            flex flex-col bg-white rounded-xl w-full md:rounded-2xl md:mt-3 md:w-[35%]'>
                <p className='font-poppins font-semibold text-lg p-2'>Done</p>
                {completedTodos.length > 0 ? completedTodos.map((todo) => (
                    <div key={todo._id} className='flex mx-4 bg-gray-100 rounded-md p-2 mb-3 items-center'>
                        <div className="cursor-pointer text-xl">
                            <FaCheckCircle className="text-green-500" />
                        </div>
                        <div className='flex flex-col mx-2'>
                            <p className='font-poppins'>{todo.title}</p>
                            <p className='font-poppins text-sm text-gray-500'>{todo.description}</p>
                        </div>
                    </div>
                )) : (
                    <div className='flex justify-center m-5'>
                        <p className='font-poppins'>No completed todos</p>
                    </div>
                )}
            </div>}
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
