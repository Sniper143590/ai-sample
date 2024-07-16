import Image from "next/image"
import MenuList from "./MenuList"
import SubMenuList from "./SubMenuList"

const SideNavbar = () => {
    return (
        <div className="flex flex-col w-[320px] h-screen bg-black">
            <div className="flex items-center justify-between w-full h-[120px] px-[10px]">
                <Image 
                    src="/images/auth/logo_dark.png"
                    width={189.53}
                    height={40}
                    alt="Logo Image"
                    priority={true}
                />
                <Image 
                    src="/images/sidebar/collapse_icon.png"
                    width={24}
                    height={24}
                    alt="Collapse Icon"
                    className="cursor-pointer"
                />
            </div>
            <MenuList />
            <SubMenuList />
        </div>
        
    )
}

export default SideNavbar