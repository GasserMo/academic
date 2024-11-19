function ChildIcon({ active }) {
    const color = active ? "#009DD1" : "#94A3B8";
    const textColor = active ? "text-bluePrimary" : "text-[#94A3B8]";

    return (
        <div className="flex items-center space-x-2">
            < svg svg width="24" height="24" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg" >
                <path d="M13.217 1.49947C12.5242 1.17061 11.7669 1 11 1C10.2331 1 9.47581 1.17061 8.783 1.49947L2.092 4.63647C0.636 5.31847 0.636 7.68047 2.092 8.36247L8.782 11.4995C9.47494 11.8285 10.2324 11.9992 10.9995 11.9992C11.7666 11.9992 12.5241 11.8285 13.217 11.4995L19.908 8.36247C21.364 7.68047 21.364 5.31847 19.908 4.63647L13.217 1.49947ZM21 6.49947V11.4995V6.49947Z" fill={color} />
                <path d="M21 6.49947V11.4995M13.217 1.49947C12.5242 1.17061 11.7669 1 11 1C10.2331 1 9.47581 1.17061 8.783 1.49947L2.092 4.63647C0.636 5.31847 0.636 7.68047 2.092 8.36247L8.782 11.4995C9.47494 11.8285 10.2324 11.9992 10.9995 11.9992C11.7666 11.9992 12.5241 11.8285 13.217 11.4995L19.908 8.36247C21.364 7.68047 21.364 5.31847 19.908 4.63647L13.217 1.49947Z" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M4 9.5V14.625C4 17.543 8.694 19 11 19C13.306 19 18 17.543 18 14.625V9.5" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg >
            <p className={`font-poppins text-center text-sm ${textColor}`}>Child</p>

        </div>
    )
}

export default ChildIcon



