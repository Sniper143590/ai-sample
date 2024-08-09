import Image from "@/components/Image";
import { useChat } from "@/providers/ChatModuleProvider";
import Loading from "./Loading";
import Action from "./Action";
import Icon from "../Icon";

type AnswerProps = {
    children?: React.ReactNode;
    loading?: boolean;
    response?:string;
    time?: string;
    isLast?:boolean;
};

const Answer = ({ children, loading, time, response, isLast }: AnswerProps) => {
    const { isProgress, cancelGeneration } = useChat()
    // console.log(children)
    const handlePauseGenerating = () =>{
         cancelGeneration()
    }
    return (
        <div className={`max-w-[50rem] mb-5`}>
            <div className="flex flex-col">
                <div className="relative  pt-[1.5rem] px-6 pb-16 space-y-4 bg-n-2 rounded-[1.25rem] md:p-5 md:pb-14 dark:bg-n-7 h2-style h3-style h4-style h5-style h6-style h1-style">
                    {loading ? <Loading /> : (children)} 
                </div>
                <div className="w-full">
                <div className="relative flex items-end pl-6">
                    <div
                        className={`absolute top-0 -translate-y-1/2 shrink-0 w-16 h-16 mr-auto rounded-2xl overflow-hidden ${
                            !loading &&
                            "shadow-[0_0_0_0.25rem_#FEFEFE] dark:shadow-[0_0_0_0.25rem_#232627]"
                        }`}
                        >
                        <Image
                            className="object-cover rounded-2xl"
                            src="/images/avatar-chat.png"
                            fill
                            alt="Avatar"
                        />
                    </div>
                    {!isProgress &&(  
                        <Action response={response}/>
                    )}
                </div>
                </div>
            </div>
            
            
        </div>
    );
};

export default Answer;
