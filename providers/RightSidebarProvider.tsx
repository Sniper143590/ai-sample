import React, { createContext, useContext, useMemo, ReactNode  } from 'react'
import useRightSidebar from '@/hooks/useRightSidebar'

const SidebarContext = createContext<{
    moduleIndex: number;
    llm: string;
    loading:boolean;
    setLlm: React.Dispatch<React.SetStateAction<string>>;
    promptContext: string;
    setPromptContext: React.Dispatch<React.SetStateAction<string>>;
    presetButtons: any;
    setPresetButtons: React.Dispatch<React.SetStateAction<any>>;
    placeholderText: string;
    setPlaceholderText: React.Dispatch<React.SetStateAction<string>>;
    notifyEmptyPresetButtonText:() => void;
    updatePromptContextFunc:()=> void;
    updatePresetButtonsFunc:()=> void;
    updatePlaceholderTextFunc:()=> void;
    onCancel:()=> void;
    
} | null>(null)

type SidebarProviderProps = {
    children: ReactNode
}
const RightSidebarProvider = ({children}:SidebarProviderProps) => {
    const sidebarData = useRightSidebar()

    const value = useMemo(
        () => ({
            ...sidebarData,
        }),
        [sidebarData],
    )

    return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
}

export const useSidebar = () => {
    const context = useContext(SidebarContext)
    if (!context) {
        throw new Error("useSidebar must be used within a SidebarProvider")
    }
    return context
}

export default RightSidebarProvider