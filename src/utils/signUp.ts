import { auth, db } from '../firebase/firebase';
import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import courses from 'data/course-sections';

export const SignUp = async (email, password) => {
    try {
        // Check if the email is already registered
        const existingMethods = await fetchSignInMethodsForEmail(auth, email);

        if (existingMethods.length > 0) {
            console.error('Email is already in use. Please choose a different email address.');
            // Handle this case, e.g., show an error message to the user and prevent further registration attempts.
        } else {
            // If the email is not registered, proceed with sign-up
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            const userRef = doc(db, 'users', user.uid);
            await setDoc(userRef, { courses });

            console.log('Successfully populated DB!');
            // Redirect to the user's dashboard or another page.
        }
    } catch (err) {
        console.error('Error during registration:', err);
    }
};
