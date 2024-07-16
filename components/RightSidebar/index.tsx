import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { llms } from "@/constants/llms";
import PromptContextModal from "@/components/PromptContextModal";
import { useSidebar } from "@/providers/RightSidebarProvider";
import Select from "../Select";
import PresetButtonsModal from "../PresetButtonsModal";
import PlaceholderTextModal from "../PlaceholderTextModal";


type RightSidebarProps = {
    className?: string;
    visible?: boolean;
};

const RightSidebar = ({ className, visible }: RightSidebarProps) => {
    const { presetButtons, setPresetButtons, placeholderText, setPlaceholderText, updatePromptContextFunc, updatePresetButtonsFunc, updatePlaceholderTextFunc, onCancel} = useSidebar()
    const { llm, setLlm, promptContext, setPromptContext } = useSidebar()
    const [visiblePromptModal, setVisiblePromptModal] = useState<boolean>(false);
    const [visiblePresetButtonsModal, setVisiblePresetButtonsModal] = useState<boolean>(false);
    const [visiblePlaceholderTextModal, setVisiblePlaceholderTextModal] = useState<boolean>(false);
    
    return (
        <>
            <div
                className={twMerge(
                    `absolute top-0 right-0 bottom-0 flex flex-col w-[22.5rem] pt-[8rem] pb-24 bg-n-1 rounded-r-[1.25rem] border-l border-n-3 shadow-[inset_0_1.5rem_3.75rem_rgba(0,0,0,0.1)] 2xl:w-80 lg:rounded-[1.25rem] lg:invisible lg:opacity-0 lg:transition-opacity lg:z-20 lg:border-l-0 lg:shadow-2xl md:fixed md:w-[calc(100%-4rem)] md:border-l md:rounded-none dark:bg-n-6 dark:border-n-5 ${
                        visible && "lg:visible lg:opacity-100"
                    } ${className}`
                )}
                >
                <div className="flex flex-col absolute top-24 left-0 right-0 flex items-center px-9 md:px-6 gap-10">
                    <Select
                        className="w-[10.31rem] w-full md:mr-0"
                        classButton="h-11 rounded-full border-n-4 shadow-[inset_0_0_0_0.0625rem_#DADBDC] caption1 dark:shadow-[inset_0_0_0_0.0625rem_#2A2E2F] dark:bg-transparent"
                        classOptions="min-w-full"
                        classIcon="w-5 h-5 fill-n-4/50"
                        classArrow="dark:fill-n-4"
                        placeholder="Select an LLM"
                        items={llms}
                        value={llm}
                        onChange={setLlm}
                    />
                    <button className="btn-stroke-dark text-n-4 w-full" onClick={() => setVisiblePromptModal(true)} > Prompt Context</button>
                    <button className="btn-stroke-dark text-n-4 w-full" onClick={() => setVisiblePresetButtonsModal(true)}> Preset Buttons</button>
                    <button className="btn-stroke-dark text-n-4 w-full" onClick={() => setVisiblePlaceholderTextModal(true)}> Placeholder text</button>
                </div>
            </div>
            <PromptContextModal
                visible={visiblePromptModal}
                value={promptContext}
                onChange={setPromptContext}
                onClose={() => setVisiblePromptModal(false)}
                updatePromptContextFunc={updatePromptContextFunc}
                onCancel={onCancel}
            />
            <PresetButtonsModal
                visible={visiblePresetButtonsModal}
                value={presetButtons}
                onChange={setPresetButtons}
                onClose={() => setVisiblePresetButtonsModal(false)}
                updatePresetButtonsFunc={updatePresetButtonsFunc}
                onCancel={onCancel}
            />
            <PlaceholderTextModal
                visible={visiblePlaceholderTextModal}
                value={placeholderText}
                onChange={setPlaceholderText}
                onClose={() => setVisiblePlaceholderTextModal(false)}
                updatePlaceholderTextFunc={updatePlaceholderTextFunc}
                onCancel={onCancel}
            />
        </>
    );
};

export default RightSidebar;
