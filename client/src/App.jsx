import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import TokensPage from './pages/TokensPage'
import TracklistsPage from './pages/TracklistsPage'
import { TracklistsProvider } from './context/TracklistsContext'
import TrackPage from './pages/TrackPage'

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path='/' element={<p>SALUT</p>} />
                <Route path='/cryptocurrencies' element={<TokensPage />} />
                <Route
                    path='/tracklists'
                    element={
                        <TracklistsProvider>
                            <TracklistsPage />
                        </TracklistsProvider>
                    }
                />
                <Route path='/track' element={<TrackPage />} />
                <Route path='*' element={<Navigate to='/' />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
