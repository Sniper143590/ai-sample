import axios from "axios"

const getChatModuleInfo = async (moduleIndex:string) => {
    try {
        const response = await axios.get("/api/chat-module", {
            params: {
                moduleIndex,
            },
        })

        return response.data.result
        
    } catch (error) {

    }
}

export default getChatModuleInfo