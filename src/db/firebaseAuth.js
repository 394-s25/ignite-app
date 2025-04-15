import {getAuth, GoogleAuthProvider, signInWithPopup, signOut} from 'firebase/auth';
import { app } from './firebaseConfig';

// Initialize Firebase
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Check northwestern email
const isNorthwesternEmail = (email) => {
    return email.endsWith("@u.northwestern.edu") || email.endsWith("@northwestern.edu");
};

export const handleGoogleLogin = async () => {
    const result = await signInWithPopup(auth, googleProvider)
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    if (!isNorthwesternEmail(user.email)) {
        alert("Please use your Northwestern email to sign in.");
        await signOut(auth);
        return null;
    }
    console.log("User signed in:", user);
    return user;
}