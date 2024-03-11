import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../../redux/actions/actions";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./Login.css";
import { LOGIN_SUCCESS } from "../../../constants/ActionTypes";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const userId = localStorage.getItem("id");
    if (userId) {
      navigate("/reminder");
    }
  }, [navigate]);

  const onSubmit = async (data) => {
    const { email, password } = data;
    console.log("Submitting login form with email:", email);
    dispatch(login(email, password)).then(() => {
      if (LOGIN_SUCCESS) {
        navigate("/reminder");
      }
    });
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            {...register("email", { required: true })}
            autoComplete="username"
          />
          {errors.email && (
            <span className="error-message" style={{ color: "red" }}>
              Email is required
            </span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            {...register("password", { required: true })}
            autoComplete="current-password"
          />
          {errors.password && (
            <span className="error-message" style={{ color: "red" }}>
              Password is required
            </span>
          )}
        </div>
        <button type="submit" className="btn">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
