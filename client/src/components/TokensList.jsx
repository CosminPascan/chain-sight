import { useState, useEffect } from 'react'
import { axiosCoinGecko, axiosInstance } from '../api/axios'
import formatNumber from '../utils/formatNumber'

const TokensList = () => {
    const [tokens, setTokens] = useState([])

    const loadTokens = async () => {
        let tokensArray = []

        try {
            const response = await axiosInstance.get('/tokens/all')
            tokensArray = response.data.tokens
        } catch (error) {
            console.log(error)
        }

        if (tokensArray.length === 0) return

        let tokenIds = ''

        tokensArray.forEach(t => {
            if (tokenIds.length !== 0) tokenIds += ','
            tokenIds += t.coinGeckoId
        })

        try {
            const response = await axiosCoinGecko.get('/coins/markets', {
                params: {
                    vs_currency: 'usd',
                    ids: `${tokenIds}`,
                },
            })
            setTokens(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        loadTokens()
    }, [])

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Logo</th>
                        <th>Name</th>
                        <th>Symbol</th>
                        <th>Price</th>
                        <th>Market Cap</th>
                    </tr>
                </thead>
                <tbody>
                    {tokens.map((token, index) => (
                        <tr key={index}>
                            <td>
                                <img src={token.image} width={30} />
                            </td>
                            <td>{token.name}</td>
                            <td>{token.symbol.toUpperCase()}</td>
                            <td>${formatNumber(token.current_price)}</td>
                            <td>${formatNumber(token.market_cap)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TokensList
