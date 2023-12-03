import axios from "axios";
const FetchUserInfo = async (id, accessToken) => {
  const response = await axios.get(
    `https://api.siratinstitute.com/v1/users/${id}`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );
  return response;
};

export default FetchUserInfo;
