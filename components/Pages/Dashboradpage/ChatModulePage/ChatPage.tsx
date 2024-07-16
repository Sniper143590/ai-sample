import Chat from "@/components/Chat";
import Message from "@/components/Message";
import Question from "@/components/Question";
import Answer from "@/components/Answer";
import { navigation } from "@/constants/navigation";
import { useSidebar } from "@/providers/RightSidebarProvider";
import { PresetButton } from "@/constants/types";
import { useChat } from "@/providers/ChatModuleProvider";

const ChatPage = () => {
    const {placeholderText, moduleIndex} = useSidebar()
    const { queries, results, getResponseFunc } = useChat()

    return (
        <>
            <Chat title={navigation[moduleIndex-1]?.title}>
                {queries.map((item, index) => (
                    <div key={index}>
                        <Question content={item.query} time={item.time} />
                        {results[index]?(
                            <Answer>{results[index]}</Answer>
                        ):
                        (
                            <Answer loading />
                        )}
                    </div>
                ))}
            </Chat>
            <Message
                placeholder={placeholderText}
                handleSendButtonClick={getResponseFunc}
            />
        </>
    )
}

export default ChatPage