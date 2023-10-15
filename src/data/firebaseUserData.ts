// firebaseUserData.ts
import { db } from '../firebase/firebase';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';

// Define the FirebaseUser type
type FirebaseUser = {
  uid: string;
  email: string;
  // Add any other user properties you need here
};

// Function to fetch user data from Firestore
export const fetchUserData = async (user: FirebaseUser) => {
  try {
    // Fetch user-specific data from Firestore
    const userRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      return userDoc.data();
    }

    return null; // Return null if no data is found
  } catch (err) {
    console.error('Error fetching user data:', err);
    return null;
  }
};



