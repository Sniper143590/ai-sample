import Span from "./Span"

const SubMenuList = () => {
    return (
        <div className="text-[#E8ECEF] text-[14px] w-[288px] font-semibold text-opacity-75 font-inter pl-1">
            <ul className="menu">
                <li>
                    <details open>
                    <summary className="flex flex-row-reverse items-center justify-end gap-6 w-full h-[48px] mb-1">
                        Chat list
                    </summary>
                        <Span color="bg-[#6C7275] opacity-[50%]" text="UI8 Production" number="16"/>
                        <Span color="bg-[#8E55EA]" text="UI8 Production" number="16"/>
                        <Span color="bg-[#3E90F0]" text="Favorites" number="8"/>
                        <Span color="bg-[#D84C10]" text="Archived" number="128"/>
                    </details>
                </li>
            </ul>
        </div>
        
    )
}

export default SubMenuList