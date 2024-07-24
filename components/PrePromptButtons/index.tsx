import { PresetButton } from "@/constants/types";
import { useChat } from "@/providers/ChatModuleProvider";

interface PrePromptButtonsProps {
    handleButtonClick:(item?:PresetButton)=>void;
}

const PrePromptButtons = ({ handleButtonClick}:PrePromptButtonsProps) => {
    const {presetButtons} = useChat()
    const handleClick = (item:{_id:number, text:string, prompt:string}) =>{
        handleButtonClick(item)
    }
    return (
        <div className="flex flex-wrap items-center justify-center mb-3 md:px-5 px-20 w-full"> 
            {presetButtons && presetButtons.map((item, index) => (
            <button 
                key={index} 
                className="btn-normal mt-1 w-2/5 md:w-full mx-2 p-2 border truncate" 
                onClick={() => handleClick(item)}
            >
                {item.text}
            </button>
            ))}
        </div>
    )
}

export default PrePromptButtons