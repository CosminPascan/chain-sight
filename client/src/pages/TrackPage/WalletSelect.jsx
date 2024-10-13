import { useEffect, useState } from 'react'
import { selectOptions } from '../../constants'
import { axiosInstance } from '../../api/axios'

const WalletSelect = ({ tracklist, onWalletChange }) => {
    const [wallets, setWallets] = useState([])

    useEffect(() => {
        const fetchWallets = async (tracklistId) => {
            const response = await axiosInstance.get(`/wallets/${tracklistId}`)
            setWallets(response.data)
        }
        if (Object.keys(tracklist).length) fetchWallets(tracklist.id)
    }, [tracklist])

    return (
        <select
            className='select'
            onChange={(e) => {
                e.preventDefault()
                const arr = wallets.filter((w) => w.nickname === e.target.value)
                const wallet = arr.length > 0 ? arr[0] : {}
                onWalletChange(wallet)
            }}
        >
            <option>{selectOptions[3]}</option>
            {wallets.length > 0 &&
                wallets.map((wallet, index) => {
                    return <option key={index}>{wallet.nickname}</option>
                })}
        </select>
    )
}

export default WalletSelect
