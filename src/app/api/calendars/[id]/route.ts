import { getCalendarByCalendarId, updateCalendarDoors } from "@/lib/util/db";
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

export async function PATCH(req: NextRequest) {
	const id = req.nextUrl.pathname.split("/").pop();

	if (!id) {
		return NextResponse.json(
			{ error: "Calendar ID is required" },
			{ status: 400 }
		);
	}

	try {
		const body = await req.json();
		const { doors } = body;

		if (!doors || !Array.isArray(doors)) {
			return NextResponse.json(
				{ error: "Doors array is required" },
				{ status: 400 }
			);
		}

		const updatedCalendar = await updateCalendarDoors(id, doors);

		if (!updatedCalendar) {
			return NextResponse.json(
				{ error: "Calendar not found" },
				{ status: 404 }
			);
		}

		return NextResponse.json({
			success: true,
			calendar: updatedCalendar,
		});
	} catch (error) {
		console.error("Failed to update calendar:", error);
		return NextResponse.json(
			{ error: "Failed to update calendar" },
			{ status: 500 }
		);
	}
}
