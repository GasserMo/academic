const CheckIcon = ({ check }) => {
    const color = check ? "#009DD1" : "#94A3B8";
    return (
        <svg width="28" height="28" viewBox="0 0 28 28" fill={color} xmlns="http://www.w3.org/2000/svg">
            <rect x="0.5" y="0.5" width="27" height="27" rx="13.5" stroke="#009DD1" />
            <path d="M11.6667 19.5L7 14.8191L8.63333 13.1809L11.6667 16.2234L19.3667 8.5L21 10.1383L11.6667 19.5Z" fill="#595959" />
        </svg>


    )
}

export default CheckIcon



