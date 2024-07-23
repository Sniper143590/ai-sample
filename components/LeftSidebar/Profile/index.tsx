import { useState } from "react";
import Image from "@/components/Image";
import Icon from "@/components/Icon";
import Settings from "@/components/Settings";
import { useAuth } from "@/providers/AuthProvider";
import { settings } from "@/constants/settings";
import Modal from "@/components/Modal";

type ProfileProps = {
    visible?: boolean;
};

const Profile = ({ visible }: ProfileProps) => {
    const { logout, userData } = useAuth()
    const [visibleSettings, setVisibleSettings] = useState<boolean>(false);

    const handleLogOutClick = () => {
        logout()
    }
    const handleSettingsClick = () => {
        setVisibleSettings(true)
    }
    return (
       <>
        <div
            className={`${
                visible
                    ? "mb-6"
                    : "mb-3 shadow-[0_1.25rem_1.5rem_0_rgba(0,0,0,0.5)]"
            }`}
        >
            <div className={`${!visible && "p-2.5 bg-n-6 rounded-xl"}`}>
                <div
                    className={`relative w-full flex items-center relative ${
                        visible ? "justify-center" : "px-2 py-2.5 pb-4.5"
                    }`}
                >
                    
                    {!visible && (
                        <div className="flex flex-row">
                            <div className="relative !w-10 !h-10">
                                <Image
                                    className="rounded-full object-cover"
                                    src="/images/avatar.jpg"
                                    fill
                                    alt="Avatar"
                                />
                                {/* <div className="absolute -right-0.75 -bottom-0.75 w-4.5 h-4.5 bg-primary-2 rounded-full border-4 border-n-6"></div> */}
                            </div>
                            <div className="mx-2 !w-[160px]">
                                <div className="base2 font-semibold text-n-1 truncate">
                                    {userData?.displayName?userData?.displayName:userData?.email}
                                </div>
                                <div className="caption1 font-semibold text-n-3/50 truncate">
                                    {userData?.email}
                                </div>
                            </div>
                            
                        </div>
                    )}
                    <button onClick={handleSettingsClick}>
                        <Icon
                            className={`fill-n-4 transition-colors cursor-pointer hover:fill-primary-1 w-[30px] h-[30px] ${!visible?"ml-2":""}`}
                            name="settings-fill"
                        />
                    </button>
                
                </div>
                <button className="h-[40px] rounded-md hover:bg-red-400 bg-red-500 border-none text-white w-full mt-2" onClick={handleLogOutClick}>
                    {!visible?"Log Out":(<Icon className="fill-n-1 transition-colors group-hover:fill-primary-1" name="logout"/>)}
                </button>
            </div>
        </div>
        <Modal
                className="md:!p-0"
                classWrap="max-w-[30rem] md:min-h-screen-ios md:rounded-none"
                classButtonClose="hidden md:block md:absolute md:top-5 md:right-5 dark:fill-n-4"
                classOverlay="md:bg-n-1"
                visible={visibleSettings}
                onClose={() => setVisibleSettings(false)}
        >
            <Settings onClose={() => setVisibleSettings(false)}/>
        </Modal>
        </>
    )
}

export default Profile;
