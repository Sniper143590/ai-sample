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
        const listItems = items.map(item => {
          if (item.trim() === '') {
            // If the item is empty (after trimming whitespace), return a line break
            return '<br>';
          } else {
            // Otherwise, return the regular <li> element
            // Use replace to bold text within ** **
            return `<li>${item.replace(/(\*\*)(.*?)(\*\*)/g, '<strong>$2</strong>')}</li>`;
          }
        }).join('');
      
        // 3. Construct the complete <ul> list:
        const formattedResponse = `<ul>\n${listItems}\n</ul>`;
      
        // No need to split by ** again, bolding is already done
        // const secondItems = formattedResponse.split('**');
      
        return formattedResponse;
      };

    return (
        <>
            <Chat title={chatModule.name}>
                {queries.map((item, index) => (
                    <div key={index}>
                        <Question content={item.query} time={item.time} />
                        {results[index]?(
                            <Answer response={results[index]}><div key={index}  dangerouslySetInnerHTML={{ __html: formatText(results[index]) }} /></Answer>
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