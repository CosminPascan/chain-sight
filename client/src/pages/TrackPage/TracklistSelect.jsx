import { useEffect, useState } from 'react'
import { axiosInstance } from '../../api/axios'
import { selectOptions } from '../../constants'

const TracklistSelect = ({ onTracklistChange }) => {
    const [tracklists, setTracklists] = useState([])

    useEffect(() => {
        const fetchTracklists = async () => {
            const response = await axiosInstance.get('/tracklists')
            setTracklists(response.data)
        }
        fetchTracklists()
    }, [])

    return (
        <select
            className='select'
            onChange={(e) => {
                e.preventDefault()
                const arr = tracklists.filter((t) => t.name === e.target.value)
                const tracklist = arr.length > 0 ? arr[0] : {}
                onTracklistChange(tracklist)
            }}
        >
            <option>{selectOptions[2]}</option>
            {tracklists.length > 0 &&
                tracklists.map((tracklist, index) => {
                    return <option key={index}>{tracklist.name}</option>
                })}
        </select>
    )
}

export default TracklistSelect
