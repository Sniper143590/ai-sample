import { useRef } from "react";
import { toast } from "react-hot-toast";
import Modal from "@/components/Modal";
import Field from "@/components/Field";
import Notify from "@/components/Notify";


type PromptContextModalProps = {
    visible: boolean;
    value:string;
    onChange:(e:string)=> void;
    onClose: () => void;
    updatePromptContextFunc:()=>void;
    onCancel:()=>void;
};

const PromptContextModal = ({ visible, value, onChange, onClose, updatePromptContextFunc, onCancel }: PromptContextModalProps) => {
    
    let copyButtonRef = useRef(null);

    const handlePromptContextSaveButton = async () => {
        try {
            await updatePromptContextFunc()
            toast(() => (
                <Notify iconCheck>
                    <div className="ml-3 h6">Saved!</div>
                </Notify>
            ));
            onClose()
        } catch(error){
            toast(() => (
                <Notify iconClose>
                    <div className="ml-3 h6">Something went wrong!</div>
                </Notify>
            ));
            onClose()
        }
    }

    const handleCancelButtonClick = () => {
        onCancel()
        onClose()
    }

    return (
        <Modal
            classWrap="max-w-[40rem]"
            classButtonClose="absolute top-6 right-6 w-10 h-10 rounded-full bg-n-2 md:top-5 md:right-5 dark:bg-n-4/25 dark:fill-n-4 dark:hover:fill-n-1"
            visible={visible}
            onClose={onClose}
            initialFocus={copyButtonRef}
        >
            <div
                className="p-12 md:p-5"
            >
                <div className="mb-2 h6 text-center">Prompt Context (Instruction, System Role)</div>
                <Field
                    className="mb-2 h-[250px]"
                    label=""
                    placeholder="You are a helpful assistant"
                    icon=""
                    value={value}
                    onChange={(e: any) => onChange(e.target.value)}
                    textarea
                    
                    />   
                <div className="flex justify-end">
                    <button className="btn-stroke-light mr-3" onClick={handleCancelButtonClick}>
                        Cancel
                    </button>
                    <button className="btn-blue" onClick={handlePromptContextSaveButton}>Save</button>
                </div>
            </div>
        </Modal>
    );
};

export default PromptContextModal;


