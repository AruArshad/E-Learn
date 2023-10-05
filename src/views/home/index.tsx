// Next, React
import { FC, useEffect, useState } from "react"
import Link from "next/link"

// Wallet
import { useWallet, useConnection } from "@solana/wallet-adapter-react"

// Components
import { RequestAirdrop } from "../../components/RequestAirdrop"
import pkg from "../../../package.json"


export const HomeView: FC = ({}) => {
  const wallet = useWallet()
  const { connection } = useConnection()

  useEffect(() => {
    if (wallet.publicKey) {
      console.log(wallet.publicKey.toBase58())
    }
  }, [wallet.publicKey, connection])

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
          {/* {wallet.publicKey && <p>Public Key: {wallet.publicKey.toBase58()}</p>} */}
        </div>
      </div>
    </div>
  )
}
