import { Link, useNavigate } from "react-router-dom";
// import { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useContext } from "react";
import { Authcontext } from "./Authcontex";
import SignUpShema from "./Schema/loginpageShema";

const SignUp = () => {
  const { setUserId, setAccessToken, setRefreshToken } =
    useContext(Authcontext);
  const navigate = useNavigate();

  const onSubmit = async (values, actions) => {
    console.log(values);
    registerUser(values);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    actions.resetForm();
  };
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useFormik({
    initialValues: {
      email: "",
      fname: "",
      lname: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: SignUpShema,
    onSubmit,
  });

  async function registerUser() {
    await axios
      .post("https://api.siratinstitute.com/v1/auth/register", {
        name: values.fname + " " + values.lname,
        email: values.email,
        password: values.password,
      })
      .then(
        (response) => {
          setRefreshToken(response.data.tokens.refresh.token);
          setAccessToken(response.data.tokens.access.token);
          setUserId(response.data.user.id);

          localStorage.setItem(
            "myStateData",
            JSON.stringify({
              id: response.data.user.id,
              refreshToken: response.data.tokens.refresh.token,
            })
          );
          navigate(`/user/${response.data.user.id}`, { replace: true });
        },
        (error) => {
          alert(error.response.data.message);
        }
      );
  }
  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <div className="signin">
        <h1>SIGN IN</h1>
        <label htmlFor="fname">
          <input
            type="text"
            name="fname"
            placeholder="First name"
            value={values.fname}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.fname && touched.fname ? "input-error" : ""}
          />
        </label>
        <label htmlFor="lname">
          <input
            type="text"
            name="lname"
            placeholder="Last name"
            value={values.lname}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.lname && touched.lname ? "input-error" : ""}
          />
        </label>
        <label htmlFor="email">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.email && touched.email ? "input-error" : ""}
          />
          {errors.email && touched.email && (
            <div className="error">{errors.email}</div>
          )}
        </label>
        <label htmlFor="password">
          <input
            type="password"
            name="password"
            placeholder="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.password && touched.password ? "input-error" : ""}
          />
          {errors.password && touched.password && (
            <div className="error">{errors.password}</div>
          )}
        </label>
        <label htmlFor="cofirmPassword">
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            className={
              errors.confirmPasswordpassword && touched.confirmPasswordpassword
                ? "input-error"
                : ""
            }
          />
          {errors.confirmPassword && touched.confirmPassword && (
            <div className="error">{errors.confirmPassword}</div>
          )}
        </label>
        <button type="submit" name="submit" disabled={isSubmitting}>
          Submit
        </button>
        <p>
          Already Account?{" "}
          <Link to="/login" className="signPage">
            Login
          </Link>
        </p>
      </div>
    </form>
  );
};

export default SignUp;
