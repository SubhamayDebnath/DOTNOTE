import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import heroImage from '../assets/hero_image.svg'

function HomePage() {
  return (
    <>
    <Navbar/>
        <section className='container flex md:flex-row flex-col-reverse md:gap-0 gap-10 items-center justify-between min-h-screen py-10 px-4 sm:px-6 lg:px-8'>
            <div className='flex flex-col justify-center gap-5 w-full'>
              <h1 className='text-3xl font-bold md:text-4xl lg:text-5xl lg:leading-tight text-black'>Tame your work,organize your life</h1>
              <p className='text-lg font-medium text-gray-600'>Remember everything and tackle any project with your notes,
              tasks, and schedule all in one place.</p>
              <div className='flex items-center'>
                <Link to={"/login"} className='hero_btn'>Get Started</Link>
              </div>
            </div>
            <div className='flex items-center justify-center w-full'>
              <img src={heroImage} alt="Hero Image" className='sm:w-3/4 w-full mx-auto h-auto object-contain object-center overflow-hidden' />
            </div>
        </section>
    <Footer/>
    </>
  )
}

export default HomePage