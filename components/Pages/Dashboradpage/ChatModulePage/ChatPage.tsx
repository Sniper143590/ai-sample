
import { useEffect, useRef } from "react";
import Chat from "@/components/Chat";
import Message from "@/components/Message";
import Question from "@/components/Question";
import Answer from "@/components/Answer";
import { useChat } from "@/providers/ChatModuleProvider";
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'


const ChatPage = () => {
    const { loading, isProgress, queries, results, getResponseFunc, chatModule } = useChat()
    
      const chatContainerRef = useRef<HTMLDivElement>(null);

      useEffect(() => {
       
        setTimeout(() => {
        }, 1000); // 3000 milliseconds (3 seconds) delay
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
      }, [queries, results]);

    return (
        <>
            <Chat title={chatModule.name} chatContainerRef={chatContainerRef}>
                {queries.map((item, index) => (
                    <div key={index}>
                        <Question content={item.query} time={item.time} isLast={index===(queries.length-1)}/>
                        {results[index]?(
                            <Answer response={results[index]}  isLast={index===(queries.length-1)}>
                                {/* <div key={index} dangerouslySetInnerHTML={{ __html: formatText(results[index]) }}/> */}
                                <Markdown remarkPlugins={[remarkGfm]}>{results[index]}</Markdown>
                            </Answer>
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