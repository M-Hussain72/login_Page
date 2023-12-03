import { useContext } from "react";
import { Authcontext } from "./Authcontex";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import FetchUserInfo from "./FecthUserInfo";

const User = () => {
  const { userId, accessToken, upToDateToken } = useContext(Authcontext);
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);

  const retrievedData = JSON.parse(localStorage.getItem("myStateData"));
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await FetchUserInfo(userId, accessToken);
        console.log(response);
        setUserName(response.data.name);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          // Call the upToDateToken function for token refresh
          await upToDateToken();
          // Retry the API call after token refresh
        } else {
          console.error("API Error:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    // Call the fetchData function
    fetchData();
    // eslint-disable-next-line
  }, [accessToken]);

  async function logOutUser() {
    await axios.post("https://api.siratinstitute.com/v1/auth/logout", {
      refreshToken: retrievedData.refreshToken,
    });
    localStorage.clear();
    navigate("/", { replace: true });
  }

  if (loading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">🌀</h2>
      </div>
    );
  }

  return (
    <div>
      <div id="nav-bar">
        <div className="nav-bar-logo">
          <p>{userName}</p>
        </div>
        <div className="nav-bar-btn">
          <button onClick={logOutUser}>Logout</button>
        </div>
      </div>
      <p>You Success for login</p>
    </div>
  );
};
export default User;
