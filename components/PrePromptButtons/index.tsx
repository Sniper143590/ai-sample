import { PresetButton } from "@/constants/types";
import { useChat } from "@/providers/ChatModuleProvider";
import Image from "next/image";

interface PrePromptButtonsProps {
    handleButtonClick:(item?:PresetButton)=>void;
}

const PrePromptButtons = ({ handleButtonClick}:PrePromptButtonsProps) => {
    const {prePrompts, loading, prePromptLoading, refreshPresetPrompts , loaded} = useChat()
    const handleClick = (item:{_id:number, text:string, prompt:string}) =>{
        handleButtonClick(item)
    }
    const handleRefresh = async () => {
        await refreshPresetPrompts()
    }

    return (
        <div className="flex flex-wrap items-center justify-center mb-3 md:px-5 px-20 w-full"> 
        
            {!loading && !prePromptLoading && prePrompts && prePrompts.map((item, index) => (
            <button 
                key={index} 
                className="btn-normal mt-1 w-2/5 md:w-full mx-2 px-2 border truncate" 
                onClick={() => handleClick(item)}
                disabled={loading}
            >
                {item.text}
            </button>
            ))}
            {loaded && !loading &&(
                <div className="w-full flex items-center justify-center mt-1">
                <button className="btn-refresh" disabled={loading} onClick={() => handleRefresh()}>
                    <Image rel="preload" width={20} height={20} className={prePromptLoading?"animate-spin":""} src="/images/refresh.png" alt="Loading icon" />
                </button>
            </div>
            )}
        </div>
    )
}

export default PrePromptButtons