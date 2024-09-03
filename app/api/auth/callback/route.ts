import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import axios from "axios";

// Extract environment variables
const clientId = process.env.STRAVA_CLIENT_ID as string;
const clientSecret = process.env.STRAVA_CLIENT_SECRET as string;
const redirectUrl = process.env.APP_HOME_URL as string;
const workingEnv = process.env.NODE_ENV;

async function exchangeCodeForTokens(code: string) {
    try {
        const response = await axios.post(
            "https://www.strava.com/oauth/token",
            null,
            {
                params: {
                    client_id: clientId,
                    client_secret: clientSecret,
                    grant_type: "authorization_code",
                    code: code,
                },
            }
        );
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
        const isSecure = workingEnv === "production";

        cookies().set("rfresh_tkn", refresh_token, {
            httpOnly: true,
            secure: isSecure,
            sameSite: "lax",
            path: "/",
            expires: expirationDate,
        });

        cookies().set("accss_tkn", access_token, {
            httpOnly: true,
            secure: isSecure,
            sameSite: "lax",
            path: "/",
            expires: expirationDate,
        });

        cookies().set("user_details", JSON.stringify(athlete), {
            path: "/",
            expires: expirationDate,
            sameSite: "lax",
            httpOnly: true,
            secure: isSecure,
        });
    } catch (error) {
        throw new Error("Error setting cookies");
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

        return NextResponse.redirect(redirectUrl);
    } catch (error) {
        return NextResponse.json(
            { error: error || "Something went wrong" },
            { status: 500 }
        );
    }
}
