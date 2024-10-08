import TokensList from '../components/TokensList'

const TokensPage = () => {
    return (
        <section className='w-full flex flex-col items-center justify-center my-10 space-y-10'>
            <h1 className='text-center text-3xl font-bold'>Cryptocurrency Prices by CoinGecko API</h1>
            <TokensList />
        </section>
    )
}

export default TokensPage
