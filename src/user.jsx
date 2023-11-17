import { useContext } from "react";
import { Authcontext } from "./Authcontex";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const User = () => {
  const { userId, accessToken, upToDateToken, accessTokenExpires } =
    useContext(Authcontext);
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const retrievedData = JSON.parse(localStorage.getItem("myStateData"));

  useEffect(() => {
    const getUserInfo = async (id, accessToken) => {
      await axios
        .get(`https://api.siratinstitute.com/v1/users/${id}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then(
          (response) => {
            setUserName(response.data.name);
          },
          async (error) => {
            if (error.response.data.code == 401) {
              upToDateToken();
            }
            console.log(error);
          }
        );
    };
    const expiesDate = new Date(accessTokenExpires);
    console.log(`outer if ${accessTokenExpires}`);
    const currentDate = new Date();
    if (expiesDate < currentDate) {
      console.log("expire the access token and");
      upToDateToken();
    }
    getUserInfo(userId, accessToken);
    // eslint-disable-next-line
  }, [accessToken]);

  async function logOutUser() {
    await axios.post("https://api.siratinstitute.com/v1/auth/logout", {
      refreshToken: retrievedData.refreshToken,
    });
    localStorage.clear();
    navigate("/", { replace: true });
  }
  return (
    <div>
      <h1>Hi, {userName}</h1>
      <p>You Success for login</p>
      <button type="submit" onClick={logOutUser}>
        Logout
      </button>
    </div>
  );
};
export default User;
