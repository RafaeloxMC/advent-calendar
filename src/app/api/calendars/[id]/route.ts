import { getCalendarByCalendarId } from "@/lib/util/db";
import { NextRequest, NextResponse } from "next/server";
import * as argon2 from "argon2";

export async function GET(req: NextRequest) {
	const id = req.nextUrl.pathname.split("/").pop();
	const password = req.nextUrl.searchParams.get("password");

	const calendar = await getCalendarByCalendarId(id ?? "");

	if (calendar?.password_hash) {
		if (
			!(await argon2.verify(
				calendar?.password_hash ?? "",
				password ?? ""
			))
		) {
			return NextResponse.json(
				{ error: "Unauthorized" },
				{ status: 401 }
			);
		}

		calendar.password_hash = "";
	}

	return NextResponse.json({
		calendar: calendar,
	});
}
