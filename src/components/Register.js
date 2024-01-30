import React from 'react'
import {useForm} from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';


const Register = () => {
  let [err,setErr]=useState('')
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
 let navigate=useNavigate()
  let submitForm = (userCredentialsObj) => {
    axios.post("http://localhost:3500/user-api/create-user",userCredentialsObj)
    .then((response)=>{
      console.log(userCredentialsObj)
      if(response.status===201)
      {
        navigate('/LoginCustomer')
      }
      else{
        setErr(response.data.message)
      }
    })
    .catch(err=>{console.log("error message is : ",err)})
  };

  return (
    <div className="container ">
      <div className="row form-style ">
        <div className="col-sm-6 col-md-4 mx-auto  bg-opacity-75 d-flex flex-column justify-content-center form-background p-3 rounded">
          <h1 className="text-center fs-1 login-heading">Register</h1>
          {err.length!==0 && <p>{err}</p>}
          <form onSubmit={handleSubmit(submitForm)}>
            <label htmlFor="username" className="  fs-4 mt-3">
              username
            </label>
            <input
              type="text"
              className="form-control mt-1"
              id="username"
              {...register("username", { required: true })}
            />
            {errors.username?.type === "required" && (
              <p className="text-danger ">*username is required</p>
            )}
            <label htmlFor="phonenumber" className="  fs-4 mt-3">
            phonenumber
            </label>
            <input
              type="number"
              className="form-control mt-1"
              id="phonenumber"
              {...register("phonenumber", { required: true })}
            />
            {errors.phonenumber?.type === "required" && (
              <p className="text-danger ">*phonenumber is required</p>
            )}
            <label htmlFor="email" className="  fs-4 mt-3">
              email
            </label>
            <input
              type="email"
              className="form-control mt-1"
              id="email"
              {...register("email", { required: true })}
            />
            {errors.email?.type === "required" && (
              <p className="text-danger ">*email is required</p>
            )}
            <label htmlFor="password" className="text-secondary fs-4 mt-3">
              Password
            </label>
            <input
              type="password"
              className="form-control mt-1"
              id="password"
              {...register("password", { required: true })}
            />
            {errors.password?.type === "required" && (
              <p className="text-danger ">*password is required</p>
            )}
            <div className='mt-3'>
  <input type="radio" name="userType" value="customer" id="customer" {...register("userType", { required: true })} />
  <label htmlFor="customer"><p>customer</p></label>
</div>
<div>
  <input type="radio" name="userType" id="farmer" value="farmer" {...register("userType", { required: true })} />
  <label htmlFor="farmer"><p>farmer</p></label>
</div>

            <button
              type="submit"
              className="btn btn-secondary fs-5 mt-3 d-block float-end"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register