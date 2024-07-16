import { createHandler, Get, Query } from "next-api-decorators"
import getChatModuleInfo from "@/lib/firebase/getChatModuleInfo"
class GetChatModulesInfo {
    @Get()
    async get(@Query() query:any) {
      try {
        const {moduleIndex} = query
        const chatModules = await getChatModuleInfo(moduleIndex)
  
        return {
          success: true,
          result: chatModules,
        }
      } catch (error) {
        return {
          success: false,
          error,
        }
      }
    }
}

export default createHandler(GetChatModulesInfo)
