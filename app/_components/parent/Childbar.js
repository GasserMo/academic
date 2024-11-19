function Childbar({ active, name }) {
    const color = active ? 'text-white' : 'text-gray-500'
    return (
        <div className={`${active ? 'bg-bluePrimary rounded-2xl' : ''}`}>
            <p className={` cursor-pointer font-poppins truncate md:px-4 
                text-[12px]
                md:text-[15px] ${color}`}>{name}</p>
        </div>

    )
}

export default Childbar
