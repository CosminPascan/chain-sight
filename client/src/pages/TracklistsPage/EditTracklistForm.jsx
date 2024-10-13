import { useState } from 'react'
import { useTracklistsContext } from '../../hooks/useTracklistsContext'
import { axiosInstance } from '../../api/axios'

const EditTracklistForm = ({ tracklist, setEditTracklist }) => {
    const [name, setName] = useState(tracklist.name)

    const { dispatch } = useTracklistsContext()

    const editTracklist = async () => {
        await axiosInstance.put(
            `/tracklists/${tracklist.id}`,
            JSON.stringify({ name: name })
        )
        tracklist.name = name
        dispatch({ type: 'UPDATE_TRACKLIST', payload: tracklist })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await editTracklist()
            setName('')
            setEditTracklist(false)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='form-container'>
            <form className='form' onSubmit={handleSubmit}>
                <h1 className='title'>Edit tracklist</h1>
                <div className='input-container'>
                    <label className='font-medium'>Tracklist Name</label>
                    <input
                        className='input'
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className='form-btns-container'>
                    <button className='blue-btn' type='submit'>
                        Save
                    </button>
                    <button
                        className='red-btn'
                        type='button'
                        onClick={() => setEditTracklist(false)}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}

export default EditTracklistForm
