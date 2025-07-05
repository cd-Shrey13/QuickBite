import { twMerge } from 'tailwind-merge'

function Button({ children, className, onClickHandler, type }) {
    return (
        <button
            type={type}
            className={twMerge(
                
                'rounded-lg bg-(--color-button-background) px-5 py-2.5 text-center text-sm font-medium text-(--color-button-text) hover:cursor-pointer hover:bg-(--color-button-hover) focus:ring-4 focus:ring-(--color-button-focus) focus:outline-none sm:w-auto', className
            )}
            onClick={onClickHandler}
        >
            {children}
        </button>
    )
}

export default Button
