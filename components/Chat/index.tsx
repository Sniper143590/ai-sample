import { PresetButton } from "@/constants/types";
import PrePromptButtons from "../PrePromptButtons";

type ChatProps = {
    title: string;
    children: React.ReactNode;
    chatContainerRef?: React.RefObject<HTMLDivElement>;
    onScroll:()=>void;
    onWheel:()=>void;
    handleSendButtonClick:(item?:PresetButton)=> void;
    onClickScrollDown:()=>void;
};

const Chat = ({ title, children, chatContainerRef,onWheel, onScroll, handleSendButtonClick, onClickScrollDown }: ChatProps) => {
    
    return (
        <>
            <div className="flex items-center min-h-[4.5rem]  px-10 py-3 border-b border-n-3 shadow-[0_0.75rem_2.5rem_-0.75rem_rgba(0,0,0,0.06)] 2xl:px-6 lg:-mt-18 lg:pr-20 md:pl-5 md:pr-18 dark:border-n-5 dark:shadow-[0_0.75rem_2.5rem_-0.75rem_rgba(0,0,0,0.15)]">
                <div className="mr-auto h5 truncate md:h6">{title}</div>
            </div>
            <div className={`flex flex-col z-2 grow p-10 space-y-10 overflow-y-auto scroll-smooth scrollbar-none 2xl:p-6 md:p-5`}  ref={chatContainerRef} onWheel={onWheel} onScroll={onScroll}>
                {children}
                <PrePromptButtons handleButtonClick={handleSendButtonClick}/>
            </div>
            
        </>
    );
};

export default Chat;
