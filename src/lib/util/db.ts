import { Pool } from "pg";
import { ICalendar } from "./types";
const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

const pool = new Pool({
	host: PGHOST,
	database: PGDATABASE,
	user: PGUSER,
	password: PGPASSWORD,
	port: 5432,
	ssl: true,
});

export async function selectAll() {
	return pool
		.query("SELECT * FROM neon_auth.users_sync")
		.then((res) => res.rows);
}

export async function newCalendar(
	ownerId: string,
	title: string,
	year: number,
	password_hash: string
) {
	if (!ownerId) return;
	if (!year) return;
	if (!title) return;

	const columns = ["owner_id", "title", "year"];
	const values = [ownerId, title, year];

	if (password_hash) {
		columns.push("password_hash");
		values.push(password_hash);
	}

	const placeholders = values.map((_, i) => `$${i + 1}`).join(", ");
	const query = `INSERT INTO advent_calendars (${columns.join(
		", "
	)}) VALUES (${placeholders})`;

	return pool.query(query, values);
}

export async function getUserCalendars(
	ownerId: string
): Promise<ICalendar[] | undefined> {
	if (!ownerId || ownerId.length <= 0) return;

	return pool
		.query(
			"SELECT * FROM advent_calendars WHERE owner_id = '" + ownerId + "'"
		)
		.then((res) => res.rows);
}

export async function getCalendarByCalendarId(
	calendarId: string
): Promise<ICalendar | undefined> {
	if (!calendarId || calendarId.length <= 0) return;

	return pool
		.query(
			"SELECT * FROM advent_calendars WHERE calendar_id = '" +
				calendarId +
				"'"
		)
		.then((res) => res.rows[0] as ICalendar);
}

export async function updateCalendarDoors(
	calendarId: string,
	doors: { name: string; content: string }[]
): Promise<ICalendar | undefined> {
	if (!calendarId || calendarId.length <= 0) return;

	const doorsJsonbArray = doors.map((door) => JSON.stringify(door));

	const query = `
		UPDATE advent_calendars 
		SET doors = ARRAY(SELECT jsonb(unnest($1::text[]))), updated_at = NOW() 
		WHERE calendar_id = $2 
		RETURNING *
	`;

	return pool
		.query(query, [doorsJsonbArray, calendarId])
		.then((res) => res.rows[0] as ICalendar);
}
