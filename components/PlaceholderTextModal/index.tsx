import { useRef } from "react";
import { toast } from "react-hot-toast";
import Modal from "@/components/Modal";
import Field from "@/components/Field";
import Notify from "@/components/Notify";


type PlaceholderTextModalProps = {
    visible:boolean;
    value:string;
    onChange: (e:any) => void;
    onClose: () => void;
    updatePlaceholderTextFunc:()=>void;
    onCancel:() => void;
};

const PlaceholderTextModal = ({ visible, value, onChange, onClose, updatePlaceholderTextFunc, onCancel }: PlaceholderTextModalProps) => {
    
    let copyButtonRef = useRef(null);

    const handlePlaceholderTextSaveButton = async () => {
        try {
            await updatePlaceholderTextFunc();
            toast((t) => (
                <Notify iconCheck>
                    <div className="ml-3 h6">Saved!</div>
                </Notify>
            ));
            onClose()
        } catch(error) {
            toast((t) => (
                <Notify iconClose>
                    <div className="ml-3 h6">Failed to save!</div>
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
                <div className="mb-2 h6 text-center">Placeholder of Input box</div>
                <Field
                    className="mb-2 h-[250px]"
                    label=""
                    placeholder="@/command"
                    icon=""
                    value={value as string}
                    onChange={(e: any) => onChange(e.target.value)}
                    textarea
                    
                    />
                <div className="flex justify-end">
                    <button className="btn-stroke-light mr-3" onClick={handleCancelButtonClick}>
                        Cancel
                    </button>
                    <button className="btn-blue" onClick={handlePlaceholderTextSaveButton}>Save</button>
                </div>
            </div>
        </Modal>
    );
};

export default PlaceholderTextModal;
