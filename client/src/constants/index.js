const navbar = [
    { href: 'cryptocurrencies', label: 'Cryptocurrencies' },
    { href: 'tracklists', label: 'Tracklists' },
    { href: 'track', label: 'Track' },
]

const tokensHeader = ['Logo', 'Name', 'Symbol', 'Price', '24h %', 'Market Cap']

const walletsHeader = ['Nickname', 'Address', 'Action']

const transactionsHeader = ['Value', 'From', 'To', 'Date']

const selectOptions = [
    'Select a chain',
    'Select a token',
    'Select a tracklist',
    'Select a wallet',
]

const chains = [
    {
        name: 'ethereum',
        link: 'etherscan.io',
        key: `${import.meta.env.VITE_ETHERSCAN_API_KEY}`,
    },
    {
        name: 'binance-smart-chain',
        link: 'bscscan.com',
        key: `${import.meta.env.VITE_BSCSCAN_API_KEY}`,
    },
]

export { navbar, tokensHeader, walletsHeader, transactionsHeader, selectOptions, chains }
