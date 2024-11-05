import Image from "next/image"
import '@/app/_styles/globals.css'


function TimeTable() {

    return (
        <div className="mt-5 md:mt-3 h-full bg-white rounded-2xl">
            <p className='p-2 font-poppins text-headline-small text-center'>Timetable</p>
            <div className="flex items-start ">
                <div className="flex flex-col items-center mr-2 ">
                    <div className="w-5 h-5 bg-greenPrimary rounded-full "></div>
                    <div className="w-[2px] h-8 bg-greenPrimary"></div>
                </div>
                <div className="flex bg-slate-200 rounded-xl w-[90%] items-center">
                    <div className='h-10 w-10 rounded-full bg-sky-900'>
                        <Image
                            src='/learn.png'
                            alt="Image"
                            width={100}
                            height={100}
                        />
                    </div>
                    <div className="flex flex-col mr-5">
                        <p className='font-poppins mx-4'>Arabic</p>
                        <p className='font-poppins mx-4 text-sm text-gray-500'>Name</p>
                    </div>
                    <div className="flex flex-col">
                        <p className='font-poppins text-greenPrimary text-[14px] ml-5'>1:00 PM</p>
                        <p className='font-poppins ml-5 text-[10px] text-gray-500'>Lab 2</p>
                    </div>
                </div>
            </div>
            <div className="flex items-start">
                <div className="flex flex-col items-center mr-2">
                    <div className="w-5 h-5 bg-greenPrimary rounded-full"></div>
                    <div className="w-[2px] h-8 bg-greenPrimary"></div>
                </div>
                <div className="flex bg-slate-200 rounded-xl w-[90%] items-center">
                    <div className='h-10 w-10 rounded-full bg-sky-900'>
                        <Image
                            src='/learn.png'
                            alt="Image"
                            width={100}
                            height={100}
                        />
                    </div>
                    <div className="flex flex-col mr-5">
                        <p className='font-poppins mx-4'>Arabic</p>
                        <p className='font-poppins mx-4 text-sm text-gray-500'>Name</p>
                    </div>
                    <div className="flex flex-col">
                        <p className='font-poppins text-greenPrimary text-[14px] ml-5'>1:00 PM</p>
                        <p className='font-poppins ml-5 text-[10px] text-gray-500'>Lab 2</p>
                    </div>
                </div>
            </div>

            {/* Additional timetable entries can be added here */}
        </div>
    )
}

export default TimeTable
