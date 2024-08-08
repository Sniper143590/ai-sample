import { BACKEND_URL } from "@/constants/backend"
import { PresetButton } from "@/constants/types";

const getResponseFromLlm = (): {
  startOperation: (query: string, setResults: React.Dispatch<React.SetStateAction<string[]>>, setPrePrompts:React.Dispatch<React.SetStateAction<PresetButton[]>>, numberOfQueries:number, setLoading:React.Dispatch<React.SetStateAction<boolean>>, setIsProgress:React.Dispatch<React.SetStateAction<boolean>>, llm: string, promptContext: string, lastThreeConversations: { query: string, answer: string }[], presetButtonPrompt: string, chatSession: string,abortController:AbortController|null, isReceived:boolean, setIsReceived:React.Dispatch<React.SetStateAction<boolean>>) => void;
  cancelOperation: (abortController:AbortController|null, setResults: React.Dispatch<React.SetStateAction<string[]>>, setLoading:React.Dispatch<React.SetStateAction<boolean>>, setIsProgress:React.Dispatch<React.SetStateAction<boolean>>, isReceived:boolean, setIsReceived:React.Dispatch<React.SetStateAction<boolean>>) => void;
} => {


  let num:number;
  let initLength:number;

  const startOperation = async ( query: string, setResults: React.Dispatch<React.SetStateAction<string[]>>, setPrePrompts:React.Dispatch<React.SetStateAction<PresetButton[]>>, numberOfQueries:number, setLoading:React.Dispatch<React.SetStateAction<boolean>>,  setIsProgress:React.Dispatch<React.SetStateAction<boolean>>,  llm: string, promptContext: string, lastThreeConversations: { query: string, answer: string }[], presetButtonPrompt: string, chatSession: string, abortController:AbortController|null, isReceived:boolean,  setIsReceived:React.Dispatch<React.SetStateAction<boolean>>) => {
    try {

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
      
      await fetch(`${BACKEND_URL}/api/query1?${queryString}`, {
        signal:abortController?.signal,
        method: 'GET',
        headers
      }).then(response => {
        setIsReceived(false)
        // console.log(response)
        const stream = response.body;
        
        if (stream) {
          const reader = stream.getReader();
          let message = "";
          
          // Read and process data chunks
          const readData = async () => {
            // setIsProgress(true)
            try { // Add a try/catch block to handle AbortError
              while (true) {
                // console.log(reader)
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
                  // reader.releaseLock();   
                  // break;
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
                  
                  message += chunk;
                  if (initLength < numberOfQueries){
                    initLength++;
                    setResults((prevResults) => [...prevResults, message])
                  } else {
                    if(!isReceived){
                      return
                    }
                    setResults((prevResults) => [...prevResults.slice(0, -1), message])
                  }
                }
                }
                
              }
              reader.releaseLock();   
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
      }).catch(error=> {
        console.log(error)
      })

    } catch (error: any) {
      console.log("Catch")
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

  const cancelOperation = (abortController:AbortController|null,setResults: React.Dispatch<React.SetStateAction<string[]>>, setLoading:React.Dispatch<React.SetStateAction<boolean>>, setIsProgress:React.Dispatch<React.SetStateAction<boolean>>, isReceived:boolean, setIsReceived:React.Dispatch<React.SetStateAction<boolean>>) => {
    // if (cancelTokenSourceRef.current) {
    console.log(abortController)
    setResults((prevResults) => {
      console.log("Init Length ----->",initLength)
      console.log("current Number ----->",num)
      if (isReceived) {
        return [...prevResults.slice(0, -1), "Paused"]; 
        
      } else {
        return [...prevResults, "Paused"];
      }
    });
    setIsReceived(false)
    if(abortController){
      
    console.log("Cancelled##");
    abortController.abort()

    
      setLoading(false)
      setIsProgress(false)
      
    }
    //     cancelTokenSourceRef.current.cancel("Operation cancelled");
    //     cancelTokenSourceRef.current = axios.CancelToken.source();
    // }
  }

  return { startOperation, cancelOperation }

};

export default getResponseFromLlm