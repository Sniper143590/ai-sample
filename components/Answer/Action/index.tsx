import { useChat } from "@/providers/ChatModuleProvider";

type ActionPropType = {
    response?:string,
}

const Action = ({response}:ActionPropType) => {

    const { getResponseFunc, actions} = useChat()
    const handleActionClick = (value:string) => {
        const prompt = `Generate again with the following rule and content. This is previouse content:${response}. This is the rule:${value}`
        getResponseFunc({_id:0, text:value, prompt:prompt})
    }

    const styleButton: string =
        "flex-shrink-0 m-1 w-auto ml-1 px-2 bg-n-3 rounded-md caption1 txt-n-6 transition-colors hover:text-primary-1 dark:bg-n-7 truncate";

    return (
        <div className="flex flex-row flex-wrap justify-end w-4/5 ml-auto !mt-0">
            
            {
                actions.map((item, index)=>(
                        <button key={index} className={styleButton} onClick={()=>handleActionClick(item.prompt)} data-tooltip={item.prompt}>{item.prompt}</button>
                   
                ))
            }
            
        </div>
    );
};


export default Action;
