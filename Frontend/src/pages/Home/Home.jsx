import React, { useEffect } from 'react'
import Hero from './Hero'
import MenuOptions from './MenuOptions'
import DownloadForMobile from './DownloadForMobile'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

function Home() {
    return (
        <>
            <Navbar />
            <Hero />
            <MenuOptions />
            <DownloadForMobile />
            <Footer />
        </>
    )
}

export default Home
