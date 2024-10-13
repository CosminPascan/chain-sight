import { useState } from 'react'
import { selectOptions } from '../../constants'
import axios from 'axios'
import formatNumber from '../../utils/formatNumber'
import ChainSelect from './ChainSelect'
import TokenSelect from './TokenSelect'
import TracklistSelect from './TracklistSelect'
import WalletSelect from './WalletSelect'
import Transactions from './Transactions'

const TrackPage = () => {
    const [chain, setChain] = useState({})
    const [contract, setContract] = useState({})
    const [tracklist, setTracklist] = useState({})
    const [wallet, setWallet] = useState({})

    const [transactions, setTransactions] = useState([])

    const onChainChange = (c) => {
        setChain(c)
    }

    const onContractSelect = (c) => {
        setContract(c)
    }

    const onTracklistChange = (t) => {
        setTracklist(t)
    }

    const onWalletChange = (w) => {
        setWallet(w)
    }

    const fetchAPI = async () => {
        if (Object.keys(contract).length === 0) {
            alert(`Please ${selectOptions[0].toLowerCase()}!`)
            return
        }
        if (Object.keys(contract).length === 0) {
            alert(`Please ${selectOptions[1].toLowerCase()}!`)
            return
        }
        if (Object.keys(tracklist).length === 0) {
            alert(`Please ${selectOptions[2].toLowerCase()}!`)
            return
        }
        if (Object.keys(wallet).length === 0) {
            alert(`Please ${selectOptions[3].toLowerCase()}!`)
            return
        }

        try {
            const response = await axios.get(
                `https://api.${chain.link}/api?module=account&action=tokentx&contractaddress=${contract.address}&address=${wallet.address}&page=1&offset=10&startblock=0&endblock=99999999&sort=desc&apikey=${chain.key}`
            )
            let events = response.data.result
            events.forEach((e) => {
                const date = new Date(e.timeStamp * 1000).toLocaleString()
                e.date = date
                const value = formatNumber(e.value / Math.pow(10, e.tokenDecimal))
                e.value = value
                e.from = wallet.nickname
            })
            setTransactions(events)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <section className='section'>
            <h1 className='title'>Start Tracking a Wallet</h1>
            <div className='h-10 flex items-center justify-center space-x-20'>
                <ChainSelect onChainChange={onChainChange} />
                <TokenSelect chain={chain} onContractSelect={onContractSelect} />
                <TracklistSelect onTracklistChange={onTracklistChange} />
                <WalletSelect tracklist={tracklist} onWalletChange={onWalletChange} />
                <button className='blue-btn' onClick={() => fetchAPI()}>
                    Track
                </button>
            </div>
            {transactions.length > 0 && <Transactions transactions={transactions} />}
            {transactions.length === 0 && <div>No transactions available...</div>}
        </section>
    )
}

export default TrackPage
