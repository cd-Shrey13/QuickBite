import React from 'react'
import { twMerge } from 'tailwind-merge'
    function H1({ children, className }) {
    return (
        <h1 className={twMerge("text-[1.9rem] font-black leading-8 text-white sm:max-w-[15ch] sm:text-[3rem] sm:leading-[3.2rem] md:text-[4rem] md:leading-[4.4rem]",className)}>
            {children}
        </h1>
    )
}

export default H1
