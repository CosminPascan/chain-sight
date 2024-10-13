import { useContext } from 'react'
import { SelectedTracklistContext } from '../context/SelectedTracklistContext'

const useSelectedTracklist = () => {
    const context = useContext(SelectedTracklistContext)

    if (context === undefined || context === null) {
        throw new Error('error')
    }

    return context.tracklist
}

const useUpdateSelectedTracklist = () => {
    const context = useContext(SelectedTracklistContext)

    if (context === undefined || context === null) {
        throw new Error('error')
    }

    return context.setTracklist
}

export { useSelectedTracklist, useUpdateSelectedTracklist }
