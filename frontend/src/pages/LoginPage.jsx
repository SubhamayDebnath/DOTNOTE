import React, { useEffect, useState } from 'react'
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5'
import {Link ,useNavigate} from 'react-router-dom'
import {useDispatch ,useSelector} from 'react-redux'
import {toast} from 'react-hot-toast'
import { login } from '../redux/slice/auth.slice'
function LoginPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
    useEffect(()=>{
        if(isLoggedIn){
            navigate("/");
            return
        }
    })
    const [showPassword,setShowPassword]=useState(false);
   
    const [loginData,setLoginData]=useState({
        email:"",
        password:"",
    });
    function handleUserInput(e){
        const {name,value}=e.target;
        setLoginData({
            ...loginData,
            [name]:value
        })
    };
    async function loginAccount(event){
        event.preventDefault();

        if(!loginData.email){
            toast.error("Email is required")
            return
        }
        if(!loginData.password){
            toast.error("Password is required");
            return
        }



        const response = await dispatch(login(loginData));
        if(response?.payload?.success){
            navigate("/");
        }
        setLoginData({
            email:"",
            password:"",
        });
    }
  return (
    <section>
        <div>
            <h1>Welcome back</h1>
            <form noValidate onSubmit={loginAccount}>
                <div>
                    <label htmlFor="email">Email : </label>
                    <input type="email" name="email" id="email" placeholder='johncena@gmail.com' 
                    autoComplete='off'

                    onChange={handleUserInput}
                    value={loginData.email}
                     />
                </div>
                <div>
                    <label htmlFor="password">Password : </label>
                    <input type={`${showPassword ? "text" : "password"}`} name="password" id="password" placeholder='example2331#' autoComplete='off'

                    onChange={handleUserInput}
                    value={loginData.password}/>
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