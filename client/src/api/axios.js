import axios from 'axios'

const coinGeckoKey = import.meta.env.VITE_COINGECKO_API_KEY

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5010/api',
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
})

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access-token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

const axiosCoinGecko = axios.create({
    baseURL: 'https://api.coingecko.com/api/v3',
    headers: {
        'Content-Type': 'application/json',
        'x-cg-demo-api-key': `${coinGeckoKey}`,
    },
})

export { axiosInstance, axiosCoinGecko }
