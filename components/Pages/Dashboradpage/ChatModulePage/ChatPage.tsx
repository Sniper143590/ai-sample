
import { useEffect, useRef } from "react";
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
            return `${item.replace(/(\*\*)(.*?)(\*\*)/g, '<strong>$2</strong>')}`;
          }
        }).join('');
      
        // 3. Construct the complete <ul> list:
        const formattedResponse = `${listItems}`;
      
        // No need to split by ** again, bolding is already done
        // const secondItems = formattedResponse.split('**');
      
        return formattedResponse;
      };
      const chatContainerRef = useRef<HTMLDivElement>(null);

      useEffect(() => {
        // Function to scroll to the bottom of the chat container
        const scrollToAlignTop = () => {
            if (chatContainerRef.current) {
              const lastQuestionElement = chatContainerRef.current.querySelector(
                ".question-container" // Assuming you have a class for Question elements
              ) as HTMLElement;
      
              if (lastQuestionElement) {
                const distanceToTop =
                  lastQuestionElement.offsetTop - chatContainerRef.current.offsetTop;
                chatContainerRef.current.scrollTop = distanceToTop;
              }
            }
          };
      
          // Call scrollToAlignTop after the chat updates
          scrollToAlignTop();
      }, [queries]);

    return (
        <>
            <Chat title={chatModule.name} chatContainerRef={chatContainerRef}>
                {queries.map((item, index) => (
                    <div key={index}>
                        <Question content={item.query} time={item.time} />
                        {results[index]?(
                            <Answer response={results[index]}  isLast={index===(queries.length-1)}><div key={index}  dangerouslySetInnerHTML={{ __html: (formatText(results[index])) }}/></Answer>
                        ):
                        (
                            <Answer loading isLast={index===(queries.length-1)}/>
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