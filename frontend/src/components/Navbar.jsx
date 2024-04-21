import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import { IoClose, IoMenu } from "react-icons/io5";
function Navbar() {
  const [menu,setMenu]=useState(false);
  return (
    <header>
      <nav className='container flex items-center justify-between py-4 px-4 sm:px-6 lg:px-8'>
        <Link to={'/'} className='text-2xl font-extrabold text-black'>DOTNOTE</Link>
        <button className='h-9 w-9 md:hidden flex items-center justify-center shadow-sm rounded-full transition-colors ease-in-out text-black border border-gray-200 hover:bg-gray-50' onClick={()=>setMenu(!menu)}>
          {menu ? <IoClose size={24} />: <IoMenu size={24} />}
        </button>
        <div className={`menu ${menu ? "active":""}`}>
          <div className="flex md:flex-row flex-col item-center">
            <Link to={"/"} className='nav_link'>Home</Link>
            <Link to={"/notes"} className='nav_link'>Notes</Link>
            <Link to={"/about"} className='nav_link'>About us</Link>
            <Link to={"/contact"} className='nav_link'>Contact us</Link>
            <Link to={"/admin"} className='nav_link'>Admin Panel</Link>
            <Link to={"/profile"} className='nav_link'>Subhamay</Link>
            <span className='nav_link'>Log Out</span>
            <Link to={"/login"} className='nav_btn'>Get Started</Link>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navbar