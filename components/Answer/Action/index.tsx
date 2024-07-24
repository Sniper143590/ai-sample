import { useChat } from "@/providers/ChatModuleProvider";

const Action = () => {

    const { getResponseFunc, actions} = useChat()
    const handleActionClick = (value:string) => {
        getResponseFunc({_id:0, text:value, prompt:value})
    }

    const styleButton: string =
        "h-6 ml-3 px-2 bg-n-3 rounded-md caption1 txt-n-6 transition-colors hover:text-primary-1 dark:bg-n-7";

    return (
        <>
            
            {
                actions.map((item, index)=>(
                    <button key={index} className={styleButton} onClick={()=>handleActionClick(item.prompt)}>{item.prompt}</button>
                ))
                
            }
            
        </>
    );
};


export default Action;
