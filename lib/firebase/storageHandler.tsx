import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./db"

export async function uploadImage(compressedFile:File, _id:string) {
    try {
        const storageRef = ref(storage, 'avatars/' + _id);
    
        // Upload the file and metadata
        const uploadTask = uploadBytes(storageRef, compressedFile);
        
        // Wait for the upload to finish
        await uploadTask;
        
        // Get the download URL
        const downloadURL = await getDownloadURL(storageRef);
        return downloadURL;
    } catch (error) {
        return "error"
    }
}