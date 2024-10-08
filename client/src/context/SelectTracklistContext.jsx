import { createContext, useState } from 'react'

const SelectTracklistContext = createContext()

const SelectTracklistProvider = ({ children }) => {
    const [tracklist, updateTracklist] = useState({})
    const [selected, updateSelected] = useState(false)

    return (
        <SelectTracklistContext.Provider
            value={{ tracklist, updateTracklist, selected, updateSelected }}
        >
            {children}
        </SelectTracklistContext.Provider>
    )
}

export { SelectTracklistContext, SelectTracklistProvider }
