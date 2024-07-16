import Image from "next/image"

const MenuList = () => {
    return (
        <div className="flex items-center justify-center w-full border-b-[1px] border-b-[#232627]">
                <ul className="menu text-white w-[288px]">
                    <li>
                        <div className="h-[48px]">
                            <Image 
                                src="/images/sidebar/chat_icon.png"
                                width={24}
                                height={24}
                                alt="Chat Icon"
                            />
                            <p className="text-[#E8ECEF] text-[14px] font-semibold text-opacity-75 font-inter ml-1" >
                                Chats
                            </p>
                        </div>
                    </li>
                    <li>
                        <div className="h-[48px]">
                            <Image 
                                src="/images/sidebar/search.png"
                                width={24}
                                height={24}
                                alt="Chat Icon"
                            />
                            <p className="text-[#E8ECEF] text-[14px] font-semibold text-opacity-75 font-inter ml-1" >Search</p>
                        </div>
                    </li>
                    <li>
                        <div className="h-[48px]">
                            <Image 
                                src="/images/sidebar/bank-card-check.png"
                                width={24}
                                height={24}
                                alt="Chat Icon"
                            />
                            <p className="text-[#E8ECEF] text-[14px] font-semibold text-opacity-75 font-inter ml-1" >Manage subscription</p>
                        </div>
                    </li>
                    <li>
                        <div className="h-[48px]">
                            <Image 
                                src="/images/sidebar/barcode.png"
                                width={24}
                                height={24}
                                alt="Chat Icon"
                            />
                            <p className="text-[#E8ECEF] text-[14px] font-semibold text-opacity-75 font-inter ml-1" >Updates & FAQ</p>
                        </div>
                    </li>
                    <li>
                        <div className="h-[48px]">
                            <Image 
                                src="/images/sidebar/settings.png"
                                width={24}
                                height={24}
                                alt="Chat Icon"
                            />
                            <p className="text-[#E8ECEF] text-[14px] font-semibold text-opacity-75 font-inter ml-1" >Settings</p>
                        </div>
                    </li>
                </ul>
            </div>
    )
}

export default MenuList