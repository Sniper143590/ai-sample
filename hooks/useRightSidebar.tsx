import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import getChatModuleInfo from "@/lib/firebase/getChatModuleInfo"
import Notify from "@/components/Notify";
import { toast } from "react-hot-toast";
import updatePromptContext from "@/lib/firebase/updatePromptContext";
import updatePresetButtons from "@/lib/firebase/updatePresetButtons";
import updatePlaceholderText from "@/lib/firebase/updatePlaceholderText";
import { useChat } from "@/providers/ChatModuleProvider";
import { PresetButton } from "@/constants/types";

interface ChatModuleData {
    id: string;
    name:string;
    _id:number;
    prompt_context: string;
    preset_buttons: {
        _id: number;
        text: string;
        prompt: string;
    }[];
    placeholder_text: string;
}


const useRightSidebar = () => {
    const pathname = usePathname();
    const parts = pathname.split('/');
    const [moduleIndex, setModuleIndex] = useState<number>(-1);
    const [llm, setLlm] = useState<string>("gpt-3.5-turbo-1106")
    const [promptContext, setPromptContext] = useState<string>("")
    const [prePromptContext, setPrePromptContext] = useState<string>("")
    const [presetButtons, setPresetButtons] = useState<PresetButton[]>([])
    const [originalPresetButtons, setOriginalPresetButtons] = useState<{
        _id: number;
        text: string;
        prompt: string;
    }[]>([]);
    const [placeholderText, setPlaceholderText] = useState<string>("")
    const [prePlaceholderText, setPrePlaceholderText] = useState<string>("")
    const [prevPathname, setPrevPathname] = useState("");
    const [loading, setLoading] = useState(false)

    const {prePrompts, setPrePrompts} = useChat()

    const notifyEmptyPresetButtonText =() => {
        toast(() => (
            <Notify iconClose>
                <div className="mr-6 ml-3 h6 ml-4">Preset Button Text is required!</div>
            </Notify>
          ));
    }

    const updatePromptContextFunc = async () => {
        try{
            if( moduleIndex === -1) return
            await updatePromptContext(moduleIndex, promptContext)
            setPrePromptContext(promptContext)
        } catch (error) {
            onCancel()
            console.log(error)
            throw error;
        }
    }

    const updatePresetButtonsFunc = async () => {
        try {
            if (moduleIndex === -1) return
            await updatePresetButtons(moduleIndex, presetButtons)
            setOriginalPresetButtons(presetButtons)
        } catch (error) {
            onCancel()
            console.log(error)
            throw error;
        }
    }
    const updatePlaceholderTextFunc = async () => {
        try {
            if (moduleIndex === -1) return
            await updatePlaceholderText(moduleIndex, placeholderText)
            setPrePlaceholderText(placeholderText)
        } catch (error) {
            onCancel()
            console.log(error)
            throw error;
        }
    }


    const onCancel = () => {
        setPresetButtons(originalPresetButtons)
        setPlaceholderText(prePlaceholderText)
        setPromptContext(prePromptContext)
    }

    function getRandomPrePrompts(presetBtns:PresetButton[]) {
        const randomIndices: number[] = [];
        while (randomIndices.length < 3) {
            const randomIndex = Math.floor(Math.random() * prePrompts.length);
            if (!randomIndices.includes(randomIndex)) {
                randomIndices.push(randomIndex);
            }
        }
        return randomIndices.map(index => presetBtns[index]);
    }
    
    useEffect(() => {
        const fetchData = async () => {
            console.log(pathname, prevPathname)
            try {
                if (parts.length > 1 && pathname.toString()!==prevPathname.toString()) {
                    setLoading(true)
                    const data: ChatModuleData[] = await getChatModuleInfo(Number(parts[parts.length - 1]));
                    console.log(data)
                    setModuleIndex(Number(parts[parts.length - 1]));
                    const res = data[0]
                    
                    setPromptContext(res.prompt_context);
                    setPrePromptContext(res.prompt_context);
                    setPresetButtons(res.preset_buttons);
                    if(res.preset_buttons.length<3) {
                        setPrePrompts(res.preset_buttons)
                    } else {
                        setPrePrompts(getRandomPrePrompts(res.preset_buttons))
                    }
                    setOriginalPresetButtons(res.preset_buttons);
                    setPlaceholderText(res.placeholder_text);
                    setPrePlaceholderText(res.placeholder_text);
                    setPrevPathname(pathname);
                    setLoading(false)
                }
            } catch (error) {
                console.error("Error fetching chat module info:", error);
            }
        };

        fetchData();
    }, [pathname, prevPathname]);

    return {
        moduleIndex,
        llm,
        setLlm,
        loading,
        promptContext,
        setPromptContext,
        presetButtons,
        setPresetButtons,
        placeholderText,
        setPlaceholderText,
        onCancel,
        notifyEmptyPresetButtonText,
        updatePromptContextFunc,
        updatePresetButtonsFunc,
        updatePlaceholderTextFunc,
        
    }

}

export default useRightSidebar