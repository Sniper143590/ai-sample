import Image from "@/components/Image";
import Icon from "@/components/Icon";
import { useAuth } from "@/providers/AuthProvider";

type ProfileProps = {
    visible?: boolean;
};

const Profile = ({ visible }: ProfileProps) => {
    const { logout } = useAuth()
    const handleLogOutClick = () => {
        logout()
    }
    return (
        <div
            className={`${
                visible
                    ? "mb-6"
                    : "mb-3 shadow-[0_1.25rem_1.5rem_0_rgba(0,0,0,0.5)]"
            }`}
        >
            <div className={`${!visible && "p-2.5 bg-n-6 rounded-xl"}`}>
                <div
                    className={`relative flex items-center relative ${
                        visible ? "justify-center" : "px-4 py-2.5 pb-4.5"
                    }`}
                >
                    
                    {!visible && (
                        <>
                            <div className="relative w-10 h-10">
                                <Image
                                    className="rounded-full object-cover"
                                    src="/images/avatar.jpg"
                                    fill
                                    alt="Avatar"
                                />
                                {/* <div className="absolute -right-0.75 -bottom-0.75 w-4.5 h-4.5 bg-primary-2 rounded-full border-4 border-n-6"></div> */}
                            </div>
                            <div className="ml-4 mr-4">
                                <div className="base2 font-semibold text-n-1">
                                    Tran Mau Tri Tam
                                </div>
                                <div className="caption1 font-semibold text-n-3/50">
                                    tam@ui8.net
                                </div>
                            </div>
                            
                        </>
                    )}
                    <button>
                    <Icon
                        className={`fill-n-4 transition-colors cursor-pointer hover:fill-primary-1 w-[35px] h-[35px] ${!visible?"ml-2":""}`}
                        name="settings-fill"
                    />
                    </button>
                
                </div>
                <button className="h-[40px] rounded-md hover:bg-red-400 bg-red-500 border-none text-white w-full mt-2" onClick={handleLogOutClick}>
                        {!visible?"Log Out":(<Icon className="fill-n-1 transition-colors group-hover:fill-primary-1" name="logout"/>)}
                </button>
            </div>
        </div>
    )
}

export default Profile;
