import { useRef} from "react";
import { toast } from "react-hot-toast";
import Modal from "@/components/Modal";
import Notify from "@/components/Notify";
import Table from "../Table";
import { PresetButton } from "@/constants/types";

type PresetButtonsModalProps = {
    value: PresetButton[],
    onChange: (e:any) => void;
    updatePresetButtonsFunc: ()=>void;
    onCancel:()=>void;
};

const PresetButtonsModal = ({  value, onChange, updatePresetButtonsFunc, onCancel}: PresetButtonsModalProps) => {

    let copyButtonRef = useRef(null);

    const handlePresetButtonsSaveButton = async () => {
        try {
            await updatePresetButtonsFunc()
            toast(() => (
                <Notify iconCheck>
                    <div className="ml-3 h6">Saved!</div>
                </Notify>
            ));
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
    }

    return (
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
    );
};

export default PresetButtonsModal;


