const Transactions = ({ transactions }) => {
    const x = 1

    return (
        <div className='overflow-y-scroll h-96 my-6'>
            {transactions.length > 0 && (
                <table>
                    <thead>
                        <tr>
                            <th>Value</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Date</th>
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
            )}
        </div>
    )
}

export default Transactions
