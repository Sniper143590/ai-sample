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
        "h-6 ml-3 px-2 bg-n-3 rounded-md caption1 txt-n-6 transition-colors hover:text-primary-1 dark:bg-n-7 truncate";

    return (
        <>
            
            {
                actions.map((item, index)=>(
                    <div className="group flex relative">
                        <button key={index} className={styleButton} onClick={()=>handleActionClick(item.prompt)} data-tooltip={item.prompt}>{item.prompt}</button>
                        <span className="group-hover:opacity-100 transition-opacity bg-gray-800 px-1 text-sm text-gray-100 rounded-md absolute left-1/2 -translate-x-1/2 translate-y-full opacity-0 mx-auto">{item.prompt}</span>
                    </div>
                ))
                
            }
            
        </>
    );
};


export default Action;
