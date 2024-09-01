import axios from "axios";

const axiosObj = axios.create({
  baseURL: "https://www.strava.com/oauth/authorize",
  header: {
    "Content-Type": "program/json",
  },
});

const getData = async (url, options = {}) => {
  try {
    const res = await axiosObj(url, options);
    return res.data;
  } catch (error) {
    console.error("Error occured: ", error);
    throw new Error("Could not get data");
  }
};

export default getData;
