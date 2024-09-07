import { NextResponse } from "next/server";
import { env } from "@/utils/env";

export async function GET() {
    const { STRAVA_CLIENT_ID, STRAVA_CALLBACK_URL, STRAVA_NEW_LOGIN } = env;
    const response_type = "code";
    const scope = "read";
    const reqUrl = new URL(STRAVA_NEW_LOGIN);

    reqUrl.searchParams.set("client_id", STRAVA_CLIENT_ID);
    reqUrl.searchParams.set("redirect_uri", STRAVA_CALLBACK_URL);
    reqUrl.searchParams.set("response_type", response_type);
    reqUrl.searchParams.set("scope", scope);

    return NextResponse.redirect(reqUrl.toString());
}
