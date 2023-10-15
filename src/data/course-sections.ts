// data/sections.ts
const courses = [
  {
    id: 1,
    courseName: 'Solana Course',
    sections: [
      {
          id: 1,
          title: 'Introduction',
          description: 'Intro and Overview',
          price: 10,
          isPurchased: false,
      },
      {
          id: 2,
          title: 'Chapter 2',
          description: 'Course 1 Chapter 2',
          price: 10,
          isPurchased: false,
      },
      {
          id: 2,
          title: 'Chapter 3',
          description: 'Course 1 Chapter 3',
          price: 10,
          isPurchased: false,
        }
    ],
  },
  {
    id: 2,
    courseName: 'Course 2 Coming Soon',
    sections: [
      {
          id: 1,
          title: 'Chapter 1',
          description: 'Course 2 Chapter 1',
          price: 0,
          isPurchased: false,
      },
      {
          id: 2,
          title: 'Chapter 2',
          description: 'Course 2 Chapter 2',
          price: 0,
          isPurchased: false,
      },
      {
          id: 3,
          title: 'Chapter 3',
          description: 'Course 2 Chapter 3',
          price: 0,
          isPurchased: false,
      }
    ],
  },
];
  
export default courses;