import { ChangeEvent } from "react";
import Field from "@/components/Field";
import { llms } from "@/constants/llms";
import Select from "@/components/Select";
import { useChat } from "@/providers/ChatModuleProvider";
import Table from "../Table";
import Image from "../Image";
import Icon from "../Icon";

type AddChatListProps = {
    onCancelFunc: () => void;
    chatModuleId:string;
};

const AddChatList = ({ onCancelFunc, chatModuleId }: AddChatListProps) => {
    
    const { loading, name, setName, setAvatar, avatarUrl, setAvatarUrl, llm, setLlm, role, setRole, presetButtons, setPresetButtons, placeholderText, setPlaceholderText, addChatModule, updateChatModuleWithId} = useChat();

    const handleIconChageClick = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const file = files.item(0)
            setAvatar(file);
            if (file) setAvatarUrl(URL.createObjectURL(file))
        }
    }

    const handleAddClick = async () => {
        if (chatModuleId==="") {
            const result = await addChatModule()
            if(result){
                onCancelFunc()
            }
        } else {
            const result = await updateChatModuleWithId(chatModuleId)
            if(result){
                onCancelFunc()
            }
        }
        
    }

    return (
        <div className="p-2 lg:px-8 md:pt-6 md:px-5 md:pb-6 h-full">
            <div className="flex flex-col gap-5 p-10 w-full">
            <div className="mb-8 h4 w-full">Add chat list</div>
            <div className="flex flex-row">
                <Field
                    className="flex flex-row justify-center items-center gap-10 mr-3 md:mr-0 md:mb-3"
                    label="Name*"
                    placeholder="Name"
                    icon="chat-1"
                    value={name}
                    onChange={(e: any) => setName(e.target.value)}
                    required
                />
            </div>
            <div className="flex flex-row gap-10 items-center ">
                <div className="base2 font-semibold">Avatar </div>
                <div className="relative p-1 flex items-center justify-center bg-primary-1 w-[50px] h-[50px] rounded-[1rem]">
                    <input className="absolute inset-0 z-10 opacity-0" type="file" accept="image/*" onChange={(e)=>handleIconChageClick(e)}/>
                    <div className="w-full h-full  border-n-1 rounded-xl">
                        <div className="flex justify-center items-center mt-1 w-8 h-8 mx-auto bg-n-1 rounded-full">
                            {avatarUrl?(<Image
                                className="object-cover rounded-full"
                                src={avatarUrl}
                                fill
                                alt="Avatar"
                            />):(<Icon name="upload"/>)}
                        </div>
                    </div>  
                </div>                         
            </div>
            <div className="flex flex-row items-center gap-10">
                <div className="base2 font-semibold">Model* </div>
                <Select
                    className="w-[270px] md:mr-0"
                    classButton="h-11 rounded-full border-n-4 shadow-[inset_0_0_0_0.0625rem_#DADBDC] caption1 dark:shadow-[inset_0_0_0_0.0625rem_#2A2E2F] dark:bg-transparent"
                    classOptions="min-w-full"
                    classIcon="w-5 h-5 fill-n-4/50"
                    classArrow="dark:fill-n-4"
                    placeholder="Select an LLM"
                    items={llms}
                    value={llm}
                    onChange={setLlm}
                />
            </div>
            <div className="flex flex-row items-start gap-14">
                <div className="base2 font-semibold">Role*</div>
                <Field
                    className="mb-2 h-[100px] w-full"
                    label=""
                    placeholder="You are a helpful assistant"
                    icon=""
                    value={role}
                    onChange={(e: any) => setRole(e.target.value)}
                    textarea
                    /> 
            </div>
            <div className="flex flex-row gap-3 items-center">
                <div className="base2 font-semibold">Placeholder* </div>
                <input className="w-full h-13 px-3.5 bg-n-2 border-2 border-n-2 rounded-xl base2  text-n-7 outline-none transition-colors placeholder:text-n-4/50 focus:bg-transparent dark:bg-n-6 dark:border-n-6 dark:text-n-3 dark:focus:bg-transparent" value={placeholderText} onChange={(e)=>setPlaceholderText(e.target.value)}/>
            </div>
            <div className="flex flex-col">
                <div className="base2 font-semibold">Preset Buttons</div>
                <Table onChange={setPresetButtons} presetButtons={presetButtons}/>
            </div>
            <div className="flex justify-end">
                <button className="btn-stroke-light mr-3" onClick={onCancelFunc}>
                    Cancel
                </button>
                <button className="btn-blue" onClick={handleAddClick}>{loading?(<div className="inline-block h-8 w-8 animate-spin rounded-full border-t-2 border-b-2 border-current"/>):`Save`}</button>
            </div>
            </div>
            
        </div>
    );
};

export default AddChatList;
