import React from 'react'
import Navbar from '../components/Navbar.js'
import Footer from '../components/Footer.js'
function Layout({ children }) {
  return (
    <section className='flex flex-col items-center justify-between min-h-screen'>
      <Navbar/>
      { children }
      <Footer/>
    </section>
  )
}

export default Layout