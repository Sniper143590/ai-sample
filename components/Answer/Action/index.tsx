import { toast } from "react-hot-toast";
import Notify from "@/components/Notify";
import { useChat } from "@/providers/ChatModuleProvider";

type ActionProps = {
    visible?:boolean;
};

const Action = ({visible=true}: ActionProps) => {
    const { getResponseFunc} = useChat()

    const handleClickSimpler = () => {
        getResponseFunc({_id:0, text:"Make it simpler", prompt:"Make it simpler"})
    }
    const handleClickMore = () => {
        getResponseFunc({_id:0, text:"Make it more advanced", prompt:"Make it more advanced"})
    }
    const handleClickExample = () => {
        getResponseFunc({_id:0, text:"Give me an example", prompt:"Give me an example"})
    }

    const styleButton: string =
        "h-6 ml-3 px-2 bg-n-3 rounded-md caption1 txt-n-6 transition-colors hover:text-primary-1 dark:bg-n-7";

    return (
        <>
            {visible&& (
                <>
                    <button className={styleButton} onClick={handleClickSimpler}>Make it simpler</button>
                    <button className={styleButton} onClick={handleClickMore}>Make it more advanced</button>
                    <button className={styleButton} onClick={handleClickExample}>Give me an example</button>
                </>
            )}
            
        </>
    );
};

export default Action;
