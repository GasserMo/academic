import Image from "next/image"
import { MdNotifications } from 'react-icons/md';

function ProfileDetails() {
    return (
        <div className="hidden md:flex space-x-5  rounded-xl px-3 pt-1 flex items-center ">
            <div className=' w-[20%] rounded-full bg-sky-900'>
                <Image
                    src='/learn.png'
                    alt="Image"
                    width={150}
                    height={100}
                />
            </div>
            <div className="bg-white w-[60%] rounded-xl ">
                <p className=" font-poppins text-center">Name</p>
                <p className=" font-poppins text-sm text-gray-600 text-center">Email</p>
            </div>
            <div className="bg-white flex justify-center rounded-xl w-[20%] h-10">
                <MdNotifications className="self-center" size={24} />
            </div>
        </div>
    )
}

export default ProfileDetails
