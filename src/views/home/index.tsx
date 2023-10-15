// Next, React
import { FC, useEffect, useState } from "react"
import Link from "next/link"

// Wallet
import { useWallet, useConnection } from "@solana/wallet-adapter-react"

// Components
import { RequestAirdrop } from "../../components/RequestAirdrop"
import { CourseSections } from "../../components/CourseSections"

import pkg from "../../../package.json"
import { SignUp } from "utils/signUp"
import  { signInUser }  from "utils/signIn"
import { setPersistence, inMemoryPersistence, onAuthStateChanged } from "firebase/auth"
import { auth } from "../../firebase/firebase"
import { RequestELNAirdrop } from "components/RequestELNairdrop"


export const HomeView: FC = ({}) => {
  const wallet = useWallet();
  // const { connection } = useConnection();
  const [user, setUser] = useState(''); 
  const [password, setPassword] = useState(''); 

  useEffect(() => {

    if (!user) {
      // This condition ensures that user and password are set only once
      const walletPublicKey = wallet.publicKey;
      if (walletPublicKey) {
        const newUser = walletPublicKey.toBase58() + "@firebase.com";
        const newPassword = "firebasePwd";
        setUser(newUser);
        setPassword(newPassword);
        // console.log("User: " + newUser);
        // console.log("Password: " + newPassword);

        // createAccount(newUser, newPassword);
        // login(newUser, newPassword);
      }
    }

    // createAccount();

    // login();

    // Set up Firebase persistence
    setPersistence(auth, inMemoryPersistence)
      .then(() => {
        // Firebase is initialized with session persistence.
      })
      .catch((error) => {
        console.error('Error setting persistence:', error);
      });

    onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in.
          // You can access user properties like user.uid, user.displayName, etc.
          console.log('User is signed in:', user.uid);
          // You can also dispatch an action or update your component's state accordingly.
        } else {
          // No user is signed in.
          console.log('No user signed in.');
          // You can also dispatch an action or update your component's state accordingly.
        }
      });

  }, [wallet.publicKey]);

  const createAccount = async (user, password) => {
    try {
      await SignUp(user, password);
    } catch (error) {
      console.error('Error Signing up: ', error);
    }
  }

  const login = async (user, password) => {
    try {
      await signInUser(user, password);
    } catch (error) {
      console.log("Error Signing in: " + error)
    }
  }

  return (
    <div className="md:hero mx-auto p-4">
      <div className="md:hero-content flex flex-col">
        <h1 className="text-center text-5xl md:pl-12 font-bold text-transparent bg-clip-text bg-gradient-to-tr from-[#feb236] to-[#d64161]">
          E-Learn{" "}
          <span className="text-sm font-normal align-top text-slate-700 text-[#d64161]">
            v{pkg.version}
          </span>
        </h1>
        <div className="text-center">
          <RequestAirdrop />
          <RequestELNAirdrop />
          <CourseSections />
          {/* {wallet.publicKey && <p>Public Key: {wallet.publicKey.toBase58()}</p>} */}
        </div>
      </div>
    </div>
  )
}
