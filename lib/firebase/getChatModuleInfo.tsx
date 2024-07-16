import { and, collection, getDocs, query, where} from "firebase/firestore"
import { db } from "./db"

const getChatModuleInfo = async (moduleIndex:number) => {
  try {

    const q = query(
        collection(db, "chat-modules"),
        and(where("_id", "==", moduleIndex)),
    )
    const chatModuleInfo = await getDocs(q);
    return chatModuleInfo.docs.map((doc) => ({
        id:doc.id,
        _id: doc.data()._id,
        name: doc.data().name,
        prompt_context: doc.data().prompt_context,
        preset_buttons: doc.data().preset_buttons,
        placeholder_text: doc.data().placeholder_text
    }))
  } catch (error) {
    throw error;
  }
}

export default getChatModuleInfo
