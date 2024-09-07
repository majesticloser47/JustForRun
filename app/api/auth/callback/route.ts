import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import axios from "axios";
import { env } from "@/utils/env";

const {
    STRAVA_CLIENT_ID,
    STRAVA_CLIENT_SECRET,
    STRAVA_FETCH_TOKEN,
    APP_HOME_URL,
    NODE_ENV,
} = env;

async function exchangeCodeForTokens(code: string) {
    try {
        const response = await axios.post(STRAVA_FETCH_TOKEN, null, {
            params: {
                client_id: STRAVA_CLIENT_ID,
                client_secret: STRAVA_CLIENT_SECRET,
                grant_type: "authorization_code",
                code: code,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error("Error exchanging authorization code for tokens");
    }
}

function setCookies(data: {
    refresh_token: string;
    access_token: string;
    athlete: any;
    expires_at: number;
}) {
    try {
        const { refresh_token, access_token, athlete, expires_at } = data;
        const expirationDate = new Date(expires_at * 1000);
        const isSecure = NODE_ENV === "production";

        // Retrieve the cookies object
        const cookieStore = cookies();

        const cookieOptions = {
            httpOnly: true,
            secure: isSecure,
            sameSite: "lax" as const,
            path: "/",
            expires: expirationDate,
        };

        // Set the cookies using the cookieStore
        cookieStore.set("rfresh_tkn", refresh_token, cookieOptions);
        cookieStore.set("accss_tkn", access_token, cookieOptions);
        cookieStore.set("user_details", JSON.stringify(athlete), cookieOptions);
    } catch (error) {
        throw new Error("Error setting cookies: " + error);
    }
}

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");

    if (!code) {
        return NextResponse.json(
            { error: "Authorization code is missing" },
            { status: 400 }
        );
    }

    try {
        const tokenData = await exchangeCodeForTokens(code);
        setCookies(tokenData);
        return NextResponse.redirect(APP_HOME_URL);
    } catch (error) {
        return NextResponse.json(
            { error: error || "Something went wrong" },
            { status: 500 }
        );
    }
}
