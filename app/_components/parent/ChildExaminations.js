function ChildExaminations() {
    return (
        <div className="flex flex-col bg-[#EBF4F7] shadow-lg shadow-gray-300 p-2 space-y-2 rounded-xl">
            <div className="flex justify-between">
                <p className="font-poppins text-headline-title ">Biology</p>
                <div className="flex items-center space-x-2">
                    <p className="font-poppins text-[10px] text-gray-400">Status: </p>
                    <p className="font-poppins text-[10px] ">Completed</p>
                </div>
            </div>
            <div className="flex flex-row justify-between">
                <ExamDetails title={'Start date'} info={'22'} />
                <ExamDetails title={'End date'} info={'22'} />
                <ExamDetails title={'Duration'} info={'22'} />
                <ExamDetails title={'Score'} info={'9'} />
            </div>
        </div>
    )
}

export default ChildExaminations

function ExamDetails({ title, info }) {

    return (<div className="flex-col">
        <p className="font-poppins text-[10px] text-gray-600">{title}</p>
        <p className="font-poppins font-semibold text-[14px] ">{info}</p>
    </div>)
}