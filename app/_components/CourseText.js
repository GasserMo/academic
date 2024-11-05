function CourseText({ active, name }) {
    const color = active ? 'text-bluePrimary' : 'text-gray-500'
    return (
        <div>
            <p className={` cursor-pointer font-poppins text-[15px] ${color}`}>{name}</p>
            {active && <div className="h-0.5 rounded-lg w-full bg-bluePrimary"></div>}
        </div>

    )
}

export default CourseText
