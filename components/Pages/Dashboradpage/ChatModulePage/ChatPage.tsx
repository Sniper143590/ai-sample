import Chat from "@/components/Chat";
import Message from "@/components/Message";
import Question from "@/components/Question";
import Answer from "@/components/Answer";
import { useChat } from "@/providers/ChatModuleProvider";



const ChatPage = () => {
    const { queries, results, getResponseFunc, chatModule } = useChat()
    const formatText = (text: string): string => {
        // 1. Split the text into lines:
        const items = text.split('\n'); 
      
        // 2. Map each item to an <li> element:
        const listItems = items.map(item => `<li>${item}</li>`).join(''); 
      
        // 3. Construct the complete <ul> list:
        const formattedResponse = `<ul>\n${listItems}\n</ul>`;
        
        return formattedResponse;
      };

    return (
        <>
            <Chat title={chatModule.name}>
                {queries.map((item, index) => (
                    <div key={index}>
                        <Question content={item.query} time={item.time} />
                        {results[index]?(
                            <Answer><div key={index} dangerouslySetInnerHTML={{ __html: formatText(results[index]) }} /> </Answer>
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