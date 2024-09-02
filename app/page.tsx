"use client";
import StravaLogin from "@/components/buttons/StravaLoginButton";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();
    const [isLogged, setisLogged] = useState(false);
    const [userData, setuserData] = useState("");

    function getCookie(name: string) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) {
            return parts.pop()?.split(";").shift();
        }
        return null;
    }

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const res = await fetch("/api/auth/status");
                if (res.ok) {
                    setisLogged(true);

                    const userDet = getCookie("user_details");
                    if (userDet) {
                        const userJson = JSON.parse(userDet);
                        setuserData(userJson.firstname);
                    }
                } else {
                    setisLogged(false);
                    setuserData("");
                }
            } catch (e) {
                setisLogged(false);
                setuserData("");
            }
        };
        checkLoginStatus();
    }, []);

    const handleLogin = () => {
        router.push("/api/auth/login");
    };

    const handleLogout = async () => {
        await fetch("/api/auth/logout");
        setisLogged(false);
        setuserData("");
    };

    return (
        <main className="flex min-h-screen flex-row items-center justify-center p-24">
            {isLogged ? (
                <div>Hi {userData}</div>
            ) : (
                <StravaLogin mode="dark" loginAction={handleLogin} />
            )}
        </main>
    );
}
