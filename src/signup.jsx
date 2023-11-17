import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { Authcontext } from "./Authcontex";

const SignUp = () => {
  const [fname, setfname] = useState("");
  const [Lname, setLname] = useState("");
  const [Email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUserId, setAccessToken, setRefreshToken } =
    useContext(Authcontext);
  const navigate = useNavigate();

  const handelfname = (e) => {
    setfname(e.target.value);
  };
  const handelLname = (e) => {
    setLname(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  async function registerUser() {
    await axios
      .post("https://api.siratinstitute.com/v1/auth/register", {
        name: fname + " " + Lname,
        email: Email,
        password: password,
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
    <div className="signin">
      <h1>SIGN IN</h1>
      <label htmlFor="fname">
        <input
          type="text"
          name="fname"
          placeholder="First name"
          value={fname}
          onChange={(e) => {
            handelfname(e);
          }}
        />
      </label>
      <label htmlFor="lname">
        <input
          type="text"
          name="lname"
          placeholder="Last name"
          value={Lname}
          onChange={(e) => {
            handelLname(e);
          }}
        />
      </label>
      <label htmlFor="Email">
        <input
          type="Email"
          name="Email"
          placeholder="Email"
          value={Email}
          onChange={(e) => {
            handleEmail(e);
          }}
        />
      </label>
      <label htmlFor="password">
        <input
          type="password"
          name="password"
          placeholder="  password"
          onChange={(e) => {
            handlePassword(e);
          }}
        />
      </label>
      <button
        type="submit"
        onClick={() => {
          registerUser();
        }}
      >
        Submit
      </button>
      <p>
        Already Account?{" "}
        <Link to="/login" className="signPage">
          Login
        </Link>
      </p>
    </div>
  );
};

export default SignUp;
