import axios from 'axios'

const coinGeckoKey = import.meta.env.VITE_COINGECKO_API_KEY

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5010/api',
    headers: { 'Content-Type': 'application/json' },
})

const axiosCoinGecko = axios.create({
    baseURL: 'https://api.coingecko.com/api/v3',
    headers: {
        'Content-Type': 'application/json',
        'x-cg-demo-api-key': `${coinGeckoKey}`,
    },
})

export { axiosInstance, axiosCoinGecko }
