import Chat from "@/components/Chat";
import Message from "@/components/Message";
import Question from "@/components/Question";
import Answer from "@/components/Answer";
import { useChat } from "@/providers/ChatModuleProvider";

const ChatPage = () => {
    const { queries, results, getResponseFunc, placeholderText, moduleIndex, chatModule } = useChat()

    return (
        <>
            <div className="">

            </div>
            <Chat title={chatModule.name}>
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
                placeholder={chatModule.placeholder_text}
                handleSendButtonClick={getResponseFunc}
            />
        </>
    )
}

export default ChatPage