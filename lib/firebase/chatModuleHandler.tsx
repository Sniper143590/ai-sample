import { and, updateDoc, collection, getDocs, addDoc, deleteDoc, query, where} from "firebase/firestore"
import { ChatModule } from "@/constants/types";
import { db } from "./db"

export const getChatModuleInfo = async (moduleIndex:string) => {
  try {

    const q = query(
        collection(db, "chat-modules"),
        and(where("_id", "==", moduleIndex)),
    )
    const chatModuleInfo = await getDocs(q);
    return chatModuleInfo.docs.map((doc) => ({
        _id: doc.data()._id,
        avatar:doc.data().avatar,
        name: doc.data().name,
        llm_name:doc.data().llm_name,
        prompt_context: doc.data().prompt_context,
        preset_buttons: doc.data().preset_buttons,
        placeholder_text: doc.data().placeholder_text
    } as ChatModule))
  } catch (error) {
    throw error;
  }
}

export const getChatModules = async () => {
  try {

    const q = query(
        collection(db, "chat-modules"),
    )
    const chatModulesInfo = await getDocs(q);
    return chatModulesInfo.docs.map((doc) => ({
        id:doc.id,
        _id: doc.data()._id,
        llm_name:doc.data().llm_name,
        avatar:doc.data().avatar,
        name: doc.data().name,
        prompt_context: doc.data().prompt_context,
        preset_buttons: doc.data().preset_buttons,
        placeholder_text: doc.data().placeholder_text
    }))
  } catch (error) {
    throw error;
  }
}

export async function addNewChatModule(newChatModule:ChatModule) {
    try {
      await addDoc(collection(db, "chat-modules"), {
        _id:newChatModule._id,
        avatar:newChatModule.avatar,
        llm_name:newChatModule.llm_name,
        name:newChatModule.name,
        preset_buttons:newChatModule.preset_buttons,
        placeholder_text:newChatModule.placeholder_text,
        prompt_context:newChatModule.prompt_context,
      });
      console.log("Document written with ID: ", newChatModule._id);
      return true;
    } catch (error) {
      console.error("Error adding document: ", error);
      return false;
    }
  }

export const updateChatModule = async (moduleIndex:string, newChatModule:ChatModule) => {
    try {
      const q = query(
          collection(db, "chat-modules"),
          and(where("_id", "==", moduleIndex)),
      )
      const querySnapshot = await getDocs(q);
      let docToUpdate = null;

      console.log(newChatModule.avatar)
  
      querySnapshot.forEach((doc) => {
      if (doc.data()._id === moduleIndex) { // Check if the document's field matches the known value
          docToUpdate = doc.ref;
      }
      });
  
      if (docToUpdate) {
          await updateDoc(docToUpdate, {
              _id:newChatModule._id,
              name:newChatModule.name,
              llm_name:newChatModule.llm_name,
              avatar:newChatModule.avatar,
              prompt_context:newChatModule.prompt_context,
              preset_buttons:newChatModule.preset_buttons,
              placeholder_text:newChatModule.placeholder_text // Replace "fieldName" with the actual field name and "NewValue" with the new value you want to set
          });
          console.log("Document successfully updated!");
      } else {
          console.log("No document found with the specified field value.");
      }
      return true;
    } catch (error) {
      console.log(error)
      return false;
    }
  }

export async function deleteChatModuleById(_id:string) {
  try {
    // Query to find documents where the name field matches "Jacob"
    const q = query(collection(db, "chat-modules"), where("_id", "==", _id));

    // Get the documents matching the query
    const querySnapshot = await getDocs(q);
    
    // Iterate over each document in the result
    querySnapshot.forEach(async (doc) => {
      // Delete each document
      await deleteDoc(doc.ref);
      console.log(`Deleted document with ID: ${_id}`);
    });
    return true;

  } catch (error) {
    console.error("Error deleting documents:", error);
    return false;
  }
}

