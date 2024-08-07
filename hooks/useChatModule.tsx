import { useEffect, useState} from "react"
import getResponseFromLlm from "@/lib/getResponseFromLlm"
import refreshPresetButtonText from "@/lib/refreshPresetButtonText";
import Notify from "@/components/Notify";
import { toast } from "react-hot-toast";
import { PresetButton } from "@/constants/types";
import { ChatModule } from "@/constants/types";
import { v4 as uuidv4 } from 'uuid';
import { addNewChatModule, getChatModules, updateChatModule, deleteChatModuleById } from "@/lib/firebase/chatModuleHandler";
import { uploadImage } from "@/lib/firebase/storageHandler";
import imageCompression from 'browser-image-compression';
import React from "react";
import { usePathname } from "next/navigation";

const useChatModule = () => {
    const [query, setQuery] = useState("")
    const [result, setResult] = useState("")
    const [isScrolled, setIsScrolled] = useState(false)
    const pathname =  usePathname()
    const [isProgress, setIsProgress] = useState(false)
    const [loaded, setLoaded] = useState(false)
    // const [ reader, setReader ] = useState<ReadableStreamDefaultReader<Uint8Array>|undefined>()
    const [isReceived, setIsReceived] = useState(false)
    const [prePromptLoading, setPrePromptLoading] = useState(false)
    const [queries, setQueries] = useState<{query:string, time:string}[]>([])
    const [conversations, setConversations] = useState<{query:string, answer:string}[]>([])
    const [results, setResults] = useState<string[]>([])
    const [loading, setLoading] = useState(false)
    const [moduleIndex, setModuleIndex] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [avatar, setAvatar] = useState<File | null>(null);
    const [avatarUrl, setAvatarUrl] = useState("");
    const [isBottom, setIsBottom] = useState(true);
    const [llm, setLlm] = useState("");
    const [role, setRole] = useState("");
    const [prePrompts, setPrePrompts] = useState<PresetButton[]>([])
    const [presetButtons, setPresetButtons] = useState<PresetButton[]>([])
    const [originalPresetButtons, setOriginalPresetButtons] = useState<PresetButton[]>([]);
    const [placeholderText, setPlaceholderText] = useState<string>("")
    const [actions, setActions] = useState<{id:number, prompt:string}[]>([])
    const [presetButtonPrompt, setPresetButtonPrompt] = useState("")
    const [chatSession, setChatSession] = useState("")
    const [chatModule, setChatModule] = useState<ChatModule>({_id:"", name:"",llm_name:"", prompt_context:"", placeholder_text:"",actions:[], presetButtonPrompt:"", avatar:"", preset_buttons:[]} as ChatModule);
    const [chatModules, setChatModules] = useState<ChatModule[]>([]);

    const { startOperation, cancelOperation } = getResponseFromLlm();

    useEffect(() => {
        const fetchChatModules = async () => {
            setLoading(true)
            const pathSegments = pathname.split('/');
            const lastSegment = pathSegments[pathSegments.length - 1];
            
            setLoaded(false)
    
            const result = await getChatModules();
            // Store the fetched data along with a timestamp for expiration check
            // localStorage.setItem('chatModules', JSON.stringify({ data: result, timestamp: new Date().getTime() }));
            setChatModules(result);
            setIsScrolled(false);
           
            const chatModuleWithId = result.find(module => module._id === lastSegment);
            if (chatModuleWithId){
                setChatSession(uuidv4())
                console.log(chatModuleWithId)
                setModuleIndex(lastSegment)
                setChatModule(chatModuleWithId)
                setPresetButtons(chatModuleWithId.preset_buttons)
                setPrePrompts(chatModuleWithId.preset_buttons)
                setActions(chatModuleWithId.actions)
                setPresetButtonPrompt(chatModuleWithId.presetButtonPrompt)
                setIsBottom(true)

                // console.log(chatModuleWithId.preset_buttons)
            }
            setLoading(false)
            cancelGeneration()
            setResults([])
            setQueries([])
        };

        fetchChatModules()
    }, [pathname]);
    
    useEffect(() => {
        console.log(result)
    }, [result])
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

    const setChatModuleFromId = (chatModuleId:string) => {
        const chatModuleWithId = chatModules.find(module => module._id === chatModuleId);
        // console.log(chatModuleWithId)

        if (chatModuleWithId) {
            setLoaded(false)
            setChatModule(chatModuleWithId)
            setName(chatModuleWithId.name)
            setLlm(chatModuleWithId.llm_name)
            setAvatar(null)
            setActions(chatModuleWithId.actions)
            setPresetButtonPrompt(chatModuleWithId.presetButtonPrompt)
            setAvatarUrl(chatModuleWithId.avatar)
            setPlaceholderText(chatModuleWithId.placeholder_text)
            setPresetButtons(chatModuleWithId.preset_buttons)
            setRole(chatModuleWithId.prompt_context)
            setIsScrolled(false)
            setIsBottom(true)
            // setPrePrompts(chatModuleWithId.preset_buttons)
        }
    }

    const selectChatModuleFromId = (id:string) => {
        const chatModuleWithId = chatModules.find(module => module._id === id);
        if(chatModuleWithId)
        {
            setChatModule(chatModuleWithId)
            setActions(chatModuleWithId.actions)
            setPresetButtonPrompt(chatModuleWithId.presetButtonPrompt)
            // setPresetButtons(chatModuleWithId.preset_buttons)
            setQueries([])
            setResults([])
            setConversations([])
            setPrePrompts(chatModuleWithId.preset_buttons)
        }
    }

    const compressImage = async (imageFile:File) => {
        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1024,
            useWebWorker: true
        };
        try {
            const compressedFile = await imageCompression(imageFile, options);
            return compressedFile;
        } catch (error) {
            console.error("Error compressing image:", error);
            throw error
        }
    }

    const isAddListInputValid = () => {
        if (!name) {
            toast(() => (
                <Notify iconClose>
                    <div className="mr-6 ml-3 h6 ml-4">Name is required!</div>
                </Notify>
              ));
            return false
        }
        if (!llm) {
            toast(() => (
                <Notify iconClose>
                    <div className="mr-6 ml-3 h6 ml-4">Model is required!</div>
                </Notify>
              ));
            return false
        }
        if (!placeholderText) {
            toast(() => (
                <Notify iconClose>
                    <div className="mr-6 ml-3 h6 ml-4">Placeholder is required!</div>
                </Notify>
              ));
            return false
        }
        if (!role) {
            toast(() => (
                <Notify iconClose>
                    <div className="mr-6 ml-3 h6 ml-4">Role is required!</div>
                </Notify>
              ));
            return false
        }
        return true
    }

    const notifyEmptyPresetButtonText =() => {
        toast(() => (
            <Notify iconClose>
                <div className="mr-6 ml-3 h6 ml-4">The field is required!</div>
            </Notify>
          ));
    }

    const notifyExceedMaxNumberButtons =() => {
        toast(() => (
            <Notify iconClose>
                <div className="mr-6 ml-3 h6 ml-4">You can have a maximum of 6 items for a chat module!</div>
            </Notify>
          ));
    }

    const deleteChatModuleWithId = async (chatModuleId:string) => {
        toast((t) => (
            <Notify
                className="md:flex-col md:items-center md:px-10"
                iconDelete
            >
                <div className="ml-3 mr-6 h6 md:mx-0 md:my-2">
                    Do you really want to delete?
                </div>
                <div className="flex justify-center">
                    <button
                        className="btn-stroke-light btn-medium md:min-w-[6rem]"
                        onClick={() =>{
                                toast.dismiss(t.id)
                                return;
                            }
                        }
                    >
                        Cancel
                    </button>
                    <button
                        className="btn-blue btn-medium ml-3 md:min-w-[6rem]"
                        onClick={() =>{
                                toast.dismiss(t.id)
                                deleteChatModuleFromId(chatModuleId)
                            } 
                        }
                    >
                        Yes
                    </button>
                </div>
            </Notify>
        ))
        
    }

    const deleteChatModuleFromId = async (id:string) => {
        const result = await deleteChatModuleById(id)
        if (result) {
            toast(() => (
                <Notify iconCheck>
                    <div className="mr-6 ml-3 h6 ml-4">Successfully deleted!</div>
                </Notify>
              ));
            setChatModules(currentChatModules =>
                currentChatModules.filter(chatModule => chatModule._id !== id)
            );
        } else {
            toast(() => (
                <Notify iconClose>
                    <div className="mr-6 ml-3 h6 ml-4">Failed to delete!</div>
                </Notify>
              ));
        }
    }
    
    const initChatModuleInfo = () => {
        setName("")
        setAvatar(null)
        setAvatarUrl("")
        setLlm("")
        setActions([])
        setPresetButtonPrompt("")
        setRole("")
        setPlaceholderText("")
        setPresetButtons([])
    }

    useEffect(()=>{
        console.log("Changed")
    }, [isProgress])

    const updateChatModuleWithId =  async (_id:string) => {
        if (!isAddListInputValid()) return false
        setLoading(true)
        let url;
        try {
            if (avatar) {
                const compressedImage = await compressImage(avatar)
                url = await uploadImage(compressedImage, _id)
                if (url==="error") {
                    setLoading(false)
                    toast(() => (
                        <Notify iconClose>
                            <div className="mr-6 ml-3 h6 ml-4">Invalid File Format!</div>
                        </Notify>
                    ));
                    return false
                } else {
                    setAvatarUrl(url)
                }
            } else {
                url = avatarUrl
            }
        } catch (error) {
            console.log(error)
            toast(() => (
                <Notify iconClose>
                    <div className="mr-6 ml-3 h6 ml-4">Invalide File Format!</div>
                </Notify>
            ));
            setLoading(false)
            return false
        }
        const updatedChatModule = {
            _id:_id,
            name:name,
            avatar:url,
            llm_name:llm,
            actions:actions,
            presetButtonPrompt:presetButtonPrompt,
            placeholder_text:placeholderText,
            preset_buttons:presetButtons,
            prompt_context:role
        } as ChatModule;

        const result = await updateChatModule(_id, updatedChatModule)

        setLoading(false)
        if ( result ) {
            setChatModules(currentChatModules =>
                currentChatModules.map(chatModule =>
                    chatModule._id === updatedChatModule._id ? updatedChatModule : chatModule
                )
            );
            const pathSegments = pathname.split('/');
            const lastSegment = pathSegments[pathSegments.length - 1];
            if(chatModule._id===lastSegment){
                setChatModule(updatedChatModule)
            }
            if(!loaded&&moduleIndex===_id) {
                setPrePrompts(presetButtons)
            }
            toast(() => (
                <Notify iconCheck>
                    <div className="mr-6 ml-3 h6 ml-4">Successfully updated!</div>
                </Notify>
            ));
            
            return true

        } else {
            toast(() => (
                <Notify iconClose>
                    <div className="mr-6 ml-3 h6 ml-4">Failed to update!</div>
                </Notify>
            ));
            return false
        }


    }

    const addChatModule = async () =>{
        if (!isAddListInputValid()) return false
        setLoading(true)
        const _id = uuidv4()
        let url = ""
        try {
            if (avatar) {
                const compressedImage = await compressImage(avatar)
                url = await uploadImage(compressedImage, _id)
                if (url==="error") {
                    toast(() => (
                        <Notify iconClose>
                            <div className="mr-6 ml-3 h6 ml-4">Invalid File Format!</div>
                        </Notify>
                    ));
                    return false
                } else {
                    setAvatarUrl(url)
                }
            }
        } catch (error) {
            console.log(error)
            toast(() => (
                <Notify iconClose>
                    <div className="mr-6 ml-3 h6 ml-4">Invalide File Format!</div>
                </Notify>
            ));
            setLoading(false)
            return false
        }
        const newChatModule = {
            _id:_id,
            name:name,
            llm_name:llm,
            avatar:url,
            actions:actions,
            presetButtonPrompt:presetButtonPrompt,
            placeholder_text:placeholderText,
            preset_buttons:presetButtons,
            prompt_context:role
        } as ChatModule;
        const res = await addNewChatModule(newChatModule);
        setLoading(false)
        if ( res ) {
            toast(() => (
                <Notify iconCheck>
                    <div className="mr-6 ml-3 h6 ml-4">Successfully saved!</div>
                </Notify>
              ));
            initChatModuleInfo()
            setChatModules(prev=>[...prev, newChatModule])
            return true

        } else {
            toast(() => (
                <Notify iconClose>
                    <div className="mr-6 ml-3 h6 ml-4">Failed to save!</div>
                </Notify>
            ));
            return false
        }
    }

    const getResponseFunc = async (item?:PresetButton) => {
            // console.log(query)
            setIsScrolled(false)
            setIsBottom(false)
            setQueries(prev=>[...prev, {query:item?item.text:query, time:getCurrentTime()}])
            setConversations(prev=>[...prev, {query:item?item.prompt:query, answer:""}])
            const numberOfQueries = queries.length;
            try{
                setQuery("")
                const lastThreeConversations = conversations.slice(-3);
                setIsReceived(false)
                await startOperation(setPrePromptLoading, item?item.prompt:query, setResults, setPrePrompts,  numberOfQueries, setLoading, setIsProgress,  chatModule.llm_name.toLowerCase(), chatModule.prompt_context, lastThreeConversations, presetButtonPrompt, chatSession);
                setLoaded(true)
                // setLoading(false)
                console.log(results)
            } catch {
                // setConversations(prev=>[...prev, {query:item?item.prompt:query, answer:"Network Error"}])
                setResults(prev=>[...prev, "Backend Error"])
                setLoaded(true)
            }
            setQuery("")
    }

    const cancelGeneration = () => {
         cancelOperation(setPrePromptLoading, setLoading, setIsProgress)
    }

    const refreshPresetPrompts = async () => {
        try {
            if(queries.length<1){
                toast(() => (
                    <Notify iconClose>
                        <div className="mr-6 ml-3 h6 ml-4">Please ask anything first!</div>
                    </Notify>
                  ));
                return
            }
            // setLoading(true)
            setPrePromptLoading(true)
            console.log(results[results.length-1])
            console.log(chatModule.presetButtonPrompt)
            const result = await refreshPresetButtonText( chatModule.presetButtonPrompt, results[queries.length-1])
            let preprompts = result.preprompts
            const updatedPrePrompts = preprompts.map((item:string, index:number)=>
                {
                    return { _id:index, text: item, prompt: item };
                }
            );
            // console.log(updatedPrePrompts)
            setPrePrompts(updatedPrePrompts)
            // setLoading(false)
            setPrePromptLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
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
        prePromptLoading,
        setPrePromptLoading,
        queries,
        results,
        name,
        setName,
        avatar,
        setAvatar,
        llm, 
        avatarUrl,
        setAvatarUrl,
        setLlm,
        role,
        setRole,
        prePrompts,
        setPrePrompts,
        presetButtons,
        setPresetButtons,
        placeholderText,
        setPlaceholderText,
        chatModule,
        setChatModule,
        originalPresetButtons,
        setOriginalPresetButtons,
        getResponseFunc,
        notifyEmptyPresetButtonText,
        cancelGeneration,
        addChatModule,
        chatModules,
        setChatModuleFromId,
        initChatModuleInfo,
        updateChatModuleWithId,
        moduleIndex,
        deleteChatModuleWithId,
        notifyExceedMaxNumberButtons,
        loaded,
        selectChatModuleFromId,
        actions,
        setActions,
        presetButtonPrompt,
        setPresetButtonPrompt,
        refreshPresetPrompts,
        conversations,
        setConversations,
        setResults,
        isProgress,
        setIsProgress,
        isScrolled,
        setIsScrolled,
        isBottom,
        setIsBottom,
    }
}

export default useChatModule
