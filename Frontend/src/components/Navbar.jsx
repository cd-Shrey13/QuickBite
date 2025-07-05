import Button from './Button'
import BrandLogo from './BrandLogo'
import { Link, useNavigate } from 'react-router-dom'
import { useStoreContext } from '../context/StoreContext'
import { useAuth } from '../context/AuthContext'

function Navbar() {
    return (
        <header className="sticky top-0 z-50 h-20 w-full bg-[#181818] shadow-md">
            <nav className="grid h-full grid-cols-2 px-4 md:grid-cols-3">
                {/* Left: Logo */}
                <div className="flex items-center justify-start">
                    <Link to="/" className="inline-block">
                        <BrandLogo className="h-10" />
                    </Link>
                </div>

                {/* Center Nav Links */}
                <NavbarMiddleList />

                {/* Right: Auth + Cart */}
                <NavbarRightsideList />
            </nav>
        </header>
    )
}

function NavbarMiddleList() {
    return (
        <div className="hidden h-full items-center justify-center md:flex">
            <ul className="flex gap-6 text-[16px] font-semibold">
                <li>
                    <Link
                        to="/"
                        className="border-b-2 border-transparent text-[#f7c873] transition hover:border-[#c9f24c] hover:text-[#c9f24c]"
                    >
                        Home
                    </Link>
                </li>
                <li>
                    <Link
                        to="/menu"
                        className="border-b-2 border-transparent text-[#f7c873] transition hover:border-[#c9f24c] hover:text-[#c9f24c]"
                    >
                        Menu
                    </Link>
                </li>
                <li>
                    <a
                        href="#footer"
                        className="border-b-2 border-transparent text-[#f7c873] transition hover:border-[#c9f24c] hover:text-[#c9f24c]"
                    >
                        Contact Us
                    </a>
                </li>
            </ul>
        </div>
    )
}

function NavbarRightsideList() {
    const { user, logout } = useAuth()
    const navigate = useNavigate()
    const { itemsQuantityInCart } = useStoreContext()

    return (
        <div className="relative flex items-center justify-end gap-3">
            {/* Cart */}
            <div className="relative">
                {itemsQuantityInCart > 0 && (
                    <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
                        {itemsQuantityInCart}
                    </span>
                )}
                <Link to="/cart">
                    <svg
                        className="size-5 text-white transition hover:text-[#c9f24c] lg:size-7"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            fillRule="evenodd"
                            d="M4 4a1 1 0 0 1 1-1h1.5a1 1 0 0 1 .979.796L7.939 6H19a1 1 0 0 1 .979 1.204l-1.25 6a1 1 0 0 1-.979.796H9.605l.208 1H17a3 3 0 1 1-2.83 2h-2.34a3 3 0 1 1-4.009-1.76L5.686 5H5a1 1 0 0 1-1-1Z"
                            clipRule="evenodd"
                        />
                    </svg>
                </Link>
            </div>

            {/* Auth */}
            {user ? (
                <Button onClickHandler={logout} className="text-xs">
                    Sign Out
                </Button>
            ) : (
                <Button
                    onClickHandler={() => navigate('/login')}
                    className="text-xs"
                >
                    Sign In
                </Button>
            )}
        </div>
    )
}

export default Navbar
