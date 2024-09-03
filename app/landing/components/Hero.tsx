"use client";

import StravaLogin from "@/components/buttons/StravaLoginButton";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Avatar from "@/components/ui/Avatar";

const Hero = () => {
    const router = useRouter();
    const [isLogged, setIsLogged] = useState<boolean>(false);
    interface UserData {
        firstname: string;
        lastname: string;
        profile: string;
    }
    const [userData, setUserData] = useState<UserData | null>(null);

    useEffect(() => {
        const fetchAthleteData = async () => {
            try {
                const res = await fetch("/api/auth/athlete");
                if (res.ok) {
                    const data = await res.json();
                    setUserData(data);
                    setIsLogged(true);
                } else {
                    setIsLogged(false);
                }
            } catch (e) {
                console.error("Failed to fetch athlete data:", e);
                setIsLogged(false);
            }
        };
        fetchAthleteData();
    }, []);

    const handleLogin = () => {
        router.push("/api/auth/login");
    };

    const handleLogout = async () => {
        await fetch("/api/auth/logout");
        setIsLogged(false);
        setUserData(null);
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
};

export default Hero;
