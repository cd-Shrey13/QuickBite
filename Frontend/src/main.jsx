import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import Home from './pages/Home/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Cart from './pages/Cart/Cart'
import { AuthProvider } from './context/AuthContext'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import StoreContextProvider from './context/StoreContext'
import Navbar from './components/Navbar'
import { Toaster } from 'react-hot-toast'
import Menu from './pages/Menu/Menu'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <React.StrictMode>
            <AuthProvider>
                <StoreContextProvider>
                    <Toaster />
                    <Routes>
                        <Route
                            path="/signup"
                            element={
                                <Suspense fallback={'loading...'}>
                                    <SignUp />
                                </Suspense>
                            }
                        />
                        <Route
                            path="/login"
                            element={
                                <Suspense fallback={'loading...'}>
                                    <Login />
                                </Suspense>
                            }
                        />

                        <Route
                            path="/"
                            element={
                                <Suspense fallback={'loading...'}>
                                    <Home />
                                </Suspense>
                            }
                        />

                        <Route
                            path="/cart"
                            element={
                                <ProtectedRoute>
                                    {/* <Suspense fallback={'loading...'}> */}
                                    <Cart />
                                    {/* </Suspense> */}
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/menu"
                            element={
                                <Suspense fallback={'loading...'}>
                                    <Menu />
                                </Suspense>
                            }
                        />
                    </Routes>
                </StoreContextProvider>
            </AuthProvider>
        </React.StrictMode>
    </BrowserRouter>
)
