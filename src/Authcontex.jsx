import axios from "axios";
import { createContext } from "react";
import { useState } from "react";

export const Authcontext = createContext();

export default function AuthProvider({ children }) {
  const [refreshToken, setRefreshToken] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [userId, setUserId] = useState("");
  const [accessTokenExpires, setAccessTokenExpires] = useState("");
  const retrievedData = JSON.parse(localStorage.getItem("myStateData"));

  const upToDateToken = async () => {
    setRefreshToken(retrievedData.refreshToken);

    console.log(retrievedData);
    await axios
      .post("https://api.siratinstitute.com/v1/auth/refresh-tokens", {
        refreshToken: retrievedData.refreshToken,
      })
      .then(
        (response) => {
          console.log("Success Full !!!!!!!!!!!!");
          const userid = retrievedData.id;

          setAccessToken(response.data.access.token);
          setUserId(retrievedData.id);
          setAccessTokenExpires(response.data.access.expires);

          localStorage.setItem(
            "myStateData",
            JSON.stringify({
              id: userid,
              refreshToken: response.data.refresh.token,
            })
          );
        },
        (error) => {
          console.log(`refreshThetoken : ${error}`);
        }
      );
  };

  const value = {
    userId,
    setUserId,
    accessToken,
    accessTokenExpires,
    setAccessTokenExpires,
    setAccessToken,
    refreshToken,
    setRefreshToken,
    upToDateToken,
  };

  return <Authcontext.Provider value={value}>{children}</Authcontext.Provider>;
}
