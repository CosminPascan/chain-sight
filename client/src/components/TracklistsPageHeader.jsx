const TracklistsPageHeader = ({ setVisible }) => {
    return (
        <div className='flex items-center justify-center py-5 space-x-14'>
            <h1 className='text-xl font-bold'>Tracklists</h1>
            <button className='green-btn' onClick={() => setVisible(true)}>
                Add tracklist
            </button>
        </div>
    )
}

export default TracklistsPageHeader
