//

import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
const LOGIN_URL = import.meta.env.VITE_LOGIN_URL
import toast from 'react-hot-toast'
import Button from '../components/Button'
import { assets } from '../assets/assets'

export default function Login() {
    const navigate = useNavigate()

    //Function to send login request to the backend
    const sendLoginRequest = async (data) => {
        try {
            const response = await axios.post(LOGIN_URL, data, {
                withCredentials: true,
                credentials: 'include',
            })
            if (response.data.success) {
                toast.success('Welcome, User!')
                navigate('/')
            }
        } catch (error) {
            if (error.status) {
                // Request made and server responded
                const status = error.status

                if (status === 404) {
                    toast.error('User not found')
                    // Show a toast, alert, or redirect
                } else if (status === 401) {
                    toast.error('Unauthorized access')
                    // Maybe redirect to login
                } else {
                    toast.error('Unhandled error:', error.response.data)
                }
            } else if (error.request) {
                // Request was made but no response
                toast.error('No response from server')
            } else {
                // Something else happened
                console.error('Error', error.message)
            }
        }
    }

    //onClick handler for the submit button
    const onClickHandler = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const data = Object.fromEntries(formData.entries())
        sendLoginRequest(data)
    }

    return (
        <>
            <section class="-900 h-full w-full bg-gray-50">
                <div class="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
                    <img class=" h-20 mb-2" src={assets.logo} alt="logo" />
                    <div class="-700 -800 w-full rounded-lg bg-white shadow sm:max-w-md md:mt-0 xl:p-0">
                        <div class="space-y-4 p-6 sm:p-8 md:space-y-6">
                            <h1 class="text-xl leading-tight font-bold tracking-tight text-(--color-text-primary) md:text-2xl mb-4">
                                Sign in to your account
                            </h1>
                            <form
                                class="flex w-full flex-col items-center justify-center gap-2 space-y-4 md:space-y-6"
                                onSubmit={(e) => onClickHandler(e)}
                            >
                                <div className="w-full">
                                    <label
                                        for="email"
                                        class="mb-2 block text-sm font-medium text-(--color-text-primary)"
                                    >
                                        Your email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        class="focus:ring-primary-600 focus:border-primary-600 -600 -700 -400 -blue-500 -blue-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-(--color-text-primary)"
                                        placeholder="name@company.com"
                                        required
                                    />
                                </div>
                                <div className="w-full">
                                    <label
                                        for="password"
                                        class="mb-2 block text-sm font-medium text-(--color-text-primary)"
                                    >
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="••••••••"
                                        class="focus:ring-primary-600 focus:border-primary-600 -600 -700 -400 -blue-500 -blue-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-(--color-text-primary)"
                                        required
                                    />
                                </div>
                                <div class="flex w-full items-center justify-between">
                                    <div class="flex items-start">
                                        <div class="flex h-5 items-center">
                                            <input
                                                id="remember"
                                                aria-describedby="remember"
                                                type="checkbox"
                                                class="focus:ring-primary-300 -primary-600 -600 -700 -gray-800 h-4 w-4 rounded border border-gray-300 bg-gray-50 focus:ring-3"
                                                required
                                            />
                                        </div>
                                        <div class="ml-3 text-sm">
                                            <label
                                                for="remember"
                                                class="-300 text-gray-500"
                                            >
                                                Remember me
                                            </label>
                                        </div>
                                    </div>
                                    <a
                                        href="#"
                                        class="text-primary-600 -500 text-sm font-medium hover:underline"
                                    >
                                        Forgot password?
                                    </a>
                                </div>
                                <Button type="submit">Sign in</Button>
                                <p class="-400 text-sm font-light text-gray-500">
                                    Don’t have an account yet?{' '}
                                    <Link
                                        to="/signup"
                                        class="text-primary-600 -500 font-medium hover:underline"
                                    >
                                        Sign up
                                    </Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
