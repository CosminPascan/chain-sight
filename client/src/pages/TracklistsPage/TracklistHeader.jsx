import {
    useSelectedTracklist,
    useUpdateSelectedTracklist,
} from '../../hooks/useSelectedTracklistContext'
import { useTracklistsContext } from '../../hooks/useTracklistsContext'
import { axiosInstance } from '../../api/axios'

const TracklistHeader = ({ setEditTracklist }) => {
    const tracklist = useSelectedTracklist()
    const updateTracklist = useUpdateSelectedTracklist()

    const { dispatch } = useTracklistsContext()

    const deleteTracklist = async () => {
        try {
            await axiosInstance.delete(`/tracklists/${tracklist.id}`)
            dispatch({ type: 'DELETE_TRACKLIST', payload: tracklist })
            updateTracklist({ selected: false })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='flex items-center justify-start space-x-10'>
            <h1 className='title'>{tracklist.name}</h1>
            <button className='blue-btn' onClick={() => setEditTracklist(true)}>
                Edit
            </button>
            <button className='red-btn' onClick={() => deleteTracklist()}>
                Delete
            </button>
        </div>
    )
}

export default TracklistHeader
