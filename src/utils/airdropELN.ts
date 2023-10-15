import { Keypair, PublicKey, SystemProgram, Transaction, sendAndConfirmTransaction } from '@solana/web3.js';
import { notify } from '../utils/notifications';
import * as token from "@solana/spl-token";

const airdropELN = async (connection, destinationPublicKey, amount) => {
  try {
    // Replace these with your actual addresses
    const secretKeyArray = [60,174,222,124,251,138,112,154,139,147,18,232,227,78,215,205,67,158,200,44,164,146,31,99,5,5,92,96,104,212,75,136,146,171,149,129,68,110,238,118,99,144,59,88,115,245,145,237,252,150,8,117,28,106,9,109,87,147,214,2,249,237,4,199] as number[]; // Should get from an environment variable
    const secretKey = Uint8Array.from(secretKeyArray);
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

    await token.createAssociatedTokenAccount(connection, ownerKeypair, elnMintAddress, destinationPublicKey, { preflightCommitment: 'processed' }, elnProgramId);

    const associatedTokenTo = await token.getAssociatedTokenAddress(
      elnMintAddress,
      destinationPublicKey
    );

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
