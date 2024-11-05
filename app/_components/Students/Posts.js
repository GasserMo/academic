import { HiEllipsisVertical } from "react-icons/hi2";
import PlusIcon from '@/public/icons/PlusIcon'
import Image from 'next/image'

function Posts() {
    return (
        <div>
            <div className='w-[90%] md:w-[80%] mx-auto p-2 my-4 md:my-2 border space-x-2 rounded-md
                 border-gray-300 flex items-center'>
                <PlusIcon />
                <p>Add Post</p>
            </div>
            <div className='w-[90%] md:w-[80%] justify-between flex flex-col mx-auto p-2 my-2 border rounded-md
                 border-gray-300 '>
                <div className='flex flex-row justify-between'>
                    <div className='flex'>
                        <div className='h-14 w-14 rounded-full bg-sky-900'>
                            <Image
                                src='/learn.png'
                                alt="Image"
                                width={150}
                                height={120}
                            />

                        </div>
                        <div className='flex flex-col  justify-evenly ml-2'>
                            <p className='font-poppins'>Gasser Mohamed</p>
                            <p className='font-poppins text-gray-400'>Date </p>
                        </div>
                    </div>

                    <HiEllipsisVertical className='' />
                </div>
                <p className='py-4 overflow-clip'>ddddddadsaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                    sadddddddddddddassdasadsaddaaaaaaaaaaaaaaa
                    asd
                </p>
                <hr className="my-4 border-t border-gray-300" />
                <p>8 Comments</p>
            </div>
        </div>
    )
}

export default Posts
