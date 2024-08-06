
import { useEffect, useRef } from "react";
import Chat from "@/components/Chat";
import Message from "@/components/Message";
import Question from "@/components/Question";
import Answer from "@/components/Answer";
import { useChat } from "@/providers/ChatModuleProvider";
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'


const ChatPage = () => {
    const { isScrolled, isBottom, setIsBottom, setIsScrolled, queries, results, getResponseFunc, chatModule } = useChat()
    const chatContainerRef = useRef<HTMLDivElement>(null);
    let clientHeight:number, scrollHeight:number; 
    useEffect(() => {

        // Check if manual scrolling is active
        
          // Function to scroll to the bottom of the chat container
          const scrollToAlignTop = () => {
            if (isScrolled) {
                console.log("changed____isBottom")
                setIsBottom(false)
                return; // Stop execution if manually scrolled
            }
            if (chatContainerRef.current) {
                clientHeight = chatContainerRef.current.clientHeight;
                scrollHeight = chatContainerRef.current.scrollHeight;
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
          setTimeout(()=>{
            scrollToAlignTop()
          }, 200)
      },[queries, results]); // Empty dependency array so it runs only once on mount

      const onWheelHandle = () => {
        setIsScrolled(true)
      }

      const scrollDown = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
      }

      const handleScroll = () => {
        if (chatContainerRef.current) { // Check if the ref is available
            const chatContainer = chatContainerRef.current;
            const threshold = 200;
            let isAtBottom = chatContainer.scrollTop + chatContainer.clientHeight + threshold > chatContainer.scrollHeight;

              console.log("Scroll Top -->", chatContainer.scrollTop + chatContainer.clientHeight + threshold - chatContainer.scrollHeight)
            //   console.log("chatContainer.clientHeight -->", chatContainer.clientHeight)
            //   console.log("chatContainer.scrollHeight -->",chatContainer.scrollHeight)
            const throttleTimeout = setTimeout(() => {
                if (isAtBottom) {
                setIsBottom(true);
                //   console.log("Reached");
                } else {
                if (isBottom) {
                    setIsBottom(false);
                }
                //   console.log("Unreached");
                }
            }, 100); // Set a delay of 100 milliseconds (adjust as needed)
        
            return () => clearTimeout(throttleTimeout); // Clear timeout on cleanup
        }
      }

    return (
        <>
            <Chat title={chatModule.name} chatContainerRef={chatContainerRef} onWheel = {onWheelHandle} onScroll={handleScroll}>
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
                onClickScrollDown={scrollDown}
            />
        </>
    )
}

export default ChatPage