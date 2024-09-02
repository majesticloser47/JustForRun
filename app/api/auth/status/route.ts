import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
    const cookieStore = cookies();
    const hasCookie = cookieStore.has("accss_tkn");

    if (hasCookie) {
        return NextResponse.json({ isuser: true }, { status: 200 });
    } else {
        return NextResponse.json({ isuser: false }, { status: 401 });
    }
}
