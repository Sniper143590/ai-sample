import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from "firebase/auth"
import { auth } from "./db";

export async function changePassword(
    newPassword: string, 
    // currentPassword: string 
): Promise<boolean> {
    const user = auth.currentUser;

    if (user) {
        try {
            await updatePassword(user, newPassword);
            
            return true
            
        } catch (error: any) {
            if (error.code === 'auth/wrong-password') {
                console.error('Incorrect current password provided.');
            } else {
                console.error('Error changing password:', error);
            }
            return false
        }
    } else {
        console.log('No user is signed in!');
        return false
    }
}