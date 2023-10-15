import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase';

export const signInUser = async (email, password) => {
  const nullEmail = "null@firebase.com";

  try {
    const userCredential = auth.currentUser;
    
    if (userCredential) {
      // A user is authenticated, so you can access their email
      if (userCredential.email !== nullEmail) {
        await signInWithEmailAndPassword(auth, email, password);
        // Handle successful login, e.g., redirect to the user's dashboard.
        console.log("Login Successful!", userCredential.email);
        return { success: true, message: 'Login successful' };
      }
    } else {
      // Handle the case where there is no authenticated user
      console.log("No authenticated user found");
    }
  } catch (error) {
    console.error('Error during sign-in:', error);
  }
};

