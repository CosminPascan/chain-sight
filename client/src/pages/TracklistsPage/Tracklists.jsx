import { useTracklistsContext } from '../../hooks/useTracklistsContext'
import { useEffect } from 'react'
import { axiosInstance } from '../../api/axios'
import { FaPlus } from 'react-icons/fa'
import TracklistContent from './TracklistContent'

const Tracklists = ({ setAddTracklist }) => {
    const { tracklists, dispatch } = useTracklistsContext()

    useEffect(() => {
        const fetchTracklists = async () => {
            try {
                const response = await axiosInstance.get('/tracklists')
                dispatch({
                    type: 'SET_TRACKLISTS',
                    payload: response.data,
                })
            } catch (error) {
                console.log(error)
            }
        }
        fetchTracklists()
    }, [])

    return (
        <div className='flex items-center justify-center py-10 space-x-14'>
            <button
                className='green-btn flex items-center justify-center space-x-2'
                onClick={() => setAddTracklist(true)}
            >
                <FaPlus />
                <p>Add tracklist</p>
            </button>
            {tracklists.length > 0 &&
                tracklists.map((tracklist, index) => (
                    <TracklistContent key={index} tracklist={tracklist} />
                ))}
        </div>
    )
}

export default Tracklists
