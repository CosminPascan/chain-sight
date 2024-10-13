import { useWalletsContext } from '../../hooks/useWalletsContext'
import { useSelectedTracklist } from '../../hooks/useSelectedTracklistContext'
import { useEffect } from 'react'
import { axiosInstance } from '../../api/axios'
import { walletsHeader } from '../../constants'
import { FaEdit, FaTrash } from 'react-icons/fa'

const Wallets = ({ setWallet, setEditWallet }) => {
    const { wallets, dispatch } = useWalletsContext()

    const tracklist = useSelectedTracklist()

    const deleteWallet = async (wallet) => {
        try {
            await axiosInstance.delete(`/wallets/${wallet.id}`)
            dispatch({ type: 'DELETE_WALLET', payload: wallet })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const fetchWallets = async (tracklistId) => {
            try {
                const response = await axiosInstance.get(`/wallets/${tracklistId}`)
                dispatch({ type: 'SET_WALLETS', payload: response.data })
            } catch (error) {
                console.log(error)
            }
        }
        fetchWallets(tracklist.id)
    }, [tracklist])

    return (
        <>
            {wallets.length > 0 && (
                <table>
                    <thead>
                        <tr>
                            {walletsHeader.map((value, index) => (
                                <th key={index}>{value}</th>
                            ))}
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
                                            setEditWallet(true)
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
        </>
    )
}

export default Wallets
