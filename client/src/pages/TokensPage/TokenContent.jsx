import formatNumber from '../../utils/formatNumber'

const TokenContent = ({ token }) => {
    const price = token.current_price
    const percentage = formatNumber(token.price_change_percentage_24h)

    return (
        <tr>
            <td>
                <img src={token.image} width={30} />
            </td>
            <td>{token.name}</td>
            <td>{token.symbol.toUpperCase()}</td>
            <td>{`$${price < 0.01 ? price : formatNumber(price)}`}</td>
            <td className={percentage < 0 ? 'text-red-500' : 'text-green-500'}>
                {`${Math.abs(percentage)}%`}
            </td>
            <td>${formatNumber(token.market_cap)}</td>
        </tr>
    )
}

export default TokenContent
