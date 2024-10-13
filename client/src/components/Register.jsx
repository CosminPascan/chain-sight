import { Navigate } from 'react-router-dom'
import { axiosInstance } from '../api/axios'
import { useState } from 'react'
import { FaAt, FaLock, FaUser } from 'react-icons/fa'

const Register = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [registered, setRegistered] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            alert(`Passwords don't match!`)
        }

        try {
            await axiosInstance.post(
                '/register',
                JSON.stringify({ username, email, password })
            )
            setRegistered(true)
        } catch (error) {
            if (error.status === 409) alert(`${error.response.data.message}`)
            // console.log(error.response.data.message)
            setEmail('')
            setPassword('')
            setConfirmPassword('')
        }
    }

    if (registered) return <Navigate to='/login' />

    return (
        <div className='form-container'>
            <form className='form' onSubmit={handleSubmit}>
                <h1 className='title'>Register</h1>
                <div className='input-container relative'>
                    <input
                        className='input w-80'
                        type='text'
                        placeholder='Enter a username'
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        required
                    />
                    <FaUser className='absolute right-4' />
                </div>
                <div className='input-container relative'>
                    <input
                        className='input w-80'
                        type='email'
                        placeholder='Enter your email'
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
                        placeholder='Enter a password'
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        minLength={3}
                        required
                    />
                    <FaLock className='absolute right-4' />
                </div>
                <div className='input-container relative'>
                    <input
                        className='input w-80'
                        type='password'
                        placeholder='Confirm your password'
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        value={confirmPassword}
                        minLength={3}
                        required
                    />
                    <FaLock className='absolute right-4' />
                </div>
                <button className='green-btn' type='submit'>
                    Create account
                </button>
                <div className='flex items-center justify-center'>
                    <p>Already have an account?&nbsp;</p>
                    <a className='underline hover:text-blue-600' href='/login'>
                        Login
                    </a>
                </div>
            </form>
        </div>
    )
}

export default Register
