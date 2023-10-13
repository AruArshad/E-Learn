//useUserELNBalanceStore
import create, { State } from 'zustand'
import { Connection, PublicKey } from '@solana/web3.js'

interface UserELNBalanceStore extends State {
    balance: number;
    getUserELNBalance: (publicKey: PublicKey, connection: Connection) => void
  }

  const useUserELNBalanceStore = create<UserELNBalanceStore>((set, _get) => ({
    balance: 0,
    getUserELNBalance: async (publicKey, connection) => {
      let balance = 0;
      try {
        
        const elnTokenMint = new PublicKey('FCvvheAm84nXEW4hEG5XdMAacTBoNzumDyYXm32szY66');

        const tokenAccountInfo = await connection.getParsedTokenAccountsByOwner(publicKey, {mint: elnTokenMint});
            if (tokenAccountInfo.value.length > 0) {
                const balance = tokenAccountInfo.value[0].account.data.parsed.info.tokenAmount.uiAmount;
                set((s) => {
                    s.balance = balance;
                    console.log(`ELN balance:`, balance);
                  }) // ELN token balance 
              } else {
                return 0; // No ELN token balance found
              }

      } catch (e) {
        console.log(`error getting balance: `, e);
      }
      
    },
  }));
  
  export default useUserELNBalanceStore;