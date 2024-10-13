import { useState } from 'react'
import { useWalletsContext } from '../../hooks/useWalletsContext'
import { useSelectedTracklist } from '../../hooks/useSelectedTracklistContext'
import { axiosInstance } from '../../api/axios'

const AddWalletForm = ({ setAddWallet }) => {
    const [nickname, setNickname] = useState('')
    const [address, setAddress] = useState('')

    const { dispatch } = useWalletsContext()

    const tracklist = useSelectedTracklist()

    const createWallet = async () => {
        const response = await axiosInstance.post(
            `/wallets/${tracklist.id}`,
            JSON.stringify({ nickname, address })
        )
        dispatch({ type: 'CREATE_WALLET', payload: response.data })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await createWallet()
            setNickname('')
            setAddress('')
            setAddWallet(false)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='form-container'>
            <form className='form' onSubmit={handleSubmit}>
                <h1 className='title'>Add wallet</h1>
                <div className='input-container'>
                    <label className='font-medium'>Wallet Nickname</label>
                    <input
                        className='input'
                        type='text'
                        placeholder='Enter wallet nickname...'
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
                        placeholder='Enter wallet address...'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </div>
                <div className='form-btns-container'>
                    <button className='green-btn' type='submit'>
                        Create
                    </button>
                    <button
                        className='red-btn'
                        type='button'
                        onClick={() => setAddWallet(false)}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddWalletForm
