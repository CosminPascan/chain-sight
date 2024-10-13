import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { axiosInstance } from '../api/axios'
import { FaAt, FaLock } from 'react-icons/fa'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axiosInstance.post(
                '/login',
                JSON.stringify({ email, password })
            )
            localStorage.setItem('access-token', response.data.accessToken)
            navigate('/cryptocurrencies')
        } catch (error) {
            if (error.status === 404) alert(`${error.response.data.message}`)
            // console.log(error.response.data.message)
            setEmail('')
            setPassword('')
        }
    }

    return (
        <div className='form-container'>
            <form className='form' onSubmit={handleSubmit}>
                <h1 className='title'>Login</h1>
                <div className='input-container relative'>
                    <input
                        className='input w-80'
                        type='email'
                        placeholder='Enter your email...'
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                    />
                    <FaAt className='absolute right-4' />
                </div>
                <div className='input-container relative'>
                    <input
                        className='input w-80'
                        type='password'
                        placeholder='Enter your password...'
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                    />
                    <FaLock className='absolute right-4' />
                </div>
                <button className='green-btn' type='submit'>
                    Login
                </button>
                <div className='flex items-center justify-center'>
                    <p>Don't have an account?&nbsp;</p>
                    <a className='underline hover:text-blue-600' href='/register'>
                        Register
                    </a>
                </div>
            </form>
        </div>
    )
}

export default Login
