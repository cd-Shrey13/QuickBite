import React, { useEffect, useState } from 'react'
import H1 from '../../components/H1'
import Button from '../../components/Button'
import { useNavigate } from 'react-router-dom'

const foodImages = [
    'https://images.unsplash.com/photo-1600891964599-f61ba0e24092',
    'https://plus.unsplash.com/premium_photo-1673108852141-e8c3c22a4a22?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
]

function Hero() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const navigate = useNavigate()

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % foodImages.length)
        }, 5000) // 5 seconds per slide
        return () => clearInterval(interval)
    }, [])

    return (
        <section className="w-full bg-[#fdf3e7] p-4">
            <div className="font-Satoshi relative mx-auto h-[30rem] max-w-screen-xl overflow-hidden rounded-3xl border-2 border-solid border-white p-4 sm:h-[36rem] md:h-[42rem]">
                {/* Background Image Slider */}
                <div className="absolute inset-0 z-0">
                    {foodImages.map((img, i) => (
                        <img
                            key={i}
                            src={`${img}?auto=format&fit=crop&w=1600&q=80`}
                            alt={`Food ${i}`}
                            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
                                i === currentIndex
                                    ? 'animate-fade-slide opacity-100'
                                    : 'opacity-0'
                            }`}
                        />
                    ))}
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 z-10 flex items-end bg-black/60">
                    <div className="z-20 max-w-3xl p-6 text-white md:p-10">
                        <H1>
                            Order your favourite <br /> food here
                        </H1>
                        <p className="mt-4 text-base sm:text-lg lg:text-xl">
                            Choose from a diverse menu featuring a delectable
                            array of dishes crafted with the finest ingredients
                            and culinary expertise. Our mission is to satisfy
                            your cravings and elevate your dining experience,
                            one delicious meal at a time.
                        </p>
                        <Button
                            className="mt-6"
                            onClickHandler={() => navigate('/menu')}
                        >
                            Explore Menu
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero
