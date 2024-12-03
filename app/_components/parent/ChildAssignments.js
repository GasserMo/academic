import { FaCheckCircle } from 'react-icons/fa';

const ChildAssignments = ({ data }) => {
    if (!data) {
        return (
            <div className="flex flex-col p-2 bg-white  my-4 mx-auto">
                <div className="flex items-center justify-center self-center">
                    <div className="w-8 h-8 rounded-full animate-spin border 
                            border-solid border-cyan-500 border-t-transparent"></div>
                </div>
            </div>
        );
    }
    return (
        <div className="">
            {data?.length > 0 ? (
                data.map((exam, index) => (
                    <AssignmentDetails key={index} title={exam.title} startDate={exam.startDate}
                        endDate={exam.endDate} duration={exam.duration}
                        score={exam.score}
                        status={exam.status}

                    />
                ))
            ) : (
                <p className="flex items-center justify-center font-poppins">No Assignment available.</p>
            )}

        </div>
    )
}

export default ChildAssignments

function AssignmentDetails({ title, status, score, duration, endDate, startDate }) {
    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-GB", {
            year: "numeric",
            month: "long",
            day: "numeric"
        });
    }

    return (
        <div className="flex flex-col my-4 bg-blueHover shadow-lg shadow-gray-300 p-2 space-y-2 rounded-xl">

            <div className="flex-col">
                <div className="flex justify-between">
                    <div className="flex items-center space-x-2 max-w-[75%] truncate
                 text-xl">
                        {status === 'published' && <FaCheckCircle className="text-green-500" />}
                        <p className="font-poppins text-headline-title truncate ">{title}</p>
                    </div>
                    <p className="font-poppins text-[14px] text-gray-600">status:
                        <span className={`font-semibold font-poppins text-sm
                             ${status === 'published' ? 'text-greenPrimary' : 'text-black'} `}> {status}
                        </span></p>
                </div>
                <div className="flex justify-between">
                    <div className="flex flex-col">
                        <p>start date</p>
                        <p className="font-semibold font-poppins text-xs">{formatDate(startDate)}</p>
                    </div>
                    <div className="flex flex-col">
                        <p>end date</p>
                        <p className="font-semibold font-poppins text-xs">{formatDate(endDate)}</p>
                    </div>
                    <div className="flex flex-col">
                        <p>Duration</p>
                        <p className="font-semibold font-poppins text-xs">{duration} mins</p>
                    </div>
                    <div className="flex flex-col">
                        <p>Score</p>
                        <p className="font-semibold font-poppins text-xs">{score}</p>
                    </div>

                </div>
            </div>
        </div>
    )
}