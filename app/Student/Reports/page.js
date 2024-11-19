import ReportDetails from "@/app/_components/teacher/ReportDetails"

function Page() {
    return (
        <div className="flex flex-col  md:grid md:grid-cols-[30%_70%] md:min-h-[80vh]">
            <div className="flex flex-col mt-3 mx-5 items-center min-h-[40vh] bg-white rounded-2xl">
                <p className="font-poppins text-headline-small pt-2">Inbox</p>
                <hr className="w-full h-0.2 my-2 bg-gray-100" />

                <div className="w-[95%] ">
                    <ReportProfile />
                </div>
            </div>
            <ReportDetails />
        </div>
    )
}

export default Page

function ReportProfile() {
    return <div className="flex justify-between p-3 bg-blueHover rounded-2xl">
        <div className="flex flex-col items-evenly">
            <p className="font-poppins text-[15px] ">Name</p>
            <p className="font-poppins text-[10px] text-gray-500">Message</p>
        </div>
        <p>1:00 Pm</p>

    </div>
}