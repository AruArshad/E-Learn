import { Keypair, PublicKey, SystemProgram, Transaction, sendAndConfirmTransaction } from '@solana/web3.js';
import { notify } from '../utils/notifications';
import * as token from "@solana/spl-token";

const airdropELN = async (connection, destinationPublicKey, amount) => {
  try {
    // Replace these with your actual addresses
    const secret = JSON.parse(process.env.PRIVATE_KEY ?? "") as number[];
    const secretKey = Uint8Array.from(secret);
    const ownerKeypair = Keypair.fromSecretKey(secretKey);

    // const elnTokenAccount = new PublicKey('7nhXoGNbxsepGSe1wsJYoX63dUb3tT98CFTTufCbmr2');
    const elnMintAddress = new PublicKey('FCvvheAm84nXEW4hEG5XdMAacTBoNzumDyYXm32szY66');
    const elnProgramId = new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA');

    // Validate ownership of the ELN token account
    const ownerPublicKey = ownerKeypair.publicKey;

    // Get a recent blockhash
  //   const {
  //     context: { slot: minContextSlot },
  //     value: { blockhash, lastValidBlockHeight },
  // } = await connection.getLatestBlockhashAndContext();

    const mintInfo = await token.getMint(connection, elnMintAddress);

    const associatedTokenFrom = await token.getAssociatedTokenAddress(
      elnMintAddress,
      ownerPublicKey!
    );

    console.log("From: " + associatedTokenFrom)

    const associatedTokenTo = await token.getAssociatedTokenAddress(
      elnMintAddress,
      destinationPublicKey
    );

    // Check if the associated token account already exists
    const associatedAccountInfo = await connection.getAccountInfo(associatedTokenTo);

    if (associatedAccountInfo === null) {
      // The associated token account does not exist, so create it
      await token.createAssociatedTokenAccount(
        connection,
        ownerKeypair,
        elnMintAddress,
        destinationPublicKey,
        { preflightCommitment: 'processed' },
        elnProgramId
      );
    }

    console.log("To: " + associatedTokenTo)

    // const tokenAccountInfo = await token.getAccount(connection, elnTokenAccount);
    const tokenAccountOwner = associatedTokenFrom;

    if (!tokenAccountOwner.equals(associatedTokenFrom)) {
      notify({ type: 'error', message: 'Invalid Token Account Ownership', description: 'The ELN token account is not owned by your wallet.' });
      return false; // Return false to indicate failure
    }

    // Check the ELN token account balance
    // const tokenAccountBalance = tokenAccountInfo.amount;
    // if (tokenAccountBalance < amount) {
    //   notify({ type: 'error', message: 'Insufficient Balance', description: 'You do not have enough ELN tokens for the transfer.' });
    //   return false; // Return false to indicate failure
    // }

   // Create a new Transaction
   const transaction = new Transaction();

    // Add a custom SPL token transfer instruction
    const transferInstruction = token.createTransferInstruction(
      associatedTokenFrom, // Source account
      associatedTokenTo,   // Destination account
      ownerPublicKey!, // Owner of the source account
      amount * 10 ** mintInfo.decimals,
      [],
      elnProgramId // SPL Token program IDprogram
    );

    transaction.add(transferInstruction);
    
    // transaction.recentBlockhash = blockhash;

    const signature = await sendAndConfirmTransaction(connection, transaction, [ownerKeypair], { preflightCommitment: 'processed' });  
    
    // Notify the user about the successful airdrop
    // notify({ type: 'success', message: 'Airdrop Successful', description: `${amount} ELN tokens transferred to ${destinationPublicKey.toBase58()}.`, txid: signature });
    console.log(
      `Transfer Transaction: https://explorer.solana.com/tx/${signature}?cluster=devnet`
    )

    return true; // Return true to indicate success
  } catch (error) {
    notify({ type: 'error', message: 'Airdrop failed', description: error?.message });
    console.error('Airdrop failed:', error);

    return false; // Return false to indicate failure
  }
};

export default airdropELN;
