//firebaseData.ts
import { collection, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';

const fetchCourseData = async () => {
  // Initialize references to the Firestore collections
  const courseCollectionRef = collection(db, 'courses');
  
  try {
    const querySnapshot = await getDocs(courseCollectionRef);
    const courses = [];

    for (const courseDoc of querySnapshot.docs) {
      const courseData = courseDoc.data();
      const course = {
        docId: courseDoc.id,
        id: courseData.id,
        courseName: courseData.courseName,
        sections: [],
      };

      // Access the Sections collection for the current course
      const sectionsCollectionRef = collection(courseDoc.ref, 'sections');
      const sectionsSnapshot = await getDocs(sectionsCollectionRef);

      sectionsSnapshot.forEach((sectionDoc) => {
        const sectionData = sectionDoc.data();
        const section = {
          docId: sectionDoc.id,
          id: sectionData.id,
          title: sectionData.title,
          description: sectionData.description,
          price: sectionData.price,
          isPurchased: sectionData.isPurchased,
        };
        course.sections.push(section);
      });

      course.sections.sort((a, b) => a.id - b.id);

      courses.push(course);
    }

    // Sort the courses array by the id in ascending order
    courses.sort((a, b) => a.id - b.id);

    return courses;
  } catch (error) {
    console.error('Error fetching courses from Firestore: ', error);
    throw error;
  }
};

async function updateIsPurchased(courseId, sectionId) {
  try {
    // Construct the document path for the section in Firebase
    const sectionDocRef = doc(db, 'courses', courseId.toString(), 'sections', sectionId.toString());

    // Check if the document exists
    const sectionDoc = await getDoc(sectionDocRef);
    if (sectionDoc.exists()) {
      // Update the isPurchased status in Firebase to true
      await updateDoc(sectionDocRef, { isPurchased: true });
    } else {
      console.error('Document does not exist.');
      // Handle the case where the document doesn't exist, e.g., show an error message.
    }
  } catch (error) {
    console.error('Error updating section isPurchased status in Firestore: ', error);
    throw error;
  }
}

export { fetchCourseData, updateIsPurchased };


// - courses
//     - id: 1
//     - courseName: Solana Course
//     - sections
//           - id: 1
//           - title: Intro
//           - description: Intro and Overview
//           - price: 10
//           - isPurchased: false

//           - id: 2
//           - title: Chapter 2
//           - description: Course 1 Chapter 2
//           - price: 10
//           - isPurchased: false
          
//      - id: 2
//      - courseName: Course 2 Coming Soon
//      - sections
//           - id: 1
//           - title: Chapter 1
//           - description: Course 2 Chapter 1
//           - price: 10
//           - isPurchased: false

//           - id: 3
//           - title: Chapter 2
//           - description: Course 2 Chapter 2
//           - price: 10
//           - isPurchased: false

