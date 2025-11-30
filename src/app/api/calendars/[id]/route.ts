import { getCalendarByCalendarId } from "@/lib/util/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	const id = req.nextUrl.pathname.split("/").pop();

	return NextResponse.json({
		calendar: await getCalendarByCalendarId(id ?? ""),
	});
}
