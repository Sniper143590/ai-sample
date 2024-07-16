import axios from "axios"

const getResponse = async (query:string, llm:string, moduleIndex:string) => {
    try {
        const response = await axios.post("/api/chat-module", {
            query, llm, moduleIndex
        })

        return response.data.result
        
    } catch (error) {

    }
}

export default getResponse