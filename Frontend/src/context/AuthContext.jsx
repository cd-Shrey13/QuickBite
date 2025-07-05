// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    // Auto-fetch user on app load
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get('http://localhost:3000/me', {
                    withCredentials: true,
                })
                setUser(res.data)
                toast("You are signed In")
            } catch {
                setUser(null) // Not logged in or cookie expired
            } finally {
                setLoading(false)
            }
        }

        fetchUser()
    }, [])

    // Logout
    const logout = async () => {
        await axios.post('http://localhost:3000/logout', {}, { withCredentials: true })
        setUser(null)
        toast.success("Logged out successfully!")
    }

    // Axios response interceptor: auto-logout on 401
    useEffect(() => {
        const interceptor = axios.interceptors.response.use(
            (res) => res,
            (error) => {
                if (error.response?.status === 401) {
                    setUser(null)
                }
                return Promise.reject(error)
            }
        )
        return () => axios.interceptors.response.eject(interceptor)
    }, [])

    return (
        <AuthContext.Provider value={{ user, setUser, logout, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

// Custom hook to use auth
export const useAuth = () => useContext(AuthContext)
