import { stackServerApp } from "@/stack/server";
import { NextResponse } from "next/server";

export async function GET() {
	const user = await stackServerApp.getUser();

	if (!user)
		return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

	return NextResponse.json(user);
}
