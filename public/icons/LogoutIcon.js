const LogoutIcon = ({ active }) => {
    const color = active ? "#009DD1" : "#94A3B8";
    const textColor = active ? "text-bluePrimary" : "text-[#94A3B8]";
    return (
        <div className="flex items-center space-x-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M9.89535 11.23C9.45785 11.23 9.11192 11.57 9.11192 12C9.11192 12.42 9.45785 12.77 9.89535 12.77H16V17.55C16 20 13.9753 22 11.4724 22H6.51744C4.02471 22 2 20.01 2 17.56V6.45C2 3.99 4.03488 2 6.52762 2H11.4927C13.9753 2 16 3.99 16 6.44V11.23H9.89535ZM19.6302 8.5402L22.5502 11.4502C22.7002 11.6002 22.7802 11.7902 22.7802 12.0002C22.7802 12.2002 22.7002 12.4002 22.5502 12.5402L19.6302 15.4502C19.4802 15.6002 19.2802 15.6802 19.0902 15.6802C18.8902 15.6802 18.6902 15.6002 18.5402 15.4502C18.2402 15.1502 18.2402 14.6602 18.5402 14.3602L20.1402 12.7702H16.0002V11.2302H20.1402L18.5402 9.6402C18.2402 9.3402 18.2402 8.8502 18.5402 8.5502C18.8402 8.2402 19.3302 8.2402 19.6302 8.5402Z" fill={color} />
            </svg>
            <p className={`font-poppins text-center text-sm ${textColor}`}>Logout</p>

        </div>
    )
}


export default LogoutIcon