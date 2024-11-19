function ChildGrades() {
    return (
        <div className="flex flex-col bg-[rgb(235,244,247)] shadow-lg shadow-gray-300 p-2 space-y-2 rounded-xl">
            <div className="flex justify-between">
                <p className="font-poppins text-headline-title ">First assignment</p>
            </div>
            <div className="flex items-center space-x-2">
                <p className="font-poppins text-[10px] text-gray-400">Status: </p>
                <p className="font-poppins text-[10px] ">Completed</p>
            </div>
            <div className="flex justify-between ">
                <div>
                    <GradesDetails title={'Type'} info={'Assignments'} />
                    <GradesDetails title={'Start date'} info={'22'} />
                    <GradesDetails title={'Score'} info={'22'} />
                </div>
                <div>
                    <GradesDetails title={'Status'} info={'Published'} />
                    <GradesDetails title={'Submitted at:'} info={'22'} />
                    <GradesDetails title={'Full Score'} info={'22'} />
                </div>

            </div>
        </div>
    )
}

export default ChildGrades


function GradesDetails({ title, info }) {

    return (
        <div className="flex space-x-2">
            <p className="font-poppins text-[10px] text-gray-600">{title}</p>
            <p className="font-poppins  text-[10px] text-gray-600 ">{info}</p>
        </div>)
}