import { useState } from "react"
import Field from "../Field"
import { PresetButton } from "@/constants/types"
import { useChat } from "@/providers/ChatModuleProvider"

interface TableProps {
    presetButtons: PresetButton[],
    onChange: (e:any) =>void,
}
const Table = ({presetButtons, onChange}:TableProps) => {
    const { notifyEmptyPresetButtonText } = useChat()
    const [newRow, setNewRow] = useState({
        _id: -1,
        text: "",
        prompt: ""
    })
    const handleTextChange = (value: string, index:number) => {
        if(index ===-1){
            setNewRow(prevState => ({
                ...prevState,
                text: value
            }));
        } else {
            const updatedButtons = presetButtons.map(button => {
                if (button._id === index) {
                    return { ...button, text: value };
                }
                return button;
            });
            onChange(updatedButtons)
        }
    };

    const handlePromptChange = (value:string, index:number) => {
        if(index===-1){
            setNewRow(prevState =>({
                ...prevState,
                prompt:value
            }))
        } else {
            const updatedButtons = presetButtons.map(button => {
                if (button._id === index) {
                    return { ...button, prompt: value };
                }
                return button;
            });
            onChange(updatedButtons)
        }


    }

    const handleAddRow = () => {
        if(newRow.text===""){
            notifyEmptyPresetButtonText()
            return
        }
        onChange([...presetButtons, {_id:presetButtons.length, text:newRow.text, prompt:newRow.prompt}]);
        setNewRow({
            _id: -1,
            text: "",
            prompt: ""
        });
    }

    const handleDeleteRow = (index:number) => {
        const updatedButtons = [...presetButtons];

        // Filter out the row with the matching index
        updatedButtons.splice(index, 1);
        // Call the onChange prop with the updated array
        onChange(updatedButtons);

    }

    return (
        <div className="flex flex-col">
            <div className="sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="overflow-y-auto h-[200px]">
                    <table
                    className="min-w-full text-left text-sm font-light text-surface dark:text-white ">
                    <thead
                        className="border-b border-neutral-200 font-medium dark:border-white/10">
                        <tr>
                            <th scope="col" className="px-6 py-4">#</th>
                            <th scope="col" className="px-6 py-4 whitespace-nowrap">Text</th>
                            <th scope="col" className="px-6 py-4 whitespace-nowrap">Prompt</th>
                        </tr>
                    </thead>
                    <tbody className="overflow-auto">
                        <tr>
                            <td className="whitespace-nowrap px-6 py-1 font-medium">#</td>
                            <td className="whitespace-nowrap px-6 py-1 w-[400px] sm:w-[200px]">
                                <Field
                                    className="w-26"
                                    label=""
                                    placeholder=""
                                    icon=""
                                    value={newRow.text}
                                    onChange={(e: any) => handleTextChange(e.target.value, newRow._id)}
                                    required
                                />
                            </td>
                            <td className="whitespace-nowrap px-6 py-1 w-[400px] sm:w-[200px]">
                                <Field
                                    className=""
                                    label=""
                                    placeholder=""
                                    icon=""
                                    value={newRow.prompt}
                                    onChange={(e: any) => handlePromptChange(e.target.value, newRow._id)}
                                    required
                                />
                            </td>
                            <td className="whitespace-nowrap px-6 py-1 ">
                                <button className="btn-stroke-light mr-3 w-[80px]" onClick={handleAddRow}>
                                    Add
                                </button>
                            </td>
                        </tr>
                        {presetButtons.map((item, index) => (
                            <tr className="border-b border-neutral-200 dark:border-white/10" key={index}>
                                <td className="whitespace-nowrap px-6 py-1 font-medium">{index+1}</td>
                                <td className="whitespace-nowrap px-6 py-1">
                                    <Field
                                        className=""
                                        label=""
                                        placeholder=""
                                        icon=""
                                        value={item.text}
                                        onChange={(e: any) => handleTextChange(e.target.value, item._id)}
                                        required
                                    />
                                </td>
                                <td className="whitespace-nowrap px-6 py-1">
                                    <Field
                                        className=""
                                        label=""
                                        placeholder=""
                                        icon=""
                                        value={item.prompt}
                                        onChange={(e: any) => handlePromptChange(e.target.value, item._id)}
                                        required
                                    />
                                </td>
                                <td className="whitespace-nowrap px-6 py-1">
                                    <button className="btn-stroke-light mr-3 w-[80px]" onClick={()=>handleDeleteRow(index)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
                </div>
            </div>
        </div>
    )
}

export default Table