import { useContext } from 'react'
import { SelectTracklistContext } from '../context/SelectTracklistContext'

const useTracklist = () => {
    const context = useContext(SelectTracklistContext)

    if (context === undefined || context === null) {
        throw new Error('error')
    }

    return context.tracklist
}

const useUpdateTracklist = () => {
    const context = useContext(SelectTracklistContext)

    if (context === undefined || context === null) {
        throw new Error('error')
    }

    return context.updateTracklist
}

const useSelected = () => {
    const context = useContext(SelectTracklistContext)

    if (context === undefined || context === null) {
        throw new Error('error')
    }

    return context.selected
}

const useUpdateSelected = () => {
    const context = useContext(SelectTracklistContext)

    if (context === undefined || context === null) {
        throw new Error('error')
    }

    return context.updateSelected
}

export { useTracklist, useUpdateTracklist, useSelected, useUpdateSelected }
