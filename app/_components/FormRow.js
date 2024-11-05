import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"; // Import eye icons

export default function FormRow({
    type,
    id,
    placeholder,
    label,
    onChange,
    value,
    isValid,
    validationMessage,
    showPassword, // New prop to control password visibility
    togglePasswordVisibility,
}) {
    return (
        <div className="flex flex-col relative">
            {label && <label className="text-[14px] font-poppins mb-2 ">{label}</label>}
            <div className="relative">

                <input
                    type={showPassword ? "text" : type} // Change input type based on showPassword
                    id={id}
                    value={value}
                    placeholder={placeholder}
                    onChange={onChange}
                    className={`border font-thin text-sm rounded-sm p-4  mb-1 w-full // Added pr-10 for padding right
          ${isValid === false
                            ? "border-red-500"
                            : isValid === true
                                ? "border-green-500"
                                : "border-gray-300"
                        }`}
                />
                {type === "password" && ( // Only show icon for password input
                    <button
                        type="button"
                        onClick={togglePasswordVisibility} // Call toggle function
                        className="absolute right-3 top-4 " // Position the icon
                        style={{ background: "transparent", border: "none" }} // Remove background and border
                    >
                        {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}{" "}
                    </button>
                )}
            </div>
            {isValid === false && (
                <p className="text-red-500 text-sm">{validationMessage}</p>
            )}
        </div>
    );
}