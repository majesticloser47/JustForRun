import React from "react";
import StravaLoginIcon from "../assets/StravaLoginIcon";

interface StravaLoginProps {
    mode: "light" | "dark";
    loginAction: () => void;
}

const StravaLogin: React.FC<StravaLoginProps> = ({ mode, loginAction }) => {
    return (
        <div>
            <button onClick={loginAction} className="strava-login-button">
                <StravaLoginIcon mode={mode} />
            </button>
        </div>
    );
};

export default StravaLogin;
