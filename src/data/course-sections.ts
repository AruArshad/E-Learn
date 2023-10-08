// data/sections.ts
const sections = [
    {
      course: 'Introduction to Solana',
      sections: [
        { id: 1, title: 'Introduction', description: 'Introduction and Overview', price: 10, isPurchased:true },
        { id: 2, title: 'Chapter 1', description: 'Course A, Chapter 1', price: 10, isPurchased:false },
        { id: 3, title: 'Chapter 2', description: 'Course A, Chapter 2', price: 10, isPurchased:false },
        // Add more sections for Course A
      ],
    },
    {
      course: 'Course 2 Coming Soon',
      sections: [
        { id: 1, title: 'Course 2 Intro', description: 'Course 2 introduction and overview', isPurchased:false },
        { id: 2, title: 'Course 2, Chapter 1', description: 'Course 2, Lesson 1', price: 10, isPurchased:false },
        { id: 3, title: 'Course 2, Chapter 2', description: 'Course 2, Lesson 2', price: 10, isPurchased:false },
        // Add more sections for Course B
      ],
    },
    // Add more courses with their respective sections
  ];
  
  export default sections;