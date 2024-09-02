import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
    const cookieStore = cookies();
    const userDet = cookieStore.get("user_details");
    const hasCookie = cookieStore.has("accss_tkn");

    if (userDet && hasCookie) {
        return NextResponse.json(JSON.parse(userDet.value));
    } else if (!hasCookie) {
        return NextResponse.json(
            { error: "No access token found" },
            { status: 401 }
        );
    } else {
        return NextResponse.json(
            { error: "No user data found" },
            { status: 404 }
        );
    }
}
