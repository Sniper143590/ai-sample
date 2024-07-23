import { useState } from "react";
import Image from "@/components/Image";
import Icon from "@/components/Icon";
import Field from "@/components/Field";
import { useAuth } from "@/providers/AuthProvider";
import Notify from "@/components/Notify";
import { toast } from "react-hot-toast";

type EditProfileProps = {
    onClose:()=>void;
};

const EditProfile = ({onClose}: EditProfileProps) => {
    const { userName, loading, setUserPassword, updatePasswordFromSettings, userData } = useAuth()
    const [newPassword, setNewPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    const [objectURL, setObjectURL] = useState<any>(userData?.photoURL);
    const [name, setName] = useState<string>("");
    console.log(userData)
    const handleUpload = (e: any) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            
            // setImage(file);
            setObjectURL(URL.createObjectURL(file));
        }
    };

    const handleSaveClick = async () => {
        if(newPassword!==confirmPassword){
            toast(() => (
                <Notify iconClose>
                    <div className="mr-6 ml-3 h6 ml-4">Passwords are not matching!</div>
                </Notify>
              ));
            return
        }
        if(newPassword.length<8){
            toast(() => (
                <Notify iconClose>
                    <div className="mr-6 ml-3 h6 ml-4">Password should be at least 8 characters!</div>
                </Notify>
              ));
            return
        }
        setUserPassword(newPassword)
        await updatePasswordFromSettings(newPassword)
        onClose()
    }

    return (
        <>
            <div className="mb-8 h4 md:mb-6">Edit profile</div>
            <div className="mb-3 base2 font-semibold text-n-6 dark:text-n-1">
                Avatar
            </div>
            <div className="flex items-center mb-6">
                <div className="relative flex justify-center items-center shrink-0 w-28 h-28 mr-4 rounded-full overflow-hidden bg-n-2 dark:bg-n-6">
                    {objectURL !== null ? (
                        <Image
                            className="object-cover rounded-full"
                            src={objectURL}
                            fill
                            alt="Avatar"
                        />
                    ) : (
                        <Icon
                            className="w-8 h-8 dark:fill-n-1"
                            name="profile"
                        />
                    )}
                </div>
                <div className="grow">
                    <div className="relative inline-flex mb-4">
                        <input
                            className="peer absolute inset-0 opacity-0 cursor-pointer"
                            type="file"
                            onChange={handleUpload}
                        />
                        <button className="btn-stroke-light peer-hover:bg-n-3 dark:peer-hover:bg-n-5">
                            Upload new image
                        </button>
                    </div>
                    <div className="caption1 text-n-4">
                        <p>At least 800x800 px recommended.</p>
                        <p>JPG or PNG and GIF is allowed</p>
                    </div>
                </div>
            </div>
            <Field
                className="mb-6"
                label="Name"
                placeholder="Username"
                icon="profile-1"
                value={userName}
                onChange={(e: any) => setName(e.target.value)}
                required
                disabled={loading}
            />
            <Field
                className="mb-6"
                label="New password"
                placeholder="New password"
                note="Minimum 8 characters"
                type="password"
                icon="lock"
                value={newPassword}
                onChange={(e: any) => setNewPassword(e.target.value)}
                disabled={loading}
                required
            />
            <Field
                className="mb-6"
                label="Confirm new password"
                placeholder="Confirm new password"
                note="Minimum 8 characters"
                type="password"
                icon="lock"
                value={confirmPassword}
                onChange={(e: any) => setConfirmPassword(e.target.value)}
                disabled={loading}
                required
            />
            <button className="btn-blue w-full" disabled={loading} onClick={handleSaveClick}>Save changes</button>
        </>
    );
};

export default EditProfile;
