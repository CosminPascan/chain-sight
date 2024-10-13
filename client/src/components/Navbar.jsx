import { Link, useNavigate } from 'react-router-dom'
import { navbar } from '../constants'

const Navbar = () => {
    const menu = localStorage.getItem('access-token') ? navbar : []

    let navigate = useNavigate()

    const handleLogout = () => {
        localStorage.clear()
        navigate('/login')
    }

    return (
        <nav className='h-[10vh] flex items-center justify-center bg-slate-100'>
            <ul className='flex items-center justify-center space-x-14 font-bold'>
                {menu.map((link, index) => (
                    <li className='hover:text-blue-600' key={index}>
                        <Link to={link.href}>{link.label}</Link>
                    </li>
                ))}
                {menu.length > 0 && (
                    <li>
                        <button className='red-btn' onClick={() => handleLogout()}>
                            Log out
                        </button>
                    </li>
                )}
            </ul>
        </nav>
    )
}

export default Navbar
