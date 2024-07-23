
import EditProfile from "./EditProfile";

type SettingsPropps = {
    onClose:()=>void;
}

const Settings = ({onClose}:SettingsPropps) => {
   
    return (
        <div className="p-12 lg:px-8 md:pt-16 md:px-5 md:pb-8">
            <div className="flex md:block">
                <div className="grow md:pl-0">
                    <EditProfile onClose={onClose}/>
                </div>
            </div>
        </div>
    );
};

export default Settings;
