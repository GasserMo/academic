import Link from 'next/link';

import ParentSideMenu from '../_components/parent/ParentSideMenu';
import TimeTable from '../_components/Students/CoursesTimeTable';
import ProfileDetails from '../_components/ProfileDetails';


export const metadata = {
    title: "Academiq - Parent",
    description: "Parent area of Academiq",
};

export default function ParentLayout({ children }) {
    return (
        <div className="min-h-screen md:bg-slate-100 bg-slate-100 md:flex">
            <ParentSideMenu />
            <main className="flex flex-col md:w-full">
                <div className="flex justify-between items-center">
                    <div className="hidden md:flex w-[60%] mx-7 rounded-xl bg-white">
                        <form className="flex items-center p-1 w-[90%] mx-auto">
                            <input
                                type="text"
                                placeholder="Search here"
                                className="bg-gray-100 flex-grow rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-bg-bluePrimary focus:border-gray-300"
                            />
                            <button
                                type="submit"
                                className="text-white bg-bluePrimary rounded-md px-4 ml-2 hover:bg-blueSecondary focus:ring-2 focus:ring-bluePrimary"
                            >
                                Search
                            </button>
                        </form>
                    </div>
                    <ProfileDetails />
                </div>

                {/* Main content area for children */}
                <div className="flex-grow mt-4">
                    {children}
                </div>

            </main>
        </div>
    );
}