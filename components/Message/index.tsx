import TextareaAutosize from "react-textarea-autosize";
import Icon from "@/components/Icon";
import AddFile from "./AddFile";
import Files from "./Files";
import PrePromptButtons from "../PrePromptButtons";
import { useChat } from "@/providers/ChatModuleProvider";
import { PresetButton } from "@/constants/types";

type MessageProps = {
    placeholder?: string;
    image?: string;
    document?: any;
    handleSendButtonClick:(item?:PresetButton)=> void;
};

const Message = ({
    placeholder,
    image,
    document,
    handleSendButtonClick,
}: MessageProps) => {
    const stylesButton = "Group absolute right-3 bottom-2 w-10 h-10";
    const { query, setQuery} = useChat()
    const handleSendClick = () => {
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
            <PrePromptButtons handleButtonClick={handleSendButtonClick}/>
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
                        placeholder={placeholder || "Ask Pro Audio Files AI anything"}
                        onKeyDown={handleKeyDown}
                    />
                    {query === "" ? (
                        <button className={`${stylesButton}`}>
                            <Icon
                                className="fill-n-4 transition-colors group-hover:fill-primary-1"
                                name="recording"
                            />
                        </button>
                    ) : (
                        <button
                            className={`${stylesButton} bg-primary-1 rounded-xl transition-colors hover:bg-primary-1/90`}
                            onClick={handleSendClick}
                        >
                            <Icon className="fill-n-1" name="arrow-up" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Message;
