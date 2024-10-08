import { useContext } from 'react'
import { TracklistsContext } from '../context/TracklistsContext'

const useTracklistsContext = () => {
    const context = useContext(TracklistsContext)

    if (context === undefined || context === null) {
        throw new Error('error')
    }

    return context
}

export { useTracklistsContext }
