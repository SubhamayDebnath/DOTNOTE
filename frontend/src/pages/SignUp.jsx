import React, { useState } from 'react'
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5'
import {Link} from 'react-router-dom'
function SignUp() {
    const [showPassword,setShowPassword]=useState(false);
  return (
    <section>
        <div>
            <h1>Hello</h1>
            <form noValidate>
                <div>
                    <label htmlFor="userName">Name : </label>
                    <input type="text" name="userName" id="userName" placeholder='John Cena' autoComplete='off' />
                </div>
                <div>
                    <label htmlFor="email">Email : </label>
                    <input type="email" name="email" id="email" placeholder='johncena@gmail.com' autoComplete='off' />
                </div>
                <div>
                    <label htmlFor="password">Password : </label>
                    <input type={`${showPassword ? "text" : "password"}`} name="password" id="password" placeholder='example2331#' autoComplete='off'/>
                    <span  onClick={()=>setShowPassword(!showPassword)}>
                        {showPassword?  <IoEyeOutline /> : <IoEyeOffOutline />}
                    </span>
                </div>
                <div>
                    <button type='submit'>Register</button>
                </div>
            </form>
            <div>
                <span><Link to={"/login"}>Login Now</Link></span>
            </div>
        </div>
    </section>
  )
}

export default SignUp