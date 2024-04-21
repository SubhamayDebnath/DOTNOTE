import React, { useState } from 'react'
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5'
import {Link} from 'react-router-dom'
function LoginPage() {
    const [showPassword,setShowPassword]=useState(false);
  return (
    <section>
        <div>
            <h1>Welcome back</h1>
            <form noValidate >
                <div>
                    <label htmlFor="email">Email : </label>
                    <input type="email" name="email" id="email" placeholder='johncena@gmail.com' 
                    autoComplete='off' />
                </div>
                <div>
                    <label htmlFor="password">Password : </label>
                    <input type={`${showPassword ? "text" : "password"}`} name="password" id="password" placeholder='example2331#' autoComplete='off'/>
                    <span  onClick={()=>setShowPassword(!showPassword)}>
                        {showPassword?  <IoEyeOutline /> : <IoEyeOffOutline />}
                    </span>
                </div>
                <div>
                    <button type='submit'>Login</button>
                </div>
            </form>
            <div>
                <span>Create a new Account ?<Link to={"/signup"}>Register Now</Link></span>
            </div>
        </div>
    </section>
  )
}

export default LoginPage