import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Authcontext } from "./Authcontex";
import axios from "axios";
import { useFormik } from "formik";
import { loginShema } from "./Schema/loginpageShema";

const Login = () => {
  const { setUserId, setAccessToken, setRefreshToken, setAccessTokenExpires } =
    useContext(Authcontext);
  const navigate = useNavigate();

  const onSubmit = async (actions) => {
    loginUser();
    await new Promise((resolve) => setTimeout(resolve, 1000));
    actions.resetForm();
  };
  const {
    values,
    errors,
    isSubmitting,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginShema,
    onSubmit,
  });

  async function loginUser() {
    await axios
      .post("https://api.siratinstitute.com/v1/auth/login", {
        email: values.email,
        password: values.password,
      })
      .then(
        (response) => {
          setRefreshToken(response.data.tokens.refresh.token);
          setAccessToken(response.data.tokens.access.token);
          setUserId(response.data.user.id);
          setAccessTokenExpires(response.data.tokens.access.expires);
          localStorage.setItem(
            "myStateData",
            JSON.stringify({
              id: response.data.user.id,
              refreshToken: response.data.tokens.refresh.token,
              expiresAccessToken: response.data.tokens.access.expires,
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
      <div className="login">
        <h1>LOGIN</h1>
        <p>Please enter your login and pasword</p>
        <label htmlFor="username">
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
        <button type="submit" name="submit" disabled={isSubmitting}>
          Login
        </button>
        <p>
          Create Account?{" "}
          <Link to="/signup" className="signPage">
            Sign in
          </Link>
        </p>
      </div>
    </form>
  );
};

export default Login;
