// data/sections.ts
const sections = [
    {
      course: 'Introduction to Solana',
      sections: [
        { id: 1, title: 'Introduction', description: 'Introduction and Overview', price: 1, isPurchased:false },
        { id: 2, title: 'Chapter 2', description: 'Course 1, Chapter 2', price: 10, isPurchased:false },
        { id: 3, title: 'Chapter 3', description: 'Course 1, Chapter 3', price: 10, isPurchased:false },
        // Add more sections for Course A
      ],
    },
    {
      course: 'Course 2 Coming Soon',
      sections: [
        { id: 1, title: 'Course 2 Intro', description: 'Course 2 introduction and overview', price: null, isPurchased:false },
        { id: 2, title: 'Chapter 2', description: 'Course 2, Lesson 2', price: null, isPurchased:false },
        { id: 3, title: 'Chapter 3', description: 'Course 2, Lesson 3', price: null, isPurchased:false },
        // Add more sections for Course B
      ],
    },
    // Add more courses with their respective sections
  ];
  
  export default sections;