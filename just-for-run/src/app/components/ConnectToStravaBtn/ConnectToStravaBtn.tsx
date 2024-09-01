"use client";

import getData from "@/util/fetchData";
import axios from "axios";
import { useEffect, useState } from "react";

export default function ConnectToStravaBtn() {
  const redirectUrl =
    "https://www.strava.com/oauth/authorize?client_id=133501&redirect_uri=http://localhost:3000&response_type=code&scope=read";
  const [athleteData, setAthleteData] = useState();
  //   function handleClick() {
  //     const data = axios.get("https://www.strava.com/oauth/authorize", {
  //       params: {
  //         client_id: "133501",
  //         redirect_uri: "http://localhost",
  //         response_type: "code",
  //         scope: "read",
  //       },
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: "None",
  //       },
  //     });
  //     console.log(data);
  //   }
  //   useEffect(() => {
  //     console.log(athleteData);
  //   }, [athleteData]);
  return (
    <button className="connect-to-strava-btn">
      <img src="../../../../img/btn_strava_connectwith_orange.png"></img>
    </button>
  );
}
