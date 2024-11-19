


function SidebarItem({ active, children }) {
    const color = active ? 'bg-blueHover' : ''
    return (
        <div className={`flex ${active ? 'border-l-2 border-bluePrimary' : ''} 
        items-center md:mt-3 p-2 mx-2 space-x-4 ${color}
         hover:bg-blueHover w-full`}>
            {children}
        </div>
    );
}


export default SidebarItem
