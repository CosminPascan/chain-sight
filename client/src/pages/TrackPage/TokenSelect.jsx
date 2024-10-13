import { useState, useEffect } from 'react'
import { selectOptions } from '../../constants'
import { axiosInstance } from '../../api/axios'

const TokenSelect = ({ chain, onContractSelect }) => {
    const [contracts, setContracts] = useState([])

    useEffect(() => {
        const fetchContracts = async (chainName) => {
            const response = await axiosInstance.get(`/contracts/${chainName}`)
            setContracts(response.data)
        }
        if (Object.keys(chain).length) fetchContracts(chain.name)
    }, [chain])

    return (
        <select
            className='select'
            onChange={(e) => {
                e.preventDefault()
                const arr = contracts.filter((c) => c.token.name === e.target.value)
                const contract = arr.length > 0 ? arr[0] : {}
                onContractSelect(contract)
            }}
        >
            <option>{selectOptions[1]}</option>
            {contracts.length > 0 &&
                contracts.map((contract, index) => {
                    return <option key={index}>{contract.token.name}</option>
                })}
        </select>
    )
}

export default TokenSelect
