import React from "react";
import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./SignUp.css";
import { signup } from "../../../redux/actions/actions";
import { REGISTER_SUCCESS } from "../../../constants/ActionTypes";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const onSubmit = async (formData) => {
    if (formData.password !== formData.confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "Password and confirm password should be the same",
      });
      return;
    }


    dispatch(signup(formData)).then(()=>{
      if (REGISTER_SUCCESS) {
        navigate('/login')
      }
    })
  };

  return (
    <div className="register-form">
      <h2>SignUp</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            autoComplete="username"
            {...register("username", { required: true })}
          />
          {errors.username && <p className="error">Username is required</p>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            {...register("email", { required: true })}
          />
          {errors.email && <p className="error">Email is required</p>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            autoComplete="new-password"
            {...register("password", {
              required: true,
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long",
              },
              pattern: {
                value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/,
                message:
                  "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character",
              },
            })}
          />
          {errors.password && <p className="error">Password is required</p>}

          {errors.password && (
            <p className="error">{errors.password.message}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Repeat Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            autoComplete="new-password"
            {...register("confirmPassword", { required: true })}
          />
          {errors.confirmPassword && (
            <p className="error">{errors.confirmPassword.message}</p>
          )}
        </div>
        <button type="submit" className="btn">
          Create an Account
        </button>
      </form>
    </div>
  );
};

export default Signup;
