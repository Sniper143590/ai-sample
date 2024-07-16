import React, { createContext, useContext, useMemo, ReactNode  } from 'react'
import useChatModule from '@/hooks/useChatModule'
import { PresetButton } from '@/constants/types';


const ChatContext = createContext<{
    loading:boolean;
    queries:{query:string, time:string}[];
    results:string[];
    query:string;
    setLoading:React.Dispatch<React.SetStateAction<boolean>>;
    setQuery: React.Dispatch<React.SetStateAction<string>>;
    getResponseFunc:(llm:string, promptContext:string)=> void;
    // getResponseFromButtonFunc:(preprompt:{_id:number, text:string, prompt:string}, llm:string, promptContext:string)=>void;
    prePrompts:PresetButton[],
    setPrePrompts:React.Dispatch<React.SetStateAction<PresetButton[]>>;
    cancelGeneration:()=>void;
} | null>(null)

type ChatModuleProviderProps = {
    children: ReactNode
}
const ChatModuleProvider = ({children}:ChatModuleProviderProps) => {
    const chatModuleData = useChatModule()

    const value = useMemo(
        () => ({
            ...chatModuleData,
        }),
        [chatModuleData],
    )

    return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}

export const useChat = () => {
    const context = useContext(ChatContext)
    if (!context) {
        throw new Error("useChat must be used within a ChatModuleProvider")
    }
    return context
}

export default ChatModuleProvider