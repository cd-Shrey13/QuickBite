import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
const SIGNUP_URL = import.meta.env.VITE_SIGNUP_URL
import { assets } from '../assets/assets'
import Button from '../components/Button'
import toast from 'react-hot-toast'

export default function SignUp() {
    const navigate = useNavigate()

    //Function to send login request to the backend
    const sendLoginRequest = async (data) => {
        try {
            const response = await axios.post(SIGNUP_URL, data, {
                withCredentials: true,
                credentials: 'include',
            })
            if (response.data.success) {
                navigate('/login')
                toast.success('Account created successfully!')
            }
        } catch (error) {
            alert(error)
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
        <section class="-900 h-full w-full bg-gray-50">
            <div class="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
                <img class="mb-2 h-20" src={assets.logo} alt="logo" />

                <div class="-700 -800 w-full rounded-lg bg-white shadow sm:max-w-md md:mt-0 xl:p-0">
                    <div class="space-y-4 p-6 sm:p-8 md:space-y-6">
                        <h1 class="mb-4 text-xl leading-tight font-bold tracking-tight text-gray-900 md:text-2xl">
                            Create an account
                        </h1>
                        <form
                            class="flex w-full flex-col items-center justify-center gap-2 space-y-4 md:space-y-6"
                            onSubmit={(e) => onClickHandler(e)}
                        >
                            <div className="w-full">
                                <label
                                    for="firstname"
                                    class="mb-2 block text-sm font-medium text-gray-900"
                                >
                                    Your firstname
                                </label>
                                <input
                                    type="text"
                                    name="firstname"
                                    id="firstname"
                                    class="focus:ring-primary-600 focus:border-primary-600 -600 -700 -400 -blue-500 -blue-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                                    placeholder="John"
                                    required
                                />
                            </div>
                            <div className="w-full">
                                <label
                                    for="lastname"
                                    class="mb-2 block text-sm font-medium text-gray-900"
                                >
                                    Your lastname
                                </label>
                                <input
                                    type="text"
                                    name="lastname"
                                    id="lastname"
                                    class="focus:ring-primary-600 focus:border-primary-600 -600 -700 -400 -blue-500 -blue-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                                    placeholder="Doe"
                                    required
                                />
                            </div>
                            <div className="w-full">
                                <label
                                    for="email"
                                    class="mb-2 block text-sm font-medium text-gray-900"
                                >
                                    Your email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    class="focus:ring-primary-600 focus:border-primary-600 -600 -700 -400 -blue-500 -blue-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                                    placeholder="name@company.com"
                                    required
                                />
                            </div>
                            <div className="w-full">
                                <label
                                    for="password"
                                    class="mb-2 block text-sm font-medium text-gray-900"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="••••••••"
                                    class="focus:ring-primary-600 focus:border-primary-600 -600 -700 -400 -blue-500 -blue-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                                    required
                                />
                            </div>
                            {/* <div className='w-full'>
                                <label
                                    for="confirm-password"
                                    class="mb-2 block text-sm font-medium text-gray-900"
                                >
                                    Confirm password
                                </label>
                                <input
                                    type="confirm-password"
                                    name="confirm-password"
                                    id="confirm-password"
                                    placeholder="••••••••"
                                    class="focus:ring-primary-600 focus:border-primary-600 -600 -700 -400 -blue-500 -blue-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                                    required
                                />
                            </div> */}
                            <div class="flex w-full items-start">
                                <div class="flex h-5 items-center">
                                    <input
                                        id="terms"
                                        aria-describedby="terms"
                                        type="checkbox"
                                        class="focus:ring-primary-300 -primary-600 -600 -700 -gray-800 h-4 w-4 rounded border border-gray-300 bg-gray-50 focus:ring-3"
                                        required
                                    />
                                </div>
                                <div class="ml-3 text-sm">
                                    <label
                                        for="terms"
                                        class="-300 font-light text-gray-500"
                                    >
                                        I accept the{' '}
                                        <a
                                            class="text-primary-600 -500 font-medium hover:underline"
                                            href="#"
                                        >
                                            Terms and Conditions
                                        </a>
                                    </label>
                                </div>
                            </div>
                            <Button type="submit" className={'w-full'}>
                                Create an account
                            </Button>
                            <p class="-400 text-sm font-light text-gray-500">
                                Already have an account?{' '}
                                <Link
                                    to="/login"
                                    class="text-primary-600 -500 font-medium hover:underline"
                                >
                                    Login here
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
