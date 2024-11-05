import Image from "next/image"

function Students() {

    return (
        <div className='flex flex-row items-center space-x-3 p-2'>
            <p>1</p>
            <div className='h-5 w-5 rounded-full bg-sky-900'>
                <Image
                    src='/learn.png'
                    alt="Image"
                    width={150}
                    height={120}
                />

            </div>
            <p className='font-poppins'>Gasserr</p>

        </div>
    )
}

export default Students
