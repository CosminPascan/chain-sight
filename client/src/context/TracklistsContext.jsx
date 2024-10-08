import { createContext, useReducer } from 'react'
import { SelectTracklistProvider } from './SelectTracklistContext'

const TracklistsContext = createContext()

const tracklistsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_TRACKLISTS':
            return {
                tracklists: action.payload,
            }
        case 'CREATE_TRACKLIST':
            return {
                tracklists: [...state.tracklists, action.payload],
            }
        case 'UPDATE_TRACKLIST':
            return {
                tracklists: state.tracklists.map((t) => t.id === action.payload.id ? action.payload : t)
            }
        case 'DELETE_TRACKLIST':
            return {
                tracklists: state.tracklists.filter(
                    (t) => t.id !== action.payload.id
                ),
            }
        default:
            return state
    }
}

const TracklistsProvider = ({ children }) => {
    const [state, dispatch] = useReducer(tracklistsReducer, {
        tracklists: null,
    })

    return (
        <TracklistsContext.Provider value={{ ...state, dispatch }}>
            <SelectTracklistProvider>{children}</SelectTracklistProvider>
        </TracklistsContext.Provider>
    )
}

export { TracklistsContext, TracklistsProvider }
