import { useState } from 'react'
import { useWalletsContext } from '../hooks/useWalletsContext'
import { useTracklist } from '../hooks/useSelectTracklistContext'
import { axiosInstance } from '../api/axios'

const AddWalletForm = ({ setAddWalletVisible }) => {
    const [nickname, setNickname] = useState('')
    const [address, setAddress] = useState('')

    const { dispatch } = useWalletsContext()

    const tracklist = useTracklist()

    const createWallet = async () => {
        const response = await axiosInstance.post(
            `/wallets/${tracklist.id}`,
            JSON.stringify({ nickname, address })
        )
        dispatch({ type: 'CREATE_WALLET', payload: response.data })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        await createWallet()
        setNickname('')
        setAddress('')
        setAddWalletVisible(false)
    }

    return (
        <div className='fixed w-full h-full top-0 left-0 flex items-center justify-center bg-gray-400 bg-opacity-70'>
            <form
                onSubmit={handleSubmit}
                className='flex flex-col rounded-3xl space-y-10 px-10 py-10 bg-white'
            >
                <h1 className='text-center text-xl font-bold'>Add wallet</h1>
                <div className='space-x-10 flex items-center justify-between'>
                    <label className='font-medium'>Wallet Nickname</label>
                    <input
                        className='px-6 py-2 border border-solid rounded-md border-black outline-0'
                        type='text'
                        placeholder='Enter wallet nickname...'
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        required
                    />
                </div>
                <div className='space-x-10 flex items-center justify-between'>
                    <label className='font-medium'>Wallet Address</label>
                    <input
                        className='px-6 py-2 border border-solid rounded-md border-black outline-0'
                        type='text'
                        placeholder='Enter wallet address...'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </div>
                <div className='flex items-center justify-center space-x-14'>
                    <button className='green-btn'>Create</button>
                    <button
                        className='red-btn'
                        onClick={() => setAddWalletVisible(false)}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddWalletForm
