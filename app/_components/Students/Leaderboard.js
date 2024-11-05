import Image from "next/image"

function Leaderboard() {
    return (
        <div className='mt-5 md:mt-10 mx-auto w-[90%] rounded-md bg-white h-full'>
            <p className=' font-poppins p-2 text-headline-small text-start'>Leaderboard</p>
            <div className='flex flex-row items-center'>
                <div className="items-center justify-center w-6 h-6 mr-5 rounded-xl bg-red-700 text-white">1</div>
                <div className='flex'>
                    <div className='h-14 w-14 rounded-full bg-sky-900'>
                        <Image
                            src='/learn.png'
                            alt="Image"
                            width={280}
                            height={150}
                        />
                    </div>
                    <div className='flex flex-col'>
                        <p className='font-poppins'>Gasser Mohamed</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Leaderboard
