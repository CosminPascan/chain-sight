import { useContext } from 'react'
import { WalletsContext } from '../context/WalletsContext'

const useWalletsContext = () => {
    const context = useContext(WalletsContext)

    if (context === undefined || context === null) {
        throw new Error('error')
    }

    return context
}

export { useWalletsContext }
