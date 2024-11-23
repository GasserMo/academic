"use client"
import Image from "next/image"
import PlusIcon from '@/public/icons/PlusIcon'
import { useEffect, useRef, useState } from "react"
import { getOneCourse, uploadCourseMaterials } from "@/app/actions/getOneCourse"
import { AiOutlineDownload } from "react-icons/ai"; // Import download icon
import { GetAUser } from "@/app/actions/getUser"

function Files({ id }) {
    const [isLoading, setIsLoading] = useState(false)
    const [role, setRole] = useState('')
    const fileInputRef = useRef(null)
    const [Attachment, setAttachments] = useState([]); // State to hold the name of the attached file
    const [materials, setMaterials] = useState([])
    const handleFileUpload = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click(); // Trigger the file input click
        }
    };
    useEffect(() => {
        const getUser = async () => {
            const data = await GetAUser()
            console.log(data.user)
            setRole(data.user.role)
            console.log('role is ' + role)
        }
        getUser()

    }, [role])
    const handleFileChange = async (event) => {
        const files = event.target.files;
        const filesArray = Array.from(files);
        setAttachments(filesArray);
        const formData = new FormData();
        Attachment.forEach((file) => {
            formData.append("materials", file);
        });
        try {
            const data = await uploadCourseMaterials({ courseId: id, formData })
            console.log(data)
        } catch (error) {
            console.log('error here' + error)
        }
    };

    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-GB", {
            year: "numeric",
            month: "long",
            day: "numeric"
        });
    }
    useEffect(() => {
        const fetchOneCourse = async () => {
            try {
                setIsLoading(true)
                const data = await getOneCourse({ id });
                console.log("ONE COURSE data:", data);
                setMaterials(data.course.materials);

            } catch (error) {
                console.error("Error fetching ONE course:", error);
            } finally {
                setIsLoading(false)

            }
        }
        fetchOneCourse();
    }, [id])


    const handleDownload = (url) => {
        const a = document.createElement("a");
        a.href = url;
        a.download = url.split('/').pop();
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };
    return (
        <div className='flex flex-col'>
            {role === 'teacher' && <div onClick={handleFileUpload} className='cursor-pointer w-[90%] md:w-[90%] mx-auto p-2 my-2 border space-x-2 rounded-md
             border-gray-300 flex items-center'>
                <PlusIcon />
                <p>Add File</p>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                />
            </div>}
            {isLoading && (
                <div className="flex items-center justify-center self-center">
                    <div className="w-12 h-12 rounded-full animate-spin border border-solid border-cyan-500 border-t-transparent">
                    </div>
                </div>
            )}
            {!isLoading && materials?.length === 0 && <p>No materials available</p>}

            {!isLoading && materials?.length > 0 && materials?.map((material) => (
                <div key={material._id} className="flex md:w-[90%] mx-auto p-2">
                    <div className='h-14 w-14 rounded-lg bg-sky-900'>
                        <Image
                            src='/learn.png'
                            alt="Image"
                            width={100}
                            height={120}
                        />
                    </div>
                    <div className='flex flex-col w-[50%] justify-start ml-2'>
                        <p className='font-poppins overflow-x-hidden'>{material.title}</p>
                        <p className='font-poppins text-gray-400 overflow-x-hidden'>
                            Uploaded at: {formatDate(material.uploadDate)}</p>
                    </div>
                    <div>
                        <AiOutlineDownload
                            className="text-blue-500 cursor-pointer"
                            onClick={() => handleDownload(material.url)} // Trigger download when clicked
                            size={20}
                        />
                    </div>
                </div>
            ))}
        </div>

    )
}

export default Files
