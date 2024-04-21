import React from 'react'
import { Link } from 'react-router-dom'
import { IoLogoDiscord, IoLogoFacebook, IoLogoInstagram, IoLogoTwitter } from "react-icons/io5";
function Footer() {
  const date=new Date();
  const year=date.getFullYear();
  return (
    <footer className=' bg-neutral-950 text-gray-400'>
      <div className='container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 py-10 px-4 sm:px-6 lg:px-8'>
      <Link to={'/'} className='text-xl font-bold text-white'>DOTNOTE</Link>
      <ul>
        <li><Link to={"/"} className='footer_link'>Home</Link></li>
        <li><Link to={'/notes'} className='footer_link'>Notes</Link></li>
        <li><Link to={"/about"} className='footer_link'>About us</Link></li>
        <li><Link to={"/contact"} className='footer_link'>Contact us</Link></li>
        <li><Link to={"/login"} className='footer_link'>Get Started</Link></li>
      </ul>
      <ul>
        <li><Link to={"/"} className='footer_link'>Terms & Conditions</Link></li>
        <li><Link to={"/"} className='footer_link'>Privacy Policy</Link></li>
      </ul>
      <ul>
        <li><Link to={"/"} className='footer_link'>Email : dotnote@gmail.com</Link></li>
        <li>
          <div className='flex items-center justify-center w-fit mt-2 gap-3'>
            <Link to={"/"} className='footer_icon'>
              <IoLogoFacebook size={24}/>
            </Link>
            <Link to={"/"} className='footer_icon'>
              <IoLogoTwitter size={24}/>
            </Link>
            <Link to={"/"} className='footer_icon'>
              <IoLogoInstagram size={24}/>
            </Link>
            <Link to={"/"} className='footer_icon'>
              <IoLogoDiscord size={24}/>
            </Link>
          </div>
          </li>
      </ul>
      </div>
      <div className='py-4 px-4 sm:px-6 lg:px-8 text-center'>
        <p className='text-sm font-medium'>Copyright ©{year} DOTNOTE | All Rights Reserved</p>
      </div>
    </footer>
  )
}

export default Footer