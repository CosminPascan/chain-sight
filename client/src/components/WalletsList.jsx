import { useEffect, useState } from 'react'
import { axiosInstance } from '../api/axios'
import { useTracklist } from '../hooks/useSelectTracklistContext'
import { useWalletsContext } from '../hooks/useWalletsContext'
import { FaPlus } from 'react-icons/fa'
import { FaEdit, FaTrash } from 'react-icons/fa'
import AddWalletForm from './AddWalletForm'
import EditWalletForm from './EditWalletForm'

const WalletsList = () => {
    const [addWalletVisible, setAddWalletVisible] = useState(false)
    const [editWalletVisible, setEditWalletVisible] = useState(false)
    const [wallet, setWallet] = useState({})

    const { wallets, dispatch } = useWalletsContext()

    const tracklist = useTracklist()

    const deleteWallet = async (wallet) => {
        await axiosInstance.delete(`/wallets/${wallet.id}`)
        dispatch({ type: 'DELETE_WALLET', payload: wallet })
    }

    useEffect(() => {
        const fetchWallets = async (tracklistId) => {
            const response = await axiosInstance.get(`/wallets/${tracklistId}`)
            dispatch({ type: 'SET_WALLETS', payload: response.data })
        }
        fetchWallets(tracklist.id)
    }, [tracklist])

    return (
        <div className='mx-20 space-y-5'>
            {addWalletVisible && (
                <AddWalletForm setAddWalletVisible={setAddWalletVisible} />
            )}
            {editWalletVisible && (
                <EditWalletForm
                    wallet={wallet}
                    setEditWalletVisible={setEditWalletVisible}
                />
            )}
            <button
                className='green-btn flex items-center justify-center space-x-2'
                onClick={() => setAddWalletVisible(true)}
            >
                <FaPlus />
                <p>Add Wallet</p>
            </button>

            {wallets.length > 0 && (
                <table>
                    <thead>
                        <tr>
                            <th>Nickname</th>
                            <th>Address</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {wallets.map((wallet, index) => (
                            <tr key={index}>
                                <td>{wallet.nickname}</td>
                                <td>{wallet.address}</td>
                                <td className='space-x-5'>
                                    <button
                                        className='blue-icon-btn'
                                        onClick={() => {
                                            setWallet(wallet)
                                            setEditWalletVisible(true)
                                        }}
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        className='red-icon-btn'
                                        onClick={() => deleteWallet(wallet)}
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default WalletsList
