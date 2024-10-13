import { useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import Wallets from './Wallets'
import AddWalletForm from './AddWalletForm'
import EditWalletForm from './EditWalletForm'

const WalletsSection = () => {
    const [addWallet, setAddWallet] = useState(false)
    const [editWallet, setEditWallet] = useState(false)
    const [wallet, setWallet] = useState({})

    return (
        <div>
            <button
                className='green-btn flex items-center justify-center my-5 space-x-2'
                onClick={() => setAddWallet(true)}
            >
                <FaPlus />
                <p>Add Wallet</p>
            </button>
            <Wallets wallet={wallet} setWallet={setWallet} setEditWallet={setEditWallet} />
            {addWallet && <AddWalletForm setAddWallet={setAddWallet} />}
            {editWallet && (
                <EditWalletForm wallet={wallet} setEditWallet={setEditWallet} />
            )}
        </div>
    )
}

export default WalletsSection
