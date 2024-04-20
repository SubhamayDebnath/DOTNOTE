import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { IoClose, IoMenu , IoSunnyOutline } from "react-icons/io5";
function Navbar() {
    const [menu,setMenu] = useState(false)
  return (
    <header className='w-full'>
        <nav className='container flex items-center justify-between py-4 px-4 sm:px-6 lg:px-8'>
            <Link to={"/"} className='text-2xl font-extrabold tracking-wider text-black'>DOTNOTE</Link>
            <div className='md:hidden'>
                <button className='md:h-8 md:w-8 h-9 w-9 flex items-center justify-center rounded-full cursor-pointer border border-gray-200 text-black bg-white hover:bg-gray-50' onClick={()=>setMenu(!menu)}>
                         {menu? <IoClose size={24} /> : <IoMenu size={24} />}
                </button>
            </div>
            <div className={`menu ${menu? "active" : ""}`}>
                <ul className='flex md:flex-row flex-col items-center gap-5'>
                    <li><Link to={'/'} className='nav_link'>Home</Link></li>
                    <li><Link to={'/notes'} className='nav_link'>Notes</Link></li>
                    <li><Link to={'/about'} className='nav_link'>About</Link></li>
                    <li><Link to={'/contact'} className='nav_link'>Contact</Link></li>
                    <li><Link to={'/'} className='nav_btn'>Get Started</Link></li>
                </ul>
                
            </div>
            
        </nav>
    </header>
  )
}

export default Navbar