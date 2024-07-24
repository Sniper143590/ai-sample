import { useState } from "react"
import { useChat } from "@/providers/ChatModuleProvider"
import Field from "@/components/Field"

interface TableProps {
    actions: {id:number, prompt:string}[],
    disabled?:boolean,
    onChange: (e:any) =>void,
}
const ActionTable = ({actions, onChange, disabled = false}:TableProps) => {
    const { notifyEmptyPresetButtonText, notifyExceedMaxNumberButtons } = useChat()
    const [newRow, setNewRow] = useState({
        id: -1,
        prompt: ""
    })
    const handleTextChange = (value: string, index:number) => {
        if(index ===-1){
            setNewRow(prevState => ({
                ...prevState,
                prompt: value
            }));
        } else {
            const updatedButtons = actions.map(button => {
                if (button.id === index) {
                    return { ...button, text: value };
                }
                return button;
            });
            onChange(updatedButtons)
        }
    };

    const handleAddRow = () => {
        if(newRow.prompt===""){
            notifyEmptyPresetButtonText()
            return
        }
        if(actions.length>4){
            notifyExceedMaxNumberButtons()
            return
        }
        onChange([...actions, {id:actions.length, prompt:newRow.prompt}]);
        setNewRow({
            id: -1,
            prompt: ""
        });
    }

    const handleDeleteRow = (index:number) => {
        const updatedActions = [...actions];
        // Filter out the row with the matching index
        updatedActions.splice(index, 1);
        // Call the onChange prop with the updated array
        onChange(updatedActions);
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
                            <th scope="col" className="px-6 py-4 whitespace-nowrap text-center">Prompt</th>
                        </tr>
                    </thead>
                    <tbody className="overflow-auto">
                        <tr>
                            <td className="whitespace-nowrap px-6 py-1 font-medium">#</td>
                            <td className="whitespace-nowrap px-6 py-1 w-[400px] sm:w-[200px]">
                                <Field
                                    className=""
                                    label=""
                                    placeholder=""
                                    icon=""
                                    value={newRow.prompt}
                                    onChange={(e: any) => handleTextChange(e.target.value, newRow.id)}
                                    required
                                    disabled={disabled}
                                />
                            </td>
                            <td className="whitespace-nowrap px-6 py-1 ">
                                <button className="btn-stroke-light mr-3 w-[80px]" onClick={handleAddRow}>
                                    Add
                                </button>
                            </td>
                        </tr>
                        {actions.map((item, index) => (
                            <tr className="border-b border-neutral-200 dark:border-white/10" key={index}>
                                <td className="whitespace-nowrap px-6 py-1 font-medium">{index+1}</td>
                                <td className="whitespace-nowrap px-6 py-1">
                                    <Field
                                        className=""
                                        label=""
                                        placeholder=""
                                        icon=""
                                        value={item.prompt}
                                        onChange={(e: any) => handleTextChange(e.target.value, item.id)}
                                        required
                                        disabled={disabled}
                                    />
                                </td>
                                <td className="whitespace-nowrap px-6 py-1">
                                    <button className="btn-stroke-light mr-3 w-[80px]" onClick={()=>handleDeleteRow(index)} disabled={disabled}>
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

export default ActionTable