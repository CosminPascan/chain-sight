import { transactionsHeader } from '../../constants'

const Transactions = ({ transactions }) => {
    return (
        <>
            {transactions.length > 0 && (
                <div className='overflow-y-scroll h-80'>
                    <table>
                        <thead>
                            <tr>
                                {transactionsHeader.map((value, index) => (
                                    <th key={index}>{value}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((transaction, index) => (
                                <tr key={index}>
                                    <td>${transaction.value}</td>
                                    <td>{transaction.from}</td>
                                    <td>{transaction.to}</td>
                                    <td>{transaction.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    )
}

export default Transactions
