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

    useEffect(() => {
        const fetchAthleteData = async () => {
            try {
                const res = await fetch("/api/auth/athlete");
                if (res.ok) {
                    const data = await res.json();
                    setuserData(data);
                    setisLogged(true);
                } else {
                    setisLogged(false);
                }
            } catch (e) {
                console.error("Failed to fetch athlete data:", e);
                setisLogged(false);
            }
        };
        fetchAthleteData();
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
