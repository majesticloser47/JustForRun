import { NextResponse } from "next/server";

export async function GET() {
    const clientId = process.env.NEXT_PUBLIC_STRAVA_CLIENT_ID as string;
    const redirectURI = process.env.NEXT_PUBLIC_STRAVA_REDIRECT_URL as string;
    const response_type = "code";
    const scope = "read";
    const reqUrl = new URL("https://www.strava.com/oauth/authorize");

    reqUrl.searchParams.set("client_id", clientId);
    reqUrl.searchParams.set("redirect_uri", redirectURI);
    reqUrl.searchParams.set("response_type", response_type);
    reqUrl.searchParams.set("scope", scope);

    return NextResponse.redirect(reqUrl.toString());
}
