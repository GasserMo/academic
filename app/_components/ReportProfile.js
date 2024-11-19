"use client"; // Needed to use React hooks in Next.js

import { useState, useEffect, useContext } from "react";
import { getUsersReports, SendReport } from "../actions/reports";
import Link from "next/link";
import { HiMiniPencilSquare } from "react-icons/hi2";
import { AiOutlineClose } from "react-icons/ai";
import { globalState } from "../context"; // Make sure the path is correct

const ReportProfile = () => {
    const [viewSent, setViewSent] = useState(false); // Toggles between sent and received
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const { data } = useContext(globalState); // Access setData from the context
    const role = data?.userData?.user?.role; // Get the role
    const [formData, setFormData] = useState({
        subject: "",
        body: "",
        to: "",
        priority: "high",
    });
    const token = JSON.parse(localStorage.getItem("userData"))?.token;
    const userId = JSON.parse(localStorage.getItem("userData"))?.user._id;


    useEffect(() => {
        const fetchReports = async () => {

            try {
                if (role == 'parent') {
                    const data = await getUsersReports({ role: false })
                    console.log(data)
                    setReports(data.reports);
                } else {
                    const data = await getUsersReports({ role: true })
                    console.log(data)
                    setReports(data.reports);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchReports();
    }, [token]);

    if (loading) return <div>
        <div className="mt-3 flex justify-center items-center h-full">
            <div className="flex items-center justify-center self-center ">
                <div className="w-8 h-8 rounded-full animate-spin border 
        border-solid border-cyan-500 border-t-transparent"></div>
            </div>
        </div>
    </div>;
    if (error) return <p>Error: {error}</p>;
    const filteredReports = reports.filter((report) => {
        return viewSent
            ? report.from._id === userId
            : report.to._id === userId;
    }).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));;

    const handleToggleForm = () => {
        setShowForm(!showForm);
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await SendReport({ sentReport: formData });
            console.log("Report sent successfully:", response);
            setFormData({ subject: "", body: "", to: "", priority: "high" });
            setShowForm(false);
        } catch (err) {
            console.error("Error sending report:", err);
            setErrorMessage("Failed to send report. Please try again.");
        }
    };

    return (
        <div>
            <div className="flex justify-evenly mb-4 relative">
                {role !== 'parent' && <button
                    className={`px-4 py-2 mr-2 rounded-3xl ${viewSent ? " bg-bluePrimary font-poppins text-white" : "bg-gray-200"}`}
                    onClick={() => setViewSent(true)}
                >
                    Sent
                </button>}
                <button
                    className={`px-4 py-2 rounded-3xl ${!viewSent ? "rounded-2xl bg-bluePrimary font-poppins text-white" : "bg-gray-200"}`}
                    onClick={() => setViewSent(false)}
                >
                    Received
                </button>
                {role !== 'parent' && <button
                    onClick={handleToggleForm}
                    className="flex items-center justify-center w-10 h-10 bg-bluePrimary text-white rounded-full shadow-lg hover:bg-blueHover transition duration-300"
                >
                    <HiMiniPencilSquare color="text-black" size={20} />
                </button>}
            </div>
            {showForm && (
                <div className="absolute top-12 right-0 bg-white p-4 rounded-lg shadow-lg w-80">
                    <AiOutlineClose className="cursor-pointer mb-2" onClick={handleToggleForm} />
                    <form onSubmit={handleFormSubmit}>
                        <label className="block mb-2 text-sm font-medium">Subject:</label>
                        <input
                            type="text"
                            name="subject"
                            value={formData.subject}
                            onChange={handleFormChange}
                            className="w-full p-2 mb-4 border rounded"
                            required
                        />

                        <label className="block mb-2 text-sm font-medium">Body:</label>
                        <textarea
                            name="body"
                            value={formData.body}
                            onChange={handleFormChange}
                            className="w-full p-2 mb-4 border rounded resize-none"
                            rows="4"
                            required
                        ></textarea>

                        <label className="block mb-2 text-sm font-medium">To</label>
                        <input
                            type="text"
                            name="to"
                            value={formData.to}
                            onChange={handleFormChange}
                            className="w-full p-2 mb-4 border rounded"
                            required
                        />

                        <label className="block mb-2 text-sm font-medium">Priority:</label>
                        <select
                            name="priority"
                            value={formData.priority}
                            onChange={handleFormChange}
                            className="w-full p-2 mb-4 border rounded"
                            required
                        >
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                        </select>

                        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

                        <button
                            type="submit"
                            className="w-full bg-bluePrimary text-white py-2 rounded-lg hover:bg-blueHover transition duration-300"
                        >
                            Send Report
                        </button>
                    </form>
                </div>
            )}
            <div className="space-y-2">
                {filteredReports.length === 0 ? (
                    <p className="text-center font-poppins font-light">No reports available</p>
                ) : (
                    filteredReports.map((report) => (
                        <Link
                            href={`?reportId=${report._id}`} // Update the URL directly
                            key={report._id}
                            className="flex cursor-pointer hover:bg-gray-300
                            justify-between p-3 bg-blueHover rounded-2xl"
                        >
                            <div className="flex flex-col">
                                <p className="font-poppins text-[15px] ">
                                    {viewSent
                                        ? `${report.to.name.first} ${report.to.name.last}`
                                        : `${report.from.name.first} ${report.from.name.last}`}
                                </p>
                                <p className="font-poppins text-[10px] text-gray-500">
                                    {report.body}
                                </p>
                            </div>
                            <p className="font-poppins text-[10px] text-gray-500">
                                {new Date(report.createdAt).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            </p>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
};

export default ReportProfile;
