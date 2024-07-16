import { useEffect, useState, useRef } from "react"
import getResponseFromLlm from "@/lib/getResponseFromLlm"
import Notify from "@/components/Notify";
import { toast } from "react-hot-toast";
import { PresetButton } from "@/constants/types";


const useChatModule = () => {
    const [query, setQuery] = useState("")
    const [queries, setQueries] = useState<{query:string, time:string}[]>([])
    const [results, setResults] = useState<string[]>([])
    const [loading, setLoading] = useState(false)
    const [prePrompts, setPrePrompts] = useState<PresetButton[]>([])

    const { startOperation, cancelOperation } = getResponseFromLlm();
    const cancelRef = useRef(cancelOperation);
    const doNothing = () => {};

    useEffect(()=>{
        cancelRef.current = cancelOperation; // Update the ref whenever cancelOperation changes
        return () => {
            // Cleanup function to avoid memory leaks
            cancelRef.current = doNothing; // Set to doNothing when the component unmounts
        };
    }, [cancelOperation])
    
    function getCurrentTime(): string {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based in JavaScript
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0'); // Extract and format seconds
    
        return `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`; // Include seconds in the return statement
    }

    const getResponseFunc = async (llm:string, promptContext:string, item?:{_id:number, text:string, prompt:string}) => {
        console.log(llm)
        if (llm){
            // console.log(queryFrom)
            // const realQuery = queryFrom?queryFrom:query;
            console.log(query)
            if(item){
                setQueries(prev=>[...prev, {query:item.text, time:getCurrentTime()}])
            } else {
                setQueries(prev=>[...prev, {query:query, time:getCurrentTime()}])
            }
            // setQueries(prev=>[...prev, {query:query, time:getCurrentTime()}])
            setQuery("")
            try{
                setLoading(true)
                const result = await startOperation(item?item.prompt:query, llm.toLowerCase(), promptContext);
                setResults(prev=>[...prev, result.message])
                let preprompts = result.preprompts
                const updatedPrePrompts = preprompts.map((item:string, index:number)=>
                    {
                        return { _id:index, text: item, prompt: item };
                    }
                );
                setPrePrompts(updatedPrePrompts)
                setLoading(false)
            } catch {
                setResults(prev=>[...prev, "Network Error"])
                setLoading(false)
            }
        } else {
            toast(() => (
                <Notify iconClose>
                    <div className="mr-6 ml-3 h6 ml-4">LLM is not selected!</div>
                </Notify>
            ));
        }
    }

    const cancelGeneration = async () => {
        await cancelOperation()
    }

    // const getResponseFromButtonFunc = async (preprompt:{_id:number, text:string, prompt:string}, llm:string, promptContext:string) => {
    //     console.log(llm)
    //     if (llm){
    //         setQueries(prev=>[...prev, {query:preprompt.text, time:getCurrentTime()}])
    //         setQuery("")
    //         const result = await getResponseFromLlm(preprompt.prompt?preprompt.prompt:preprompt.text, llm.toLowerCase(), promptContext);
    //         setResults(prev=>[...prev, result.message])
    //         let preprompts = result.preprompts
    //         const updatedPrePrompts = preprompts.map((item:string, index:number)=>
    //             {
    //                 return { _id:index, text: item, prompt: item };
    //             }
    //         );
    //         setPrePrompts(updatedPrePrompts)
    //     } else {
    //         toast(() => (
    //             <Notify iconClose>
    //                 <div className="mr-6 ml-3 h6 ml-4">LLM is not selected!</div>
    //             </Notify>
    //         ));
    //     }
    // }

    return {
        query,
        setQuery,
        loading, 
        setLoading,
        queries,
        results,
        getResponseFunc,
        // getResponseFromButtonFunc,
        prePrompts,
        setPrePrompts,
        cancelGeneration,
    }
}

export default useChatModule
