import { chains, selectOptions } from '../../constants'

const ChainSelect = ({ onChainChange }) => {
    return (
        <select
            className='select'
            onChange={(e) => {
                e.preventDefault()
                const arr = chains.filter((c) => c.name === e.target.value)
                const chain = arr.length > 0 ? arr[0] : {}
                onChainChange(chain)
            }}
        >
            <option>{selectOptions[0]}</option>
            {chains.map((chain, index) => {
                return <option key={index}>{chain.name}</option>
            })}
        </select>
    )
}

export default ChainSelect
