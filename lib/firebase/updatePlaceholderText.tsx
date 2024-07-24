import { and, collection, getDocs, query, where, updateDoc} from "firebase/firestore"
import { db } from "./db"

const updatePlaceholderText = async (moduleIndex:number, placeholderText:string) => {
  try {

    const q = query(
        collection(db, "chat-modules"),
        and(where("_id", "==", moduleIndex)),
    )
    const querySnapshot = await getDocs(q);
    let docToUpdate = null;

    querySnapshot.forEach((doc) => {
    if (doc.data()._id === moduleIndex) { // Check if the document's field matches the known value
        docToUpdate = doc.ref;
    }
    });

    if (docToUpdate) {
        await updateDoc(docToUpdate, {
            placeholder_text: placeholderText // Replace "fieldName" with the actual field name and "NewValue" with the new value you want to set
        });
        // console.log("Document successfully updated!");
    } else {
        console.log("No document found with the specified field value.");
    }
  } catch (error) {
    console.log(error)
    throw error;
  }
}

export default updatePlaceholderText
