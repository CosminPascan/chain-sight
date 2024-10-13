import { useState } from 'react'
import { useSelectedTracklist } from '../../hooks/useSelectedTracklistContext'

import Tracklists from './Tracklists'
import TracklistHeader from './TracklistHeader'
import { WalletsProvider } from '../../context/WalletsContext'

import AddTracklistForm from './AddTracklistForm'
import EditTracklistForm from './EditTracklistForm'
import WalletsSection from '../WalletsSection/WalletsSection'

const TracklistsPage = () => {
    const [addTracklist, setAddTracklist] = useState(false)
    const [editTracklist, setEditTracklist] = useState(false)

    const tracklist = useSelectedTracklist()

    return (
        <section className='w-full px-20 space-y-5'>
            <Tracklists setAddTracklist={setAddTracklist} />
            {tracklist.selected && (
                <TracklistHeader setEditTracklist={setEditTracklist} />
            )}

            {tracklist.selected && (
                <WalletsProvider>
                    <WalletsSection />
                </WalletsProvider>
            )}
            {addTracklist && <AddTracklistForm setAddTracklist={setAddTracklist} />}
            {editTracklist && (
                <EditTracklistForm
                    tracklist={tracklist}
                    setEditTracklist={setEditTracklist}
                />
            )}
        </section>
    )
}

export default TracklistsPage
