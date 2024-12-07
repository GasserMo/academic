

function ExamIcon({ active }) {
    const color = active ? "#009DD1" : "#94A3B8";
    const textColor = active ? "text-bluePrimary" : "text-[#94A3B8]";

    return (
        <div className="flex items-center space-x-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
                <path d="M20.5 10.19H17.61C15.24 10.19 13.31 8.26 13.31 5.89V3C13.31 2.45 12.86 2 12.31 2H8.07C4.99 2 2.5 4 2.5 7.57V16.43C2.5 20 4.99 22 8.07 22H15.93C19.01 22 21.5 20 21.5 16.43V11.19C21.5 10.64 21.05 10.19 20.5 10.19Z" fill={color} />
                <path d="M15.8002 2.21048C15.3902 1.80048 14.6802 2.08048 14.6802 2.65048V6.14048C14.6802 7.60048 15.9202 8.81048 17.4302 8.81048C18.3802 8.82048 19.7002 8.82048 20.8302 8.82048C21.4002 8.82048 21.7002 8.15048 21.3002 7.75048C19.8602 6.30048 17.2802 3.69048 15.8002 2.21048Z" fill="#94A3B8" />
            </svg>
            <p className={`font-poppins text-center text-sm ${textColor}`}>Exams</p>
        </div>
    )
}

export default ExamIcon
