import React, { useState } from 'react'
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5'
import {Link ,useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {toast} from 'react-hot-toast'
import defaultUserImage from '../assets/defaultUserImage.png'
function SignUp() {
    const [showPassword,setShowPassword]=useState(false);
    const [previewImage,setPreviewImage]=useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [SignUpData,setSignUpData]=useState({
        userName:"",
        email:"",
        password:"",
        avatar:""
    });
    function handleUserInput(e){
        const {name,value}=e.target;
        setSignUpData({
            ...SignUpData,
            [name]:value
        })
    }
    function getImage(event){
        event.preventDefault();
        const uploadedImage = event.target.files[0];
        if(uploadedImage){
            setSignUpData({
                ...SignUpData,
                avatar:uploadedImage
            });
        }
        const fileReader = new FileReader();
        fileReader.readAsDataURL(uploadedImage);
        fileReader.addEventListener('load',function(){
            setPreviewImage(this.result);
        })
    }
    function createNewAccount(event){
        event.preventDefault();
        if(!SignUpData.avatar){
            toast.error("Profile Image is required")
            return
        }
        if(!SignUpData.userName){
            toast.error("Name Image is required")
            return
        }
        if(!SignUpData.email){
            toast.error("Email is required")
            return
        }
        if(!SignUpData.password){
            toast.error("Password is required");
            return
        }
        if(!SignUpData.userName.length > 2){
            toast.error("Name Should be at least of 3 Characters");
            return
        }
        if(!SignUpData.email.match( /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
            toast.error("Invalid Email");
            return
        }
        if(!SignUpData.password.match( /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,}$/)){
            toast.error("Password should be at least 6 characters long with number,alphabet and special character")
        }
        const formData = new FormData;
        formData.append("userName",SignUpData.userName)
        formData.append("email",SignUpData.email)
        formData.append("password",SignUpData.password)
        formData.append("avatar",SignUpData.avatar)
        
        SignUpData({
            userName:"",
            email:"",
            password:"",
            avatar:""
        })
        setPreviewImage("")

    }
  return (
    <section>
        <div>
            <h1>Hello</h1>
            <form noValidate onSubmit={createNewAccount}>
                <div>
                <label htmlFor="avatar">
                    {previewImage?
                    <img src={previewImage} alt="Default user image" className='h-20 w-20 rounded-full object-contain object-center' />  
                    :
                    <img src={defaultUserImage} alt="Default user image" className='h-20 w-20 rounded-full object-contain object-center' />
                }
                </label>
                <input type="file" name="avatar" id="avatar" className='hidden' accept='.jpg,.jpeg,.png,.webp' onChange={getImage} />
                </div>
                <div>
                    <label htmlFor="userName">Name : </label>
                    <input type="text" name="userName" id="userName" placeholder='John Cena' autoComplete='off' 
                    onChange={handleUserInput}
                    value={SignUpData.userName}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email : </label>
                    <input type="email" name="email" id="email" placeholder='johncena@gmail.com' autoComplete='off'
                    onChange={handleUserInput}
                    value={SignUpData.email}
                     />
                </div>
                <div>
                    <label htmlFor="password">Password : </label>
                    <input type={`${showPassword ? "text" : "password"}`} name="password" id="password" placeholder='example2331#' autoComplete='off'
                     onChange={handleUserInput}
                     value={SignUpData.password}
                    />
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