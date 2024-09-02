"use client";
import StravaLogin from "@/components/buttons/StravaLoginButton";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Avatar from "@/components/Avatar";

export default function Home() {
    const router = useRouter();
    const [isLogged, setisLogged] = useState(false);
    interface UserData {
        firstname: string;
        lastname: string;
        profile: string;
    }
    const [userData, setuserData] = useState<UserData | null>(null);

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
                        setuserData(userJson);
                    }
                } else {
                    setisLogged(false);
                    setuserData(null);
                }
            } catch (e) {
                setisLogged(false);
                setuserData(null);
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
        setuserData(null);
    };

    return (
        <main className="flex min-h-screen flex-row items-center justify-center p-24">
            {isLogged && userData ? (
                <div>
                    <Avatar
                        userPhoto={userData.profile}
                        userName={`${userData.firstname} ${userData.lastname}`}
                        onLogout={handleLogout}
                    />
                </div>
            ) : (
                <StravaLogin mode="dark" loginAction={handleLogin} />
            )}
        </main>
    );
}
