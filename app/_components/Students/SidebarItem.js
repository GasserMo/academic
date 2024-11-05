


function SidebarItem({ active, children }) {
    const color = active ? 'bg-blueHover' : ''
    return (
        <div className={`flex items-center p-2 m-2 space-x-4 ${color}
         hover:bg-blueHover w-full`}>
            {children}
        </div>
    );
}


export default SidebarItem
