import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey, TransactionSignature } from '@solana/web3.js';
import { FC, useCallback } from 'react';
import { notify } from "../utils/notifications";
import useUserELNBalanceStore from 'stores/useUserELNBalanceStore';
import airdropELN from 'utils/airdropELN';
import { db } from '../firebase/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const AIRDROP_COOLDOWN_HOURS = 24;

export const RequestELNAirdrop: FC = () => {
    const { connection } = useConnection();
    const { publicKey } = useWallet();
    const { getUserELNBalance } = useUserELNBalanceStore();

    const onClick = useCallback(async () => {
        if (!publicKey) {
            console.log('error', 'Wallet not connected!');
            notify({ type: 'error', message: 'Wallet Disconnected', description: 'Connect your wallet to continue!' });
            return;
        }

        const userDocRef = doc(db, 'courses', 'A83hDAe77qyGt9M0rwzj');
        const userDoc = await getDoc(userDocRef);

        const currentTime = new Date().getTime();

        if (userDoc.exists) {
            const lastAirdropTime = userDoc.data()?.lastAirdropTime;

            if (lastAirdropTime) {
                const timeSinceLastAirdrop = currentTime - lastAirdropTime;
                const cooldownPeriod = AIRDROP_COOLDOWN_HOURS * 60 * 60 * 1000; // Convert hours to milliseconds

                if (timeSinceLastAirdrop < cooldownPeriod) {
                    const remainingCooldown = cooldownPeriod - timeSinceLastAirdrop;
                    const hoursRemaining = Math.ceil(remainingCooldown / (60 * 60 * 1000));
                    notify({ type: 'error', message: 'Airdrop Cooldown', description: `You can airdrop again in ${hoursRemaining} hours.` });
                    return;
                }
            }
        }

        let signature: TransactionSignature = '';

        try {
            
        const success = await airdropELN(connection, publicKey, 50);
        
        if (success) {
          notify({ type: 'success', message: 'Airdrop Successful', description: "50 ELN token transferred to your " + publicKey + " wallet as a gift. Enjoy!!!" });
          
        await updateDoc(userDocRef, { lastAirdropTime: currentTime });

        }
        else {
            notify({ type: 'error', message: 'Airdrop Failed', description: 'Failed to Airdrop!' });
          }

        getUserELNBalance(publicKey, connection);
        
        } catch (error: any) {
            notify({ type: 'error', message: `Airdrop failed!`, description: error?.message, txid: signature });
            console.log('error', `Airdrop failed! ${error?.message}`, signature);
        }
    }, [publicKey, connection, getUserELNBalance]);

    return (
        <div>
            <button
                className="px-8 m-2 btn animate-pulse bg-gradient-to-r from-[#feb236] to-[#d64161] hover:from-pink-500 hover:to-yellow-500 ..."
                onClick={onClick}
            >
                <span>Airdrop 50 ELN</span>
            </button>
        </div>
    );
};

