import Image from "next/image"

function Files() {
    return (
        <div className='flex flex-row justify-between p-3'>
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
                    <p className='font-poppins'>Chapter 1, Lesson 5</p>
                    <p className='font-poppins text-gray-400'>Details </p>
                </div>
            </div>

        </div>
    )
}

export default Files
