import { createContext, useState } from 'react'

const SelectedTracklistContext = createContext()

const SelectedTracklistProvider = ({ children }) => {
    const [tracklist, setTracklist] = useState({ selected: false })

    return (
        <SelectedTracklistContext.Provider
            value={{
                tracklist,
                setTracklist,
            }}
        >
            {children}
        </SelectedTracklistContext.Provider>
    )
}

export { SelectedTracklistContext, SelectedTracklistProvider }
