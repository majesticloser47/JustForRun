import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    const cookieStore = cookies();

    cookieStore.delete("accss_tkn");
    cookieStore.delete("rfresh_tkn");
    cookieStore.delete("user_details");

    return NextResponse.json({ isuser: false }, { status: 200 });
}
