import axios from "axios";
import { BACKEND_URL } from "@/constants/backend"

const refreshPresetButtonText = async (presetButtonPrompt:string, query:string) => {

    try {
        const headers = {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': "1",
      };

      const response = await axios.post(`${BACKEND_URL}/api/refresh-preset-prompts`, {
        query,
        presetButtonPrompt,
      }, { headers });

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
}

export default refreshPresetButtonText