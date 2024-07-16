import { useChat } from "@/providers/ChatModuleProvider";
import { useSidebar } from "@/providers/RightSidebarProvider";

interface PrePromptButtonsProps {
    handleButtonClick:(llm:string, promptContext:string, item?:{_id:number, text:string, prompt:string})=>void;
}

const PrePromptButtons = ({ handleButtonClick}:PrePromptButtonsProps) => {
    const {prePrompts, setQuery} = useChat()
    const {llm, promptContext} = useSidebar()
    const handleClick = (item:{_id:number, text:string, prompt:string}) =>{
        // setQuery(item.text)
        handleButtonClick(llm, promptContext, item)
    }
    return (
        <div className="flex flex-col mb-3 px-20 w-full">
            {prePrompts && prePrompts.map((item, index) => (
                <button key={index} className="btn-normal mt-1 w-[calc(100%-1rem)] 2xl:mx-2 border" onClick={()=>handleClick(item)}>
                    {item.text}
                </button>
                )
            )}
        </div>
    )
}

export default PrePromptButtons