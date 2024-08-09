import { BACKEND_URL } from "@/constants/backend"
import { PresetButton } from "@/constants/types";
import { kill } from "process";

let stream: ReadableStream<Uint8Array> | null;
let reader: ReadableStreamDefaultReader<Uint8Array>;
let isAborted = false;
let abortController:AbortController|null;

const getResponseFromLlm = (): {
  startOperation: ( query: string, setResults: React.Dispatch<React.SetStateAction<string[]>>, setPrePrompts:React.Dispatch<React.SetStateAction<PresetButton[]>>, numberOfQueries:number, setLoading:React.Dispatch<React.SetStateAction<boolean>>, setIsProgress:React.Dispatch<React.SetStateAction<boolean>>, llm: string, promptContext: string, lastThreeConversations: { query: string, answer: string }[], presetButtonPrompt: string, chatSession: string, isReceived:boolean, setIsReceived:React.Dispatch<React.SetStateAction<boolean>>) => void;
  cancelOperation: ( setResults: React.Dispatch<React.SetStateAction<string[]>>, setLoading:React.Dispatch<React.SetStateAction<boolean>>, setIsProgress:React.Dispatch<React.SetStateAction<boolean>>, isReceived:boolean, setIsReceived:React.Dispatch<React.SetStateAction<boolean>>) => void;
} => {

  let num:number;
  let initLength:number;

  const startOperation = async ( query: string, setResults: React.Dispatch<React.SetStateAction<string[]>>, setPrePrompts:React.Dispatch<React.SetStateAction<PresetButton[]>>, numberOfQueries:number, setLoading:React.Dispatch<React.SetStateAction<boolean>>,  setIsProgress:React.Dispatch<React.SetStateAction<boolean>>,  llm: string, promptContext: string, lastThreeConversations: { query: string, answer: string }[], presetButtonPrompt: string, chatSession: string, isReceived:boolean,  setIsReceived:React.Dispatch<React.SetStateAction<boolean>>) => {
    try {


      abortController =  new AbortController()
      const headers = {
        'Accept': 'text/event-stream',
        'Content-Type': 'text/event-stream',
        'ngrok-skip-browser-warning': "1",
      };
        const params =  { // Add parameters to the URL
          query: query,
          llm: llm,
          promptContext: promptContext,
          lastThreeConversations: JSON.stringify(lastThreeConversations),
          presetButtonPrompt: presetButtonPrompt,
          chatSession: chatSession,
          // signal: signal,
        }
        initLength = numberOfQueries-1;
        num = numberOfQueries-1;

      const queryParams = new URLSearchParams(params);
      const queryString = queryParams.toString();
      setLoading(true)
      setIsProgress(true)
      
      const response = await fetch(`${BACKEND_URL}/api/query1?${queryString}`, {
        signal:abortController?.signal,
        method: 'GET',
        headers
      })
      console.log(abortController)
      stream = response.body;
        
      if (stream) {
          reader = stream.getReader();
          let message = "";
          
          // Read and process data chunks
          const readData = async () => {
            isAborted = false
            // setIsProgress(true)
            try { // Add a try/catch block to handle AbortError
              while (true) {
                // console.log(reader)
                console.log(isAborted)
                if(reader){
                  const { value, done } = await reader.read();
                  if (done) {
                    setIsProgress(false)
                    setLoading(false); 
                    break;
                  }
                  if (abortController?.signal.aborted){
                    console.log("Aborted!")
                    setIsProgress(false);
                    setLoading(false)  
                    break;
                  }
                  const chunk = new TextDecoder().decode(value);
                  if (chunk) {
                    setIsReceived(true)
                  }
                  if(chunk.startsWith('with_error')){
                    setIsProgress(false);
                    setLoading(false);
                    break;
                  }
                  if (chunk.startsWith("preprompts:")) {
                    if(isAborted) break;
                    console.log("Got preprompts!!!!!")
                    
                    const parts = chunk.split('preprompts:');
                    if (parts.length > 1) {
                      const parsedPreprompts = JSON.parse(parts[1]);
                      const updatedPrePrompts = parsedPreprompts.map((item:string, index:number)=>
                          {
                              return { _id:index, text: item, prompt: item };
                          }
                      );
                      setPrePrompts(updatedPrePrompts)
                    }
                  } else {  
                    if(isAborted) break;
                    message += chunk;
                    if (initLength < numberOfQueries){
                      initLength++;
                      setResults((prevResults) => [...prevResults, message])
                    } else {
                      if(isAborted) break;
                      // console.log("Must be isReceived True here ->", isReceived)
                      // if(!isReceived){
                      //   return
                      // }
                      setResults((prevResults) => [...prevResults.slice(0, -1), message])
                    }
                  }
                } else {
                  break;
                }
                
              }
              reader?.releaseLock();   
            } catch (error:any) {
              
              // If AbortError, log and break the loop
              if (error.name === "AbortError") {
                console.log("Stream reading aborted");
                setIsProgress(false)
                setLoading(false); 
              } else {
                console.error("An error occurred during stream reading:", error);
                throw error;
              }
            } 
          };

          readData();
        }

    } catch (error: any) {
      console.log("Catch", error)
      setLoading(false)
      setIsProgress(false)

      if (error.name === "AbortError") {
        console.log("Aborted")
        // Return "operation cancelled" if the request was cancelled
        return { message: "Operation cancelled", preprompts: [] }; // Return empty preprompts as well
      } else {
        console.error("An error occurred:", error);
        throw error;
      }
    }
  };

  const cancelOperation = async ( setResults: React.Dispatch<React.SetStateAction<string[]>>, setLoading:React.Dispatch<React.SetStateAction<boolean>>, setIsProgress:React.Dispatch<React.SetStateAction<boolean>>, isReceived:boolean, setIsReceived:React.Dispatch<React.SetStateAction<boolean>>) => {
    // if (cancelTokenSourceRef.current) {
    console.log(abortController)
    isAborted = true
    // if (isReceived) {
    //   setResults((prev)=> [...prev, "Paused"])
    // } else {
    //   setResults((prev)=> [...prev, "Paused"])
    // }
    // setIsReceived(false)
    if(abortController){
      
      console.log("Cancelled##");
      

      abortController.abort()
      console.log("Aftere --->", abortController)
      setLoading(false)
      setIsProgress(false)
    }
  }

  return { startOperation, cancelOperation }

};

export default getResponseFromLlm