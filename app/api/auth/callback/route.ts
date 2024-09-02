import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: Request) {
  const clientId = process.env.NEXT_PUBLIC_STRAVA_CLIENT_ID as string;
  const clientSecret = process.env.NEXT_PUBLIC_STRAVA_CLIENT_SECRET as string;
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json(
      { error: "Authorization code is missing" },
      { status: 400 }
    );
  }

  try {
    const response = await axios.post(
      "https://www.strava.com/oauth/token",
      null,
      {
        params: {
          client_id: clientId,
          client_secret: clientSecret,
          grant_type: "authorization_code",
          code: code as string,
        },
      }
    );

    const { refresh_token, access_token, athlete, expires_at } = response.data;

    cookies().set("rfresh_tkn", refresh_token, {
      httpOnly: true,
      secure: true,
      path: "/",
      expires: new Date(expires_at * 1000),
    });
    cookies().set("accss_tkn", access_token, {
      httpOnly: true,
      secure: true,
      path: "/",
      expires: new Date(expires_at * 1000),
    });
    cookies().set("user_details", JSON.stringify(athlete), {
      path: "/",
      expires: new Date(expires_at * 1000),
    });

    // const cleanUrl = new URL(req.url);
    // cleanUrl.searchParams.delete("code");
    return NextResponse.redirect(
      process.env.NEXT_PUBLIC_STRAVA_HOME_URL as string
    );
  } catch (error) {
    return NextResponse.json({ error: "Something happened" }, { status: 500 });
  }
}
