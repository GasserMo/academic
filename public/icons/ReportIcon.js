function ReportIcon({ active }) {
    const color = active ? "#009DD1" : "#94A3B8";
    const textColor = active ? "text-bluePrimary" : "text-[#94A3B8]";

    return (
        <div className="flex items-center space-x-2">
            < svg width="24" height="24" viewBox="0 0 16 20" fill={color} xmlns="http://www.w3.org/2000/svg" >
                <path d="M16 6L10 0H2C1.46957 0 0.960859 0.210714 0.585786 0.585786C0.210714 0.960859 0 1.46957 0 2V18C0 18.5304 0.210714 19.0391 0.585786 19.4142C0.960859 19.7893 1.46957 20 2 20H14C14.5304 20 15.0391 19.7893 15.4142 19.4142C15.7893 19.0391 16 18.5304 16 18V6ZM5 17H3V8H5V17ZM9 17H7V11H9V17ZM13 17H11V14H13V17ZM10 7H9V2L14 7H10Z" fill={color} />
            </svg >
            <p className={`font-poppins text-center text-sm ${textColor}`}>Report</p>
        </div>
    )
}

export default ReportIcon


