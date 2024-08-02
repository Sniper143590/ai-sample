
import { useEffect, useRef } from "react";
import Chat from "@/components/Chat";
import Message from "@/components/Message";
import Question from "@/components/Question";
import Answer from "@/components/Answer";
import { useChat } from "@/providers/ChatModuleProvider";
import { wrap } from "module";


const ChatPage = () => {
    const { queries, results, setResults, conversations, setConversations, getResponseFunc, chatModule } = useChat()
    function startsWithNumber(str:string) {
        return /^\d/.test(str); 
    }
    function wrapCode(text: string): string {
        // Replace all occurrences of `text` with <code>text</code>
        return text.replace(/`(.*?)`/g, '<code>$1</code>'); 
      }
    function wrapMultiCode(text:string): string {
        let lines = text.split("\n")
        const name = lines[0]
        let content = ""
        for (let i=1;i<lines.length;i++){
            content +=lines[i]
        }
        return `<pre><code className='language-${name}>${content}</code></pre>`
    }
    const formatText = (text: string) => {
        let html = "<ol style='display:flex; flex-direction:column;gap:0.5rem;'>"
        let lines = text.split("\n")
        let codeCount = 0;
        for (let i =0; i<lines.length; i++) {
            let line = lines[i]
           
            let htmlCode = ''
            if(line.startsWith('#')) {
                if(line){
                    let headingLevel = line.split('#').length-1;
                    htmlCode= `<li><strong><h${headingLevel}>${line.replace(/\*\*(.*?)\*\*/g, '$1').trim().substring(headingLevel).trim()}</h${headingLevel}></strong><li>`;
                }
            } else if (line.trim()===""){
                htmlCode= "<br>"
            } else if (line.startsWith('-')){
                line ="<li style='margin-left:1.5rem;list-style-type: disc;'>" + line.slice(1) + "</li>"
                htmlCode= line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
            } else if(line.startsWith('  -')){
                line ="<li style='margin-left:2.5rem;list-style-type: disc;'>" + line.slice(3) + "</li>"
                htmlCode= line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
            } 
            else if(startsWithNumber(line)){
                console.log("Synthesizers")
                line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                htmlCode="<li>"+line+"</li>"
            } else if(line.startsWith("  ```")){
                codeCount ++;
                // let blocks = ''

                if(codeCount%2===1){
                    let name = line.slice(3)
                    console.log(name)
                    htmlCode = `<pre><code>`
                } else {
                    htmlCode = "</code></pre>"
                }
                // htmlCode= line.replace(/```([\s\S]+?)```/g, '</p><pre><code>$1</code></pre><p>');
            }
            else {
                // line.replace(/```([\s\S]*?)```/g, "<code>$1</code>");
                htmlCode= ""+line
            }

            html +=wrapCode(htmlCode)

        }
        console.log("Here goes the number of codes", codeCount)
        return html + "</ol>";
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
                            <Answer response={results[index]}  isLast={index===(queries.length-1)}><div key={index} dangerouslySetInnerHTML={{ __html: formatText(results[index]) }}/></Answer>
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