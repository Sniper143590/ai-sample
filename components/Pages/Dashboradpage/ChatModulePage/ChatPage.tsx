
import { useEffect, useRef } from "react";
import Chat from "@/components/Chat";
import Message from "@/components/Message";
import Question from "@/components/Question";
import Answer from "@/components/Answer";
import { useChat } from "@/providers/ChatModuleProvider";
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'


const ChatPage = () => {
    const { isScrolled, setIsScrolled, queries, results, getResponseFunc, chatModule } = useChat()
    const chatContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        console.log(isScrolled)

        // Check if manual scrolling is active
        if (isScrolled) {
          return; // Stop execution if manually scrolled
        }
        
          // Function to scroll to the bottom of the chat container
          const scrollToAlignTop = () => {
            if (chatContainerRef.current) {
              const lastQuestionElement = chatContainerRef.current.querySelector(
                ".question-container" // Assuming you have a class for Question elements
              ) as HTMLElement;
      
              if (lastQuestionElement) {
                
                // Calculate the distance to the top of the last question element
                const distanceToTop =
                  lastQuestionElement.offsetTop - chatContainerRef.current.offsetTop;
                 
                  // Update the scroll position 
                  chatContainerRef.current.scrollTop = distanceToTop;
              }
            }
          };
        scrollToAlignTop()
      },[queries, results]); // Empty dependency array so it runs only once on mount

      const onScrollHandle = () => {
        setIsScrolled(true)
        console.log("Wheel------")
      }

    return (
        <>
            <Chat title={chatModule.name} chatContainerRef={chatContainerRef} onScroll = {onScrollHandle}>
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