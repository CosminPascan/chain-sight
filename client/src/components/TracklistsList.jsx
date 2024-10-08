import { useEffect } from 'react'
import { useTracklistsContext } from '../hooks/useTracklistsContext'
import {
    useUpdateSelected,
    useUpdateTracklist,
} from '../hooks/useSelectTracklistContext'
import { axiosInstance } from '../api/axios'

const TracklistsList = () => {
    const { tracklists, dispatch } = useTracklistsContext()

    const updateTracklist = useUpdateTracklist()
    const updateSelected = useUpdateSelected()

    const handleTracklistClick = (tracklist) => {
        updateTracklist(tracklist)
        updateSelected(true)
    }

    useEffect(() => {
        const fetchTracklists = async () => {
            const response = await axiosInstance.get('/tracklists')
            dispatch({
                type: 'SET_TRACKLISTS',
                payload: response.data,
            })
        }

        fetchTracklists()
    }, [])

    return (
        <div className='flex flex-wrap items-center justify-start px-20 space-x-14'>
            {tracklists &&
                tracklists.map((tracklist, index) => (
                    <p
                        className='cursor-pointer rounded-full my-5 px-5 py-2 font-bold bg-gray-200 hover:bg-gray-300'
                        key={index}
                        onClick={() => handleTracklistClick(tracklist)}
                    >
                        {tracklist.name}
                    </p>
                ))}
        </div>
    )
}

export default TracklistsList
