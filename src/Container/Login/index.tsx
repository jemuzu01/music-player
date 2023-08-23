import React, { useEffect, useState } from 'react'
import { useForm,SubmitHandler } from 'react-hook-form'
import './style.css'
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { successLogin } from './slice'

interface Inputs{
    username:string,
    password:string
}

export const Login = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
    interface userSchema {
       username:string,
       password:string
    }
    interface loggedInUserSchema{
      islogged:boolean,
      username:string
    }

    const [users, setUsers] = useState<userSchema[]>([]);

   

 const { register,
    handleSubmit,
    watch,
    setError,
    formState:{errors},} = useForm<Inputs>()

    const featchUser =()=>{
      axios.get('http://localhost:3004/users')
       .then(response => {
         setUsers(response.data);
         // console.log(users)
       })
       .catch(error => {
         console.error(error);
       });
    }

    useEffect(()=>{
       featchUser()
    },[])

   

    const onSubmit = (data:Inputs) =>
    {
        
        const loggedUser = users.some(
          user => user.username === data.username && user.password === data.password
          )
          console.log(loggedUser) 
          if(loggedUser){
            navigate("/home");
            dispatch(successLogin({isLogged:loggedUser,username:data.username}))
          }
          else{
            navigate("/")
            setError("username", {
              type: "manual",
              message: "USER NOT FOUND"
            });
          }
    }

  return (
    <div className='login--section'>
        <div className='login--container'>
            {errors.username && <p className='error-alert'>{errors.username.message}</p>} 
            <h2>LOGIN2</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input placeholder="Username" type='text'{...register("username", { required: true,maxLength: 0 })}/>
                 {errors.username?.type === "required" && (
                    <p className='error-alert' role="alert">Username is required</p>
                 )}
              
                <input placeholder="Password" type='password' {...register("password", { required: true })} />
                {errors.password?.type === "required" && (
                    <p className='error-alert' role="alert">Password is required</p>
                 )}
                <input className='login--btn' type="submit" />
            </form>
        </div>
    </div>
  )
}
