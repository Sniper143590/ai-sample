import axios, { CancelTokenSource } from "axios"
import { BACKEND_URL } from "@/constants/backend"
import { PresetButton } from "@/constants/types";

import Streamify from 'streamify-string';

interface ResponseData {
  message: string;
  preprompts: string[];
}

const getResponseFromLlm = (): {
  startOperation: (query: string, setResults: React.Dispatch<React.SetStateAction<string[]>>, setPrePrompts:React.Dispatch<React.SetStateAction<PresetButton[]>>, numberOfQueries:number, setLoading:React.Dispatch<React.SetStateAction<boolean>>, setIsProgress:React.Dispatch<React.SetStateAction<boolean>>, llm: string, promptContext: string, lastThreeConversations: { query: string, answer: string }[], presetButtonPrompt: string, chatSession: string) => void;
  cancelOperation: () => void;
} => {

  // const cancelTokenSourceRef = useRef<CancelTokenSource>(axios.CancelToken.source());


  const startOperation = async (query: string, setResults: React.Dispatch<React.SetStateAction<string[]>>, setPrePrompts:React.Dispatch<React.SetStateAction<PresetButton[]>>, numberOfQueries:number, setLoading:React.Dispatch<React.SetStateAction<boolean>>,  setIsProgress:React.Dispatch<React.SetStateAction<boolean>>,  llm: string, promptContext: string, lastThreeConversations: { query: string, answer: string }[], presetButtonPrompt: string, chatSession: string) => {
    try {

      const controller = new AbortController();
      const signal = controller.signal;
      const CancelToken = axios.CancelToken;
      const source = CancelToken.source();

      const headers = {
        'Content-Type': 'text/plain',
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

      const queryParams = new URLSearchParams(params);
      const queryString = queryParams.toString();
      setLoading(true)
      setIsProgress(true)

      await fetch(`${BACKEND_URL}/api/query1?${queryString}`, {
        method: 'GET',
        headers
      }).then(response => {
        const stream = response.body;
        if (stream) {

          const reader = stream.getReader();
          let message = "";
          let initLength = numberOfQueries-1;
          // Read and process data chunks
          const readData = async () => {
            setIsProgress(true)

            while (true) {
              const { value, done } = await reader.read();

              // Process the data chunk (value)
              if (done) {
                setIsProgress(false)
                console.log("Done-------->")
                break;
              }
      
              const chunk = new TextDecoder().decode(value);
      
              // Assuming your server sends "preprompts" followed by the actual message
              if (chunk.startsWith("preprompts:")) {
                setLoading(false)
                setIsProgress(false)
                console.log("Got preprompts!!!!!")
                const parts = chunk.split('preprompts:');

                if (parts.length > 1) {
                  const parsedPreprompts = JSON.parse(parts[1]);
                  const updatedPrePrompts = parsedPreprompts.map((item:string, index:number)=>
                      {
                          return { _id:index, text: item, prompt: item };
                      }
                  );
                  console.log("--------->", updatedPrePrompts)
                setPrePrompts(updatedPrePrompts)
                

                }
              } else {  
                setLoading(false)
                setIsProgress(true)
                message += chunk;
                // console.log(chunk)
                setResults((prevResults) => {
                  // console.log(prevResults.length)
                  if (initLength < numberOfQueries) {
                    initLength++;
                    // If prevResults is empty, add the new message as a new item
                    return [...prevResults, message];
                    
                  } else {
                    // If prevResults is not empty, replace the last item with the message
                    return [...prevResults.slice(0, -1), message]; 
                  }
                });
                
              }
            }

            // Release the reader
            reader.releaseLock();
          };

          readData();
        }
      })

    } catch (error: any) {
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

  const cancelOperation = () => {
    // if (cancelTokenSourceRef.current) {
    console.log("Cancelled##");
    // controller.abort()
    //     cancelTokenSourceRef.current.cancel("Operation cancelled");
    //     cancelTokenSourceRef.current = axios.CancelToken.source();
    // }
  }

  return { startOperation, cancelOperation }

};

export default getResponseFromLlm