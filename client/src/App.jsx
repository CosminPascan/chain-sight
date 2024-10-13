import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import TokensPage from './pages/TokensPage'
import TracklistsPage from './pages/TracklistsPage'
import { TracklistsProvider } from './context/TracklistsContext'
import TrackPage from './pages/TrackPage'
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'
import Register from './components/Register'

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route
                    path='/cryptocurrencies'
                    element={
                        <ProtectedRoute>
                            <TokensPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='/tracklists'
                    element={
                        <ProtectedRoute>
                            <TracklistsProvider>
                                <TracklistsPage />
                            </TracklistsProvider>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='/track'
                    element={
                        <ProtectedRoute>
                            <TrackPage />
                        </ProtectedRoute>
                    }
                />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='*' element={<Navigate to='/login' />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
