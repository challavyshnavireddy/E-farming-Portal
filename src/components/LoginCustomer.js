import React,{useContext,useEffect} from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";
import { loginContext } from "../contexts/LoginContextProvider";

function LoginCustomer() {
let {loginFunction,userState,setUserState}=useContext(loginContext)

  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

   let navigate = useNavigate();
  let submitForm = (userCredentialsObj) =>{
    loginFunction(userCredentialsObj)
    // setUserState(userCredentialsObj)
    }

  useEffect((
  )=>{
    if(userState)
    {
      navigate("/user-profile")
    }
  },[userState])


console.log(userState)
  return (
    <div className="container ">
      <div className="row form-style ">
        <div className="col-sm-6 col-md-4 mx-auto  bg-opacity-75 d-flex flex-column justify-content-center form-background p-3 rounded">
          <h1 className="text-center fs-1 login-heading">Login</h1>

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
            <label htmlFor="email" className=" fs-4 mt-3">
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
            <button
              type="submit"
              className="btn btn-secondary fs-5 mt-3 d-block float-end"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginCustomer;
