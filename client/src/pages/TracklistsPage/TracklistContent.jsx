import { useUpdateSelectedTracklist } from '../../hooks/useSelectedTracklistContext'

const TracklistContent = ({ tracklist }) => {
    const updateSelectedTracklist = useUpdateSelectedTracklist()

    const handleTracklistClick = () => {
        updateSelectedTracklist({ selected: true, ...tracklist })
    }

    return (
        <div
            className='cursor-pointer px-5 py-2 rounded-3xl font-medium bg-gray-200 hover:bg-gray-300'
            onClick={() => handleTracklistClick()}
        >
            {tracklist.name}
        </div>
    )
}

export default TracklistContent
