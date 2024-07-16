import { useRef} from "react";
import { toast } from "react-hot-toast";
import Modal from "@/components/Modal";
import Notify from "@/components/Notify";
import Table from "../Table";
import { PresetButton } from "@/constants/types";

type PresetButtonsModalProps = {
    visible: boolean;
    value: PresetButton[],
    onChange: (e:any) => void;
    onClose: () => void;
    updatePresetButtonsFunc: ()=>void;
    onCancel:()=>void;
};

const PresetButtonsModal = ({ visible, value, onChange, onClose, updatePresetButtonsFunc, onCancel}: PresetButtonsModalProps) => {

    let copyButtonRef = useRef(null);

    const handlePresetButtonsSaveButton = async () => {
        try {
            await updatePresetButtonsFunc()
            toast(() => (
                <Notify iconCheck>
                    <div className="ml-3 h6">Saved!</div>
                </Notify>
            ));
            onClose()
        } catch (error) {
            toast(() => (
                <Notify iconClose>
                    <div className="ml-3 h6">Failed to save!</div>
                </Notify>
            ));
        }
        
    }

    const handleCancelButtonClick = () => {
        onCancel()
        onClose()
    }

    return (
        <Modal
            classWrap="max-w-[80rem]"
            classButtonClose="absolute top-6 right-6 w-10 h-10 rounded-full bg-n-2 md:top-5 md:right-5 dark:bg-n-4/25 dark:fill-n-4 dark:hover:fill-n-1"
            visible={visible}
            onClose={onClose}
            initialFocus={copyButtonRef}
            >
            <div
                className="p-12 md:p-5"
            >
                <div className="mb-2 h6">Preset Button Prompts</div>
                <Table presetButtons={value} onChange={onChange}/> 
                <div className="flex justify-end">
                    <button className="btn-stroke-light mr-3" onClick={handleCancelButtonClick}>
                        Cancel
                    </button>
                    <button className="btn-blue" onClick={handlePresetButtonsSaveButton}>Save</button>
                </div>
            </div>
        </Modal>
    );
};

export default PresetButtonsModal;


