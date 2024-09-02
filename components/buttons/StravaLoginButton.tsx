import React from "react";
import StravaLoginIcon from "../assets/StravaLoginIcon";
import Link from "next/link";

interface StravaLoginProps {
    mode: "light" | "dark";
    loginAction: () => void;
}

const StravaLogin: React.FC<StravaLoginProps> = ({ mode, loginAction }) => {
    // let loginAction = `https://www.strava.com/oauth/authorize?client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URL}&response_type=code&scope=read`;
    return (
        <div>
            <button onClick={loginAction} className="strava-login-button">
                <StravaLoginIcon mode={mode} />
            </button>
        </div>
    );
};

export default StravaLogin;
