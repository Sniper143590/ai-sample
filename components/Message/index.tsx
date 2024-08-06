import TextareaAutosize from "react-textarea-autosize";
import Icon from "@/components/Icon";
import AddFile from "./AddFile";
import Files from "./Files";
import PrePromptButtons from "../PrePromptButtons";
import { useChat } from "@/providers/ChatModuleProvider";
import { PresetButton } from "@/constants/types";
import { PiArrowCircleDownDuotone } from "react-icons/pi";

type MessageProps = {
    placeholder?: string;
    image?: string;
    document?: any;
    handleSendButtonClick:(item?:PresetButton)=> void;
    onClickScrollDown:()=>void;
};

const Message = ({
    image,
    document,
    handleSendButtonClick,
    onClickScrollDown,
}: MessageProps) => {
    const stylesButton = "Group absolute right-3 bottom-2 w-10 h-10";
    const { query, chatModule, setQuery, loaded, loading, isBottom} = useChat()
    const handleSendClick = () => {
        if(query==="")return
        handleSendButtonClick()
    }

    const handleKeyDown = (event:  React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter') {
            if (event.shiftKey) {
                event.preventDefault(); // Prevent default Enter behavior
                setQuery((prev) => `${prev}\n`); // Add a newline
            } else {
                event.preventDefault(); // Prevent default Enter behavior
                handleSendButtonClick(); // Trigger your message sending function
            }
        }
    };
    
    return (
        <div className="relative z-5 px-10 pb-6 before:absolute before:-top-6 before:left-0 before:right-6  before:pointer-events-none 2xl:px-6 2xl:pb-5 md:px-4 md:pb-4 dark:before:to-n-6 dark:before:from-n-6/0">
            {isBottom?(
                <PrePromptButtons handleButtonClick={handleSendButtonClick}/>
                ):
                (  
                <button className="w-10 h-10 bg-none rounded-full absolute -top-20 right-20" onClick={onClickScrollDown}>
                    <PiArrowCircleDownDuotone className="w-10 h-10"/>
                </button>
                   
                )}
            <div className="relative z-2 border-2 border-n-3 rounded-xl overflow-hidden dark:border-n-5">
                {(image || document) && (
                    <Files image={image} document={document} />
                )}
                <div className="relative flex items-center min-h-[3.5rem] px-16 text-0">
                    <AddFile />
                    <TextareaAutosize
                        className="w-full py-3 bg-transparent body2 text-n-7 outline-none resize-none placeholder:text-n-4/75 dark:text-n-1 dark:placeholder:text-n-4 truncate"
                        maxRows={1}
                        autoFocus
                        value={query}
                        onChange={(e) =>setQuery(e.target.value)}
                        placeholder={loading?"": (loaded?"How would you like to modify this answer?":chatModule.placeholder_text)}
                        onKeyDown={handleKeyDown}
                        disabled={loading}
                    />
                    
                        <button
                            className={`${stylesButton} rounded-full ${(query==="" || loading) ? "bg-n-3":"bg-n-5 hover:bg-primary-1/90"} transition-colors `}
                            onClick={handleSendClick}
                            disabled={loading}
                        >
                            <Icon className="fill-n-1" name="arrow-up" />
                        </button>
                </div>
            </div>
        </div>
    );
};

export default Message;
