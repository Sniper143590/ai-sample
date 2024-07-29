import axios, { CancelTokenSource } from "axios"
import { BACKEND_URL } from "@/constants/backend"
import { useRef, useState } from "react";
import { ExceptionHandler } from "next-api-decorators/dist/decorators";

interface ResponseData {
    message: string;
    preprompts: string[];
  }

const getResponseFromLlm = (): {
    startOperation: (query: string, llm: string, promptContext: string, lastThreeConversations:{query:string, answer:string}[], presetButtonPrompt:string, chatSession:string) => Promise<ResponseData>;
    cancelOperation: () => void;
  }  => {

    // const cancelTokenSourceRef = useRef<CancelTokenSource>(axios.CancelToken.source());
  

    const startOperation = async (query:string, llm:string, promptContext:string, lastThreeConversations:{query:string, answer:string}[], presetButtonPrompt:string, chatSession:string) => {
        try {
            const controller = new AbortController();
            const signal = controller.signal;
            const CancelToken = axios.CancelToken;
            const source = CancelToken.source();

            const headers = {
              'Content-Type': 'application/json',
              'ngrok-skip-browser-warning': "1",
          };
          
    
        //   const source = axios.CancelToken.source();
        //   cancelTokenSourceRef.current = source;
    
          const response = await axios.post(`${BACKEND_URL}/api/query`, {
            query,
            llm,
            promptContext,
            lastThreeConversations,
            presetButtonPrompt,
            chatSession,
            // signal: signal,
          }, { headers, cancelToken: source.token, signal: signal });
          // controller.abort();
          // source.cancel('Operation canceled by the user.');

          return response.data;
        } catch (error:any) {
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

    return { startOperation, cancelOperation}

};

export default getResponseFromLlm