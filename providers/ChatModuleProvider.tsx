import React, { createContext, useContext, useMemo, ReactNode  } from 'react'
import useChatModule from '@/hooks/useChatModule'
import { PresetButton } from '@/constants/types';
import { ChatModule } from '@/constants/types';

const ChatContext = createContext<{
    loading:boolean;
    queries:{query:string, time:string}[];
    results:string[];
    query:string;
    setLoading:React.Dispatch<React.SetStateAction<boolean>>;
    setQuery: React.Dispatch<React.SetStateAction<string>>;
    getResponseFunc:(item?:PresetButton)=> void;
    // getResponseFromButtonFunc:(preprompt:{_id:number, text:string, prompt:string}, llm:string, promptContext:string)=>void;
    prePrompts:PresetButton[],
    setPrePrompts:React.Dispatch<React.SetStateAction<PresetButton[]>>;
    cancelGeneration:()=>void;
    //ChatModule
    name:string;
    setName:React.Dispatch<React.SetStateAction<string>>;
    avatar:File | null;
    setAvatar:React.Dispatch<React.SetStateAction<File | null>>;
    setAvatarUrl:React.Dispatch<React.SetStateAction<string>>;
    avatarUrl:string;
    llm:string;
    setLlm:React.Dispatch<React.SetStateAction<string>>;
    role:string;
    setRole:React.Dispatch<React.SetStateAction<string>>;
    presetButtons:PresetButton[];
    setPresetButtons:React.Dispatch<React.SetStateAction<PresetButton[]>>;
    originalPresetButtons:PresetButton[];
    setOriginalPresetButtons:React.Dispatch<React.SetStateAction<PresetButton[]>>;
    placeholderText:string;
    setPlaceholderText:React.Dispatch<React.SetStateAction<string>>;
    chatModule:ChatModule;
    chatModules:ChatModule[];
    setChatModule:React.Dispatch<React.SetStateAction<ChatModule>>;
    addChatModule:()=>Promise<boolean>;
    setChatModuleFromId:(chatModuleId:string)=>void;
    initChatModuleInfo:()=>void;
    updateChatModuleWithId:(_id:string)=>Promise<boolean>;
    notifyEmptyPresetButtonText:()=>void;
    moduleIndex:string;
    deleteChatModuleWithId:(chatModuleId:string)=>void;
    notifyExceedMaxNumberButtons:()=>void;
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
        throw new Error("useSidebar must be used within a SidebarProvider")
    }
    return context
}


export default ChatModuleProvider