import { Link } from 'react-router-dom'
import { navbar } from '../constants'

const Navbar = () => {
    return (
        <header className='w-full'>
            <nav className='flex items-center justify-center py-8 bg-gray-100'>
                <ul className='flex items-center justify-center space-x-14 font-bold'>
                    {navbar.map((link, index) => (
                        <li className='hover:text-blue-600' key={index}>
                            <Link to={link.href}>{link.label}</Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    )
}

export default Navbar
