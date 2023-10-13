//CourseSections.tsx
import React, { FC, useEffect, useState } from 'react';
import { notify } from 'utils/notifications';
import { Lock, Unlock } from 'react-feather';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import useUserELNBalanceStore from 'stores/useUserELNBalanceStore';
import { PublicKey } from '@solana/web3.js';
import { sendELN } from 'utils/sendEln';
import { fetchCourseData, updateIsPurchased } from 'data/firebaseData';

export const CourseSections: FC = () => {

  const [courses, setCourseData] = useState([]);
  const [loading, setLoading] = useState(true);

  const { wallet, connect, publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();

  const courseOwnerAddress = new PublicKey('AsYGsWe1JH8NCSffcHfVMxDMU6QUeHo5SyxMrBtDJozW');
  const elnMintAddress = new PublicKey('FCvvheAm84nXEW4hEG5XdMAacTBoNzumDyYXm32szY66'); // ELN token mint address
  const elnProgramId = new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA');
  const elnTokenAccount = new PublicKey('7nhXoGNbxsepGSe1wsJYoX63dUb3tT98CFTTufCbmr2');

  const ELNbalance = useUserELNBalanceStore((s) => s.balance)
  const { getUserELNBalance } = useUserELNBalanceStore();

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const courseData = await fetchCourseData();
        
        setCourseData(courseData);
        // console.log(courseData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching courses from Firestore: ', error);
        setLoading(false);
      }
    };
    
    fetchData();
    
    if (publicKey) {
      // console.log("Course " + publicKey.toBase58())
      getUserELNBalance(publicKey, connection)
    }
  }, [publicKey, connect, getUserELNBalance ]);

  const handleSectionPurchase = async ( course, section ) => {
    // notify({ type: 'info', message: 'Course: ' + course.course + ' Section: ' + section.title });

    if (!wallet) {
      notify({ type: 'error', message: 'Connect Wallet', description: 'Connect your Solana wallet first' });
      return;
    }

    // Check if the section is already purchased
    if (section.isPurchased) {
      notify({ type: 'info', message: 'Already Purchased', description: section.title + ' is already purchased' });
      return; // No need to proceed with the purchase
    }

    const elnBalance = (ELNbalance || 0).toLocaleString();

    // notify({type:'info', message: 'ELN Balance: ' + elnBalance});

    if (section.price !== null && elnBalance < section.price) {
      notify({ type: 'error', message: 'Balance Insufficient', description: 'Insufficient ELN balance. Please purchase enough ELN' });
      return;
    }

    if (section.price === 0 ) {
      notify({ type: 'error', message: 'Section Unavailable', description: 'Section currently unavailable' });
      return;
    }

    // else if (elnBalance === section.price || elnBalance > section.price) {
    //   notify({ type: 'info', message: 'You have ' + elnBalance + ' ELN in your account' });
    // }
    
    try {
        const success = await sendELN(connection, elnTokenAccount, courseOwnerAddress, publicKey, section.price, elnMintAddress, elnProgramId, sendTransaction);
        if (success) {
          notify({ type: 'success', message: 'Purchase Successful', description:section.title + ' section purchased successfully' });
      
      // Update isPurchased to true in Firebase
      await updateIsPurchased(course.docId, section.docId);    

      // To reflect the change immediately, update the local state as well
      const updatedCourseData = courses.map((course) => {
        if (course.id === course.id) {
          const updatedSections = course.sections.map((s) => {
            if (s.id === section.id) {
              return { ...s, isPurchased: true };
            }
            return s;
          });
          return { ...course, sections: updatedSections };
        }
        return course;
      });

      setCourseData(updatedCourseData);
          
          
        } else {
          notify({ type: 'error', message: 'Purchase Failed', description: 'Failed to purchasen ' + section.title + ' section' });
        }
    } catch (error) {
      console.log(error);
      notify({ type: 'error', message: 'An error occurred while processing the purchase: ' + error });
    }
};

return (
  <>
    {loading ? (
      <div className="text-center mt-4 text-gray-400 dark:text-gray-600">Loading...</div>
    ) : (
      <div className="section-grid">
        {courses.map((course, courseIndex) => (
          <div
            key={courseIndex}
            className="my-6 border p-6 mb-4 rounded-lg shadow-md bg-white dark:bg-gray-800"
          >
            <h2 className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">
              {course.courseName}
            </h2>
            <div className="my-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {course.sections.map((section, sectionIndex) => (
                <div
                  key={sectionIndex}
                  className="border p-7 rounded-lg shadow-md cursor-pointer bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                  onClick={() => handleSectionPurchase(course, section)}
                >
                  <div className="flex flex-col items-center mb-2">
                    {section.price !== null && (
                      <>
                        {section.isPurchased ? (
                          <Unlock className="text-green-500 dark:text-green-400 mb-1" size={35} />
                        ) : (
                          <Lock className="text-red-500 dark:text-red-400 mb-1" size={20} />
                        )}
                      </>
                    )}
                    <h3 className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">
                      {section.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">{section.description}</p>
                  {section.isPurchased || section.price === 0 ? null : (
                    <p className="text-orange-600 dark:text-orange-400 font-semibold mt-2">
                      {section.price} ELN
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    )}
  </>
);

};

