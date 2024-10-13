import { useState } from 'react'
import { useWalletsContext } from '../../hooks/useWalletsContext'
import { axiosInstance } from '../../api/axios'

const EditWalletForm = ({ wallet, setEditWallet }) => {
    const [nickname, setNickname] = useState(wallet.nickname)
    const [address, setAddress] = useState(wallet.address)

    const { dispatch } = useWalletsContext()

    const editWallet = async () => {
        await axiosInstance.put(
            `/wallets/${wallet.id}`,
            JSON.stringify({ nickname: nickname, address: address })
        )
        wallet.nickname = nickname
        wallet.address = address
        dispatch({ type: 'UPDATE_WALLET', payload: wallet })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await editWallet()
            setNickname('')
            setAddress('')
            setEditWallet(false)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='form-container'>
            <form className='form' onSubmit={handleSubmit}>
                <h1 className='title'>Edit wallet</h1>
                <div className='input-container'>
                    <label className='font-medium'>Wallet Nickname</label>
                    <input
                        className='input'
                        type='text'
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        required
                    />
                </div>
                <div className='input-container'>
                    <label className='font-medium'>Wallet Address</label>
                    <input
                        className='input'
                        type='text'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </div>
                <div className='form-btns-container'>
                    <button className='blue-btn' type='submit'>
                        Save
                    </button>
                    <button
                        className='red-btn'
                        type='button'
                        onClick={() => setEditWallet(false)}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}

export default EditWalletForm
