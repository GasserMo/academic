'use client'
import CourseText from '@/app/_components/CourseText'
import Assignments from '@/app/_components/Students/Assignments'
import Files from '@/app/_components/Students/Files'
import Posts from '@/app/_components/Students/Posts'
import Students from '@/app/_components/Students/Students'
import '@/app/_styles/globals.css'
import { useState } from 'react'

function Page() {
    const [active, setActive] = useState('Posts')
    const handleSetActive = (item) => {
        setActive(item)
    }

    return (
        <div className='flex flex-col md:flex   md:flex-row '>
            <div className='flex flex-col md:min-h-[80vh] bg-white mt-4
             md:ml-6 rounded-xl w-full md:w-[30%] overflow-x-hidden'>
                <div className='bg-gray-400 m-4 rounded-2xl'>
                    <div className='flex flex-col p-3'>
                        <div className='flex justify-between'>
                            <p className=' font-poppins text-lg '>Subject</p>
                        </div>
                        <p className='font-poppins text-sm'>Teacher Name</p>
                    </div>

                </div>
            </div>
            <div className='w-full flex flex-col min-h-[80vh] bg-white 
            md:mx-8 md:mt-4 rounded-xl md:w-[60%]'>
                <p className=' font-poppins text-headline-small p-5'>Course Details</p>

                <div className='flex space-x-4 justify-center'>
                    <div onClick={() => handleSetActive('Posts')}>
                        <CourseText active={active === 'Posts'} name={'Posts'} />
                    </div>
                    <div onClick={() => handleSetActive('File')}>
                        <CourseText active={active === 'File'} name={'File'} />
                    </div>
                    <div onClick={() => handleSetActive('Students')}>
                        <CourseText active={active === 'Students'} name={'Students'} />
                    </div>
                    <div onClick={() => handleSetActive('Assignments')}>
                        <CourseText active={active === 'Assignments'} name={'Assignments'} />
                    </div>
                </div>
                <Files />


            </div>
        </div>
    )
}

export default Page
