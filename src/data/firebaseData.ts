//firebaseData.ts
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';

const fetchCourseData = async () => {
  // Initialize references to the Firestore collections
  const course1CollectionRef = collection(db, 'Course 1');
  const course2CollectionRef = collection(db, 'Course 2');
  
  // Create an array to store courses
  const courses = [];

  try {
    // Fetch data from the first collection (Course 1)
    const querySnapshot1 = await getDocs(course1CollectionRef);
    
    querySnapshot1.forEach(async (courseDoc) => {
      const courseData = courseDoc.data();
      const course = {
        course: courseData.courseName,
        sections: [], // Initialize an array to store sections
      };

      // Access the Sections collection for the current course
      const sectionsCollectionRef = collection(courseDoc.ref, 'Sections');
      const sectionsSnapshot = await getDocs(sectionsCollectionRef);

      sectionsSnapshot.forEach((sectionDoc) => {
        const sectionData = sectionDoc.data();
        const section = {
          id: sectionData.id,
          title: sectionData.title,
          description: sectionData.description,
          price: sectionData.price,
          isPurchased: sectionData.isPurchased,
        };
        course.sections.push(section);
      });

      courses.push(course);
    });

    // Fetch data from the second collection (Course 2)
    const querySnapshot2 = await getDocs(course2CollectionRef);
    
    querySnapshot2.forEach(async (courseDoc) => {
      const courseData = courseDoc.data();
      const course = {
        course: courseData.courseName,
        sections: [], // Initialize an array to store sections
      };

      // Access the Sections collection for the current course
      const sectionsCollectionRef = collection(courseDoc.ref, 'Sections');
      const sectionsSnapshot = await getDocs(sectionsCollectionRef);

      sectionsSnapshot.forEach((sectionDoc) => {
        const sectionData = sectionDoc.data();
        const section = {
          id: sectionData.id,
          title: sectionData.title,
          description: sectionData.description,
          price: sectionData.price,
          isPurchased: sectionData.isPurchased,
        };
        course.sections.push(section);
      });

      courses.push(course);
    });

    return courses;
  } catch (error) {
    console.error('Error fetching courses from Firestore: ', error);
    throw error; // Rethrow the error for the calling function to handle
  }
};

export { fetchCourseData };


// - Course 1
//     - id: 1
//     - courseName: Solana Course
//     - Sections
//           - id: 0
//           - title: Intro
//           - description: Intro and Overview
//           - price: 10
//           - isPurchased: false

//           - id: 1
//           - title: Chapter 2
//           - description: Course 1 Chapter 2
//           - price: 10
//           - isPurchased: false

// - Course 2
//     - id: 1
//     - courseName: Course 2 Coming Soon
//     - Sections
//           - id: 0
//           - title: Chapter 1
//           - description: Course 2 Chapter 1
//           - price: 10
//           - isPurchased: false

//           - id: 1
//           - title: Chapter 2
//           - description: Course 2 Chapter 2
//           - price: 10
//           - isPurchased: false
