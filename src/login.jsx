import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Authcontext } from "./Authcontex";
import axios from "axios";
import { useState } from "react";

const Login = () => {
  const { setUserId, setAccessToken, setRefreshToken, setAccessTokenExpires } =
    useContext(Authcontext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function loginUser() {
    await axios
      .post("https://api.siratinstitute.com/v1/auth/login", {
        email: email,
        password: password,
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

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="login">
      <h1>LOGIN</h1>
      <p>Please enter your login and pasword</p>
      <label htmlFor="username">
        <input
          type="email"
          id="email"
          className="loginInfo"
          placeholder="Email"
          onChange={(e) => {
            handleEmail(e);
          }}
        />
      </label>
      <label htmlFor="password">
        <input
          type="password"
          id="password"
          className="loginInfo"
          placeholder="password"
          onChange={(e) => {
            handlePassword(e);
          }}
        />
      </label>
      <button
        type="submit"
        id="loginbtn"
        className="loginInfo"
        onClick={() => loginUser()}
      >
        Login
      </button>
      <p>
        Create Account?{" "}
        <Link to="/signup" className="signPage">
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default Login;
