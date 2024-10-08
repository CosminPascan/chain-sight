import { useState } from 'react'
import { useSelected } from '../hooks/useSelectTracklistContext'
import TracklistsPageHeader from '../components/TracklistsPageHeader'
import TracklistsList from '../components/TracklistsList'
import TracklistHeader from '../components/TracklistHeader'
import { WalletsProvider } from '../context/WalletsContext'
import WalletsList from '../components/WalletsList'
import AddTracklistForm from '../components/AddTracklistForm'
import EditTracklistForm from '../components/EditTracklistForm'

const TracklistsPage = () => {
    const [addVisible, setAddVisible] = useState(false)
    const [editVisible, setEditVisible] = useState(false)

    const selected = useSelected()

    return (
        <section className='w-full'>
            <TracklistsPageHeader setVisible={setAddVisible} />
            <TracklistsList />
            {selected && <TracklistHeader setVisible={setEditVisible} />}
            {selected && (
                <WalletsProvider>
                    <WalletsList />
                </WalletsProvider>
            )}
            {addVisible && <AddTracklistForm setVisible={setAddVisible} />}
            {editVisible && <EditTracklistForm setVisible={setEditVisible} />}
        </section>
    )
}

export default TracklistsPage
