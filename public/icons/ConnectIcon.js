function ConnectIcon({ active }) {
    const color = active ? "#009DD1" : "#94A3B8";
    const textColor = active ? "text-bluePrimary" : "text-[#94A3B8]";

    return (
        <div className="flex items-center space-x-2">

            <svg width="24" height="24" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 10.75V10.25M14 10.75V10.25M6 10.75V10.25M10 19C11.78 19 13.5201 18.4722 15.0001 17.4832C16.4802 16.4943 17.6337 15.0887 18.3149 13.4442C18.9961 11.7996 19.1743 9.99002 18.8271 8.24419C18.4798 6.49836 17.6226 4.89472 16.364 3.63604C15.1053 2.37737 13.5016 1.5202 11.7558 1.17294C10.01 0.82567 8.20038 1.0039 6.55585 1.68509C4.91131 2.36628 3.50571 3.51983 2.51677 4.99987C1.52784 6.47991 1 8.21997 1 10C1 11.44 1.338 12.8 1.94 14.007C2.393 14.918 1.763 16.147 1.523 17.044C1.46983 17.2424 1.46982 17.4513 1.52297 17.6497C1.57613 17.8481 1.68057 18.029 1.8258 18.1742C1.97103 18.3194 2.15194 18.4239 2.35033 18.477C2.54872 18.5302 2.75761 18.5302 2.956 18.477C3.853 18.237 5.082 17.607 5.993 18.061C7.23777 18.6805 8.60958 19.002 10 19Z" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <p className={`font-poppins text-center text-sm ${textColor}`}>Connect</p>
        </div>
    )
}

export default ConnectIcon

