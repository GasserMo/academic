import { FaCheckCircle } from 'react-icons/fa';

const ChildGrades = ({ data }) => {
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
                data.map((grade, index) => (
                    <GradesDetails key={index} title={grade.assessment.title}
                        startDate={grade.assessment.startDate}
                        endDate={grade.assessment.endDate} duration={grade.assessment.duration} score={grade.assessment.score}
                        status={grade.assessment.status} fullScore={grade.submissionData.fullScore}
                        submittedAt={grade.submissionData.submittedAt} type={grade.assessment.type}

                    />
                ))
            ) : (
                <p className="flex items-center justify-center font-poppins">No grades available.</p>
            )}
        </div>
    );
};


function GradesDetails({ title, status, score, duration, startDate, submittedAt, fullScore, type }) {
    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-GB", {
            year: "numeric",
            month: "long",
            day: "numeric"
        });
    }
    return (
        <div className="flex flex-col my-4 bg-[#EBF4F7] shadow-lg shadow-gray-300 p-2 space-y-2 rounded-xl">

            <div className="flex-col">
                <div className="flex justify-between">
                    <div className="flex items-center space-x-2 max-w-[75%] truncate
                 cursor-pointer text-xl">
                        {status === 'published' && <FaCheckCircle className="text-green-500" />}
                        <p className="font-poppins text-headline-title truncate ">First assignment</p>
                    </div>
                    <p className="font-poppins text-[14px] text-gray-600">status:
                        <span className="font-semibold font-poppins text-sm text-black"> {status}
                        </span></p>
                </div>
                <div className="flex justify-between">
                    <div className="flex flex-col">
                        <div className="flex flex-col">
                            <p>start date</p>
                            <p className="font-semibold font-poppins text-xs">{formatDate(startDate)}</p>
                        </div>
                        <div className="flex flex-col">
                            <p>Type</p>
                            <p className="font-semibold font-poppins text-xs">{type}</p>
                        </div>
                        <div className="flex flex-col">
                            <p>Score</p>
                            <p className="font-semibold font-poppins text-xs">{score}</p>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div className="flex flex-col">
                            <p>Duration</p>
                            <p className="font-semibold font-poppins text-xs">{duration} mins</p>
                        </div>
                        <div className="flex flex-col">
                            <p>Submitted At</p>
                            <p className="font-semibold font-poppins text-xs">{formatDate(submittedAt)}</p>
                        </div>
                        <div className="flex flex-col">
                            <p>Full Score</p>
                            <p className="font-semibold font-poppins text-xs">{fullScore}</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    );
}


export default ChildGrades;