import { useEffect, useState } from 'react'
import { chains } from '../constants'
import { axiosInstance } from '../api/axios'
import axios from 'axios'
import Transactions from '../components/Transactions'
import formatNumber from '../utils/formatNumber'

const TrackPage = () => {
    const [transactions, setTransactions] = useState([])

    const [chain, setChain] = useState('')
    const [contracts, setContracts] = useState([])
    const [contract, setContract] = useState([])
    const [tracklists, setTracklists] = useState([])
    const [tracklist, setTracklist] = useState(null)
    const [wallets, setWallets] = useState([])
    const [wallet, setWallet] = useState([])

    const handleChainChange = (e) => {
        e.preventDefault()
        setChain(e.target.value)
    }

    const handleContractChange = (e) => {
        e.preventDefault()
        const arr = contracts.filter((c) => c.token.name === e.target.value)
        setContract(arr[0])
    }

    const handleTracklistChange = (e) => {
        e.preventDefault()
        const arr = tracklists.filter((t) => t.name === e.target.value)
        setTracklist(arr[0])
    }

    const handleWalletChange = (e) => {
        e.preventDefault()
        const arr = wallets.filter((w) => w.nickname === e.target.value)
        setWallet(arr[0])
    }

    const fetchAPI = async () => {
        const etherKey = import.meta.env.VITE_ETHERSCAN_API_KEY

        try {
            const response = await axios.get(
                `https://api.etherscan.io/api?module=account&action=tokentx&contractaddress=${contract.address}&address=${wallet.address}&page=1&offset=10&startblock=0&endblock=99999999&sort=desc&apikey=${etherKey}`
            )
            let events = response.data.result
            events.forEach((e) => {
                var date = new Date(e.timeStamp * 1000).toLocaleString()
                e.date = date
                var value = formatNumber(e.value / Math.pow(10, e.tokenDecimal))
                e.value = value
                e.from = wallet.nickname
            })
            setTransactions(events)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const fetchContracts = async (chain) => {
            const response = await axiosInstance.get(`/contracts/${chain}`)
            setContracts(response.data)
        }

        const fetchTracklists = async () => {
            const response = await axiosInstance.get('/tracklists')
            setTracklists(response.data)
        }

        const fetchWallets = async (tracklistId) => {
            const response = await axiosInstance.get(`/wallets/${tracklistId}`)
            setWallets(response.data)
        }

        if (chain.length > 0) fetchContracts(chain)

        if (tracklists.length === 0) fetchTracklists()

        if (tracklist) fetchWallets(tracklist.id)
    }, [chain, tracklist])

    return (
        <div className='flex flex-col items-center justify-center'>
            <div className='h-10 flex items-center justify-center my-10 space-x-20'>
                <div className='space-y-4'>
                    <h1 className='text-center text-lg font-bold'>
                        Select chain
                    </h1>
                    <select
                        className='p-2 border border-solid rounded-md border-black outline-0'
                        onChange={(e) => handleChainChange(e)}
                    >
                        <option selected disabled hidden>
                            chain
                        </option>
                        {chains.map((chain, index) => {
                            return (
                                <option key={index} value={chain.name}>
                                    {chain.name}
                                </option>
                            )
                        })}
                    </select>
                </div>

                <div className='space-y-4'>
                    <h1 className='text-center text-lg font-bold'>
                        Select token
                    </h1>
                    <select
                        className='p-2 border border-solid rounded-md border-black outline-0'
                        onChange={(e) => handleContractChange(e)}
                    >
                        <option selected disabled hidden>
                            token
                        </option>
                        {contracts.length &&
                            contracts.map((contract, index) => {
                                return (
                                    <option key={index}>
                                        {contract.token.name}
                                    </option>
                                )
                            })}
                    </select>
                </div>

                <div className='space-y-4'>
                    <h1 className='text-center text-lg font-bold'>
                        Select tracklist
                    </h1>
                    <select
                        className='p-2 border border-solid rounded-md border-black outline-0'
                        onChange={(e) => handleTracklistChange(e)}
                    >
                        <option selected disabled hidden>
                            tracklist
                        </option>
                        {tracklists.length &&
                            tracklists.map((tracklist, index) => {
                                return (
                                    <option key={index}>
                                        {tracklist.name}
                                    </option>
                                )
                            })}
                    </select>
                </div>

                <div className='space-y-4'>
                    <h1 className='text-center text-lg font-bold'>
                        Select wallet
                    </h1>
                    <select
                        className='p-2 border border-solid rounded-md border-black outline-0'
                        onChange={(e) => handleWalletChange(e)}
                    >
                        <option selected disabled hidden>
                            wallet
                        </option>
                        {wallets.length &&
                            wallets.map((wallet, index) => {
                                return (
                                    <option key={index}>
                                        {wallet.nickname}
                                    </option>
                                )
                            })}
                    </select>
                </div>

                <button className='blue-btn' onClick={() => fetchAPI()}>
                    Track
                </button>
            </div>
            {transactions.length > 0 && (
                <Transactions transactions={transactions} />
            )}
        </div>
    )
}

export default TrackPage
