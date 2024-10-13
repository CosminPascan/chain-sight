import { useState, useEffect } from 'react'
import { axiosInstance, axiosCoinGecko } from '../../api/axios'
import { tokensHeader } from '../../constants'
import TokenContent from './TokenContent'

const Tokens = () => {
    const [tokens, setTokens] = useState([])

    useEffect(() => {
        const fetchTokens = async () => {
            let tokensArray = []
            let tokenIds = ''

            try {
                const response = await axiosInstance.get('/tokens')
                tokensArray = response.data
            } catch (error) {
                console.log(error)
            }

            if (tokensArray.length === 0) return

            tokensArray.forEach((t) => {
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
        fetchTokens()
    }, [])

    if (tokens.length === 0) return <div>No tokens available...</div>

    return (
        <>
            {tokens.length > 0 && (
                <div className='overflow-y-scroll h-96'>
                    <table>
                        <thead>
                            <tr>
                                {tokensHeader.map((value, index) => (
                                    <th key={index}>{value}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {tokens.map((token, index) => (
                                <TokenContent key={index} token={token} />
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    )
}

export default Tokens
