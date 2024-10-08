import { useTracklistsContext } from '../hooks/useTracklistsContext'
import {
    useTracklist,
    useUpdateSelected,
} from '../hooks/useSelectTracklistContext'
import { axiosInstance } from '../api/axios'

const TracklistHeader = ({ setVisible }) => {
    const { dispatch } = useTracklistsContext()

    const tracklist = useTracklist()
    const updateSelected = useUpdateSelected()

    const deleteTracklist = async (tracklist) => {
        await axiosInstance.delete(`/tracklists/${tracklist.id}`)
        dispatch({ type: 'DELETE_TRACKLIST', payload: tracklist })
        updateSelected(false)
    }

    return (
        <div className='flex items-center justify-start mx-20 my-5 space-x-10'>
            <h1 className='text-center text-3xl font-bold'>
                {tracklist.name}
            </h1>
            <button className='blue-btn' onClick={() => setVisible(true)}>
                Edit
            </button>
            <button
                className='red-btn'
                onClick={() => deleteTracklist(tracklist)}
            >
                Delete
            </button>
        </div>
    )
}

export default TracklistHeader
