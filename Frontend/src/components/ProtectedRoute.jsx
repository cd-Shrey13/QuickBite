import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth()
    const navigate = useNavigate()
    console.log('reached protected Route')
    if (loading) return <p>Loading...</p>
    return user ? children : <Navigate to="/login" />
}

export default ProtectedRoute
