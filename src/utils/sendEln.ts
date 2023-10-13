import * as web3 from "@solana/web3.js"
import * as token from "@solana/spl-token"
import { Connection, Transaction } from "@solana/web3.js"
import { SendTransactionOptions } from "@solana/wallet-adapter-base"


export const sendELN = async function transferTokens(
    connection: web3.Connection,
    // payer: web3.Keypair,
    source: web3.PublicKey,
    destination: web3.PublicKey,
    owner: web3.PublicKey,
    amount: number,
    mint: web3.PublicKey,
    program: web3.PublicKey,
    sendTx: (transaction: Transaction, connection: Connection, options: SendTransactionOptions) => Promise<string>
  ) : Promise<boolean> { // Specify the return type as boolean
    try {
    const mintInfo = await token.getMint(connection, mint);

    // Get a recent blockhash
    const {
        context: { slot: minContextSlot },
        value: { blockhash, lastValidBlockHeight },
    } = await connection.getLatestBlockhashAndContext();

    const associatedTokenFrom = await token.getAssociatedTokenAddress(
        mint,
        owner!
      );

    const associatedTokenTo = await token.getAssociatedTokenAddress(
        mint,
        destination
      );
  
    const transactionSignature = token.createTransferInstruction(
    //   connection,
    //   source,
      associatedTokenFrom,
      associatedTokenTo,
      owner!,
      amount * 10 ** mintInfo.decimals,
      [],
      program
    )

    const transaction = new web3.Transaction().add(transactionSignature);

    transaction.recentBlockhash = blockhash;

    const signature = await sendTx(transaction, connection, { minContextSlot });
    // const signature = await web3.sendAndConfirmTransaction(connection, transaction, [wallet]);
    
    await connection.confirmTransaction({ blockhash, lastValidBlockHeight, signature });  
    console.log(
      `Transfer Transaction: https://explorer.solana.com/tx/${signature}?cluster=devnet`
    )

    return true;
}
    catch (error) {
        console.log('Transaction error: ' + error);
        return false

    }
}
