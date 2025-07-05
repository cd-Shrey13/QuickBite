import React from 'react'
import { assets } from '../../src/assets/assets'
import BrandLogo from './BrandLogo'
function Footer() {
    return (
        <section className="w-full bg-[#121212] p-4 text-white relative bottom-0" id="footer">
            <div className="mb-4 flex flex-col items-start justify-center gap-4 lg:flex-row lg:justify-start lg:gap-40 lg:px-12">
                <span className="flex flex-col items-start justify-center gap-4">
                    <BrandLogo/>
                    <p className='lg:max-w-[55ch]'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Tenetur, dicta explicabo! Quibusdam vitae sunt, dolorem
                        quia possimus enim unde esse.
                    </p>
                    <span className="flex items-center gap-4">
                        <img
                            src={assets.facebook_icon}
                            alt=""
                            className="size-10"
                        />
                        <img
                            src={assets.twitter_icon}
                            alt=""
                            className="size-10"
                        />
                        <img
                            src={assets.linkedin_icon}
                            alt=""
                            className="size-10"
                        />
                    </span>
                </span>
                <span>
                    <h2 className="text-[1.5rem] font-black">COMPANY</h2>
                    <ul className="p-2">
                        <li>
                            <a href="#" className="hover:decoration-gray-200">
                                Home
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:decoration-gray-200">
                                About us
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:decoration-gray-200">
                                Delivery
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:decoration-gray-200">
                                Privacy policy
                            </a>
                        </li>
                    </ul>
                </span>
                <span>
                    <h2 className="text-[1.5rem] font-black">GET IN TOUCH</h2>
                    <ul className="p-2">
                        <li>
                            <a href="#" className="hover:decoration-gray-200">
                                +1-212-456-7800
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:decoration-gray-200">
                                contact@tomato.com
                            </a>
                        </li>
                    </ul>
                </span>
            </div>
            <hr />
            <footer className="mb-2 mt-3 flex items-center justify-center">
                <h3>
                    <a href="#" className="hover:decoration-gray-200">
                        Copyright 2024© QuickBite.com - All rights reserved.
                    </a>{' '}
                </h3>
            </footer>
        </section>
    )
}

export default Footer
