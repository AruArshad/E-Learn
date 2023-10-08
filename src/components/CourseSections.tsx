import React, { FC } from 'react';
import sections from 'data/course-sections';
import { notify } from 'utils/notifications';
import { Lock, Unlock } from 'react-feather'; // Import Feather Icons

export const CourseSections: FC = () => {
  const handleSectionClick = (courseName: string, sectionTitle: string) => {
    // Implement your desired action when a section is clicked here
    // You can navigate to a different page, display more details, or perform any other action.
    notify({ type: 'success', message: `Course Name: ${courseName} | Section Title: ${sectionTitle} clicked` });
  };

  return (
    <>
      <div className="section-grid">
        {sections.map((course) => (
          <div key={course.course} className="my-5 border p-4 mb-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">{course.course}</h2>
            <div className="my-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {course.sections.map((section) => (
                <div
                  key={section.id}
                  className="border p-4 rounded-lg shadow cursor-pointer"
                  onClick={() => handleSectionClick(course.course, section.title)} // Handle click event
                >
                  <div className="flex flex-col items-center mb-2"> {/* Flex container */}
                    {section.isPurchased ? (
                      <Unlock className="text-green-500 mb-1" size={20} /> // Unlocked padlock icon
                    ) : (
                      <Lock className="text-red-500 mb-1" size={20} /> // Locked padlock icon
                    )}
                    <h3 className="text-lg font-semibold">{section.title}</h3> {/* Chapter name */}
                  </div>
                  <p className="text-gray-600">{section.description}</p>
                  {section.isPurchased ? null : (
                    <p className="text-orange-600 font-semibold mt-2">{section.price} ELN</p> // Display price only if not purchased
                  )}
                  {/* Add more section details here */}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default sections;
