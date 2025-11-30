import { newCalendar } from "@/lib/util/db";
import { stackServerApp } from "@/stack/server";
import { NextRequest, NextResponse } from "next/server";
import * as argon2 from "argon2";

export async function POST(req: NextRequest) {
	let body;

	try {
		body = await req.json();
	} catch {
		return NextResponse.json({ message: "Bad request" }, { status: 400 });
	}

	if (!body || !body.year || !body.title)
		return NextResponse.json({ message: "Bad request" }, { status: 400 });

	const user = await stackServerApp.getUser();

	if (!user) {
		return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
	}

	const owner_id = user.id;
	const title = body.title;
	const year: number = body.year;
	let password_hash;

	if (body.password_hash) {
		password_hash = await argon2.hash(body.password_hash);
	}

	try {
		const res = await newCalendar(
			owner_id,
			title,
			year,
			password_hash ?? ""
		);
		return NextResponse.json(
			{ message: "Success", res: res },
			{ status: 200 }
		);
	} catch (error: unknown) {
		const err = error as { code?: string; message?: string };
		if (err?.code === "23505" || err?.message?.includes("duplicate key")) {
			return NextResponse.json(
				{ message: "This calendar already exists" },
				{ status: 409 }
			);
		}
		throw error;
	}
}
