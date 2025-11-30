import { Pool } from "pg";
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

export async function getUserCalendars(ownerId: string) {
	if (!ownerId) return;

	return pool
		.query(
			"SELECT * FROM advent_calendars WHERE owner_id = '" + ownerId + "'"
		)
		.then((res) => res.rows);
}
