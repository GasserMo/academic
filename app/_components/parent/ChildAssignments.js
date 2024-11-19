import { FaCheckCircle } from 'react-icons/fa';

function ChildAssignments() {
    return (
        <div className="flex flex-col bg-[#EBF4F7] shadow-lg shadow-gray-300 p-2 space-y-2 rounded-xl">
            <div className="flex justify-between">
                <div className="flex items-center space-x-2 max-w-[75%] truncate
                 cursor-pointer text-xl">
                    <FaCheckCircle className="text-green-500" />
                    <p className="font-poppins text-headline-title truncate ">First assignment</p>
                </div>
                <div className="flex items-center space-x-2">
                    <p className="font-poppins text-[10px] text-gray-400">Status: </p>
                    <p className="font-poppins text-[10px] ">Completed</p>
                </div>
            </div>
            <div className="flex flex-row justify-between">
                <AssignmentDetails title={'Start date'} info={'22'} />
                <AssignmentDetails title={'End date'} info={'22'} />
                <AssignmentDetails title={'Duration'} info={'22'} />
                <AssignmentDetails title={'Score'} info={'9'} />
            </div>
        </div>
    )
}

export default ChildAssignments

function AssignmentDetails({ title, info }) {

    return (<div className="flex-col">

        <p className="font-poppins text-[10px] text-gray-600">{title}</p>
        <p className="font-poppins font-semibold text-[14px] ">{info}</p>
    </div>)
}