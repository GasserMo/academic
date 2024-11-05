import LogoWhite from '@/app/_components/LogoWhite';
import learn from "@/public/learn.png"
import Image from 'next/image';
import Link from 'next/link';
import '../app/_styles/globals.css'

export default function Home() {
  return (
    <main>
      <div className="flex flex-col items-center justify-center min-h-screen
      bg-gradient-to-b from-bluePrimary to-greenPrimary">
        <LogoWhite height='100' width='200' />
        <Image src={learn} alt='learn' width={200} height={200} />
        <div className='flex w-full justify-center space-x-4'>
          <Link href='/Register' >
            <div className="py-2 px-4 text-center hover:text-white text-bluePrimary
         bg-white hover:bg-bluePrimary cursor-pointer rounded-md font-poppins ">
              Login
            </div>
          </Link>
        </div>
      </div>
    </main>

  );
}
