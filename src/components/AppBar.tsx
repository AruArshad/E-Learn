import { FC, useEffect } from "react"

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"

import Image from "next/image"
import appLogo from "../assets/eln.png"
import useUserELNBalanceStore from "stores/useUserELNBalanceStore"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"

export const AppBar: FC = (props) => {
  const wallet = useWallet()
  const { connection } = useConnection()

  const ELNbalance = useUserELNBalanceStore((s) => s.balance)
  const { getUserELNBalance } = useUserELNBalanceStore()

  useEffect(() => {
    if (wallet.publicKey) {
      console.log(wallet.publicKey.toBase58())
      getUserELNBalance(wallet.publicKey, connection)
    }
  }, [wallet.publicKey, connection, getUserELNBalance])


  return (
    <div>
      {/* NavBar / Header */}
      <div className="navbar flex flex-row md:mb-2 shadow-lg bg-neutral text-neutral-content">
        <div className="navbar-start">
          
        <Image src={appLogo} alt={""} className="mr2 w-59px"></Image>
        <div className="ml-3 font-serif text-xl font-bold text-transparent bg-clip-text bg-gradient-to-tr from-[#feb236] to-[#d64161]">E-Learn (ELN)</div>
        </div>

        {/* Wallet & Settings */}
        {wallet && <div className="font-roboto text-xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-tr from-[#feb236] to-[#d64161]"> {(ELNbalance || 0).toLocaleString()} ELN TOKEN BALANCE</div>}
        <div className="navbar-end">
          <WalletMultiButton className="btn btn-ghost mr-4 text-transparent bg-clip-text bg-gradient-to-tr from-[#feb236] to-[#d64161]" />
        
        </div>
      </div>
      {props.children}
    </div>
  )
}
