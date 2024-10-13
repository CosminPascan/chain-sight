import { useState } from 'react'
import { useTracklistsContext } from '../../hooks/useTracklistsContext'
import { axiosInstance } from '../../api/axios'

const AddTracklistForm = ({ setAddTracklist }) => {
    const [name, setName] = useState('')

    const { dispatch } = useTracklistsContext()

    const createTracklist = async () => {
        const response = await axiosInstance.post(`/tracklists`, JSON.stringify({ name }))
        dispatch({ type: 'CREATE_TRACKLIST', payload: response.data })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await createTracklist()
            setName('')
            setAddTracklist(false)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='form-container'>
            <form className='form' onSubmit={handleSubmit}>
                <h1 className='title'>Add tracklist</h1>
                <div className='input-container'>
                    <label className='font-medium'>Tracklist Name</label>
                    <input
                        className='input'
                        type='text'
                        placeholder='Enter tracklist name...'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className='form-btns-container'>
                    <button className='green-btn' type='submit'>
                        Create
                    </button>
                    <button
                        className='red-btn'
                        type='button'
                        onClick={() => setAddTracklist(false)}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddTracklistForm
