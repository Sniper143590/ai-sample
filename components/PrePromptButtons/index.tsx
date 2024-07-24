import { PresetButton } from "@/constants/types";
import { useChat } from "@/providers/ChatModuleProvider";

interface PrePromptButtonsProps {
    handleButtonClick:(item?:PresetButton)=>void;
}

const PrePromptButtons = ({ handleButtonClick}:PrePromptButtonsProps) => {
    const {chatModule} = useChat()
    const handleClick = (item:{_id:number, text:string, prompt:string}) =>{
        handleButtonClick(item)
    }
    return (
        <div className="flex flex-col mb-3 px-20 w-full">
            {chatModule && chatModule.preset_buttons.map((item, index) => (
                <button key={index} className="btn-normal mt-1 w-[calc(100%-1rem)] 2xl:mx-2 border" onClick={()=>handleClick(item)}>
                    {item.text}
                </button>
                )
            )}
        </div>
    )
}

export default PrePromptButtons