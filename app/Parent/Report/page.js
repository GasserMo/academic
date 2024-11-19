import ReportDetails from "@/app/_components/teacher/ReportDetails"
import ReportProfile from "@/app/_components/ReportProfile";
import ParentReportDetails from "@/app/_components/parent/ParentReportDetails";
function Page({ searchParams }) {
    const selectedReportId = searchParams?.reportId || null;

    return (
        <div className="flex flex-col  md:grid md:grid-cols-[30%_70%] md:min-h-[80vh]">
            <div className="flex flex-col mt-3 mx-5 items-center min-h-[40vh] max-h-[100vh]
            scrollbar-thinscrollbar-track-gray-200 scrollbar-thumb-bluePrimary overflow-y-auto bg-white rounded-2xl">
                <p className="font-poppins text-headline-small pt-2">Inbox</p>
                <hr className="w-full h-0.2 my-2 bg-gray-100" />

                <div className="w-[95%] ">
                    <ReportProfile />
                </div>
            </div>
            <ParentReportDetails selectedReportId={selectedReportId} />
        </div>
    )
}
export default Page