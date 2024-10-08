import { useState } from 'react'
import { useTracklistsContext } from '../hooks/useTracklistsContext'
import { axiosInstance } from '../api/axios'

const AddTracklistForm = ({ setVisible }) => {
    const [name, setName] = useState('')

    const { dispatch } = useTracklistsContext()

    const createTracklist = async () => {
        const response = await axiosInstance.post(
            `/tracklists`,
            JSON.stringify({ name })
        )
        dispatch({ type: 'CREATE_TRACKLIST', payload: response.data })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        await createTracklist()
        setName('')
        setVisible(false)
    }

    return (
        <div className='fixed w-full h-full top-0 left-0 flex items-center justify-center bg-gray-400 bg-opacity-70'>
            <form
                onSubmit={handleSubmit}
                className='flex flex-col rounded-3xl space-y-10 px-10 py-10 bg-white'
            >
                <h1 className='text-center text-xl font-bold'>Add tracklist</h1>
                <div className='space-x-10'>
                    <label className='font-medium'>Tracklist Name</label>
                    <input
                        className='px-6 py-2 border border-solid rounded-md border-black outline-0'
                        type='text'
                        placeholder='Enter tracklist name...'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className='flex items-center justify-center space-x-14'>
                    <button className='green-btn'>Create</button>
                    <button
                        className='red-btn'
                        onClick={() => setVisible(false)}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddTracklistForm
