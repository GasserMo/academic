import Image from "next/image"
import { AiOutlineRight } from "react-icons/ai"
import '@/app/_styles/globals.css'
function Announcements() {
    return (
        <div className='mt-3 mx-auto w-[90%] bg-white rounded-2xl'>
            <div className='flex justify-between p-2'>
                <p className=' font-poppins text-headline-small'>Announcement</p>
                <AiOutlineRight size={20} className=" text-gray-500 " />
            </div>
            <div className='flex space-x-2 overflow-x-auto  scrollbar-thin
             scrollbar-track-gray-200 scrollbar-thumb-bluePrimary'>
                <Image
                    src='/graduation.svg'
                    alt="Image"
                    width={280}
                    height={150}
                />
                <Image
                    src='/graduation.svg'
                    alt="Image"
                    width={280}
                    height={150}
                />
                <Image
                    src='/graduation.svg'
                    alt="Image"
                    width={280}
                    height={150}
                />
                <Image
                    src='/graduation.svg'
                    alt="Image"
                    width={280}
                    height={150}
                />
            </div>
        </div>
    )
}

export default Announcements
