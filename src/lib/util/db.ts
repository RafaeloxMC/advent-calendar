import { Pool, PoolClient } from "pg";
const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

let client: PoolClient | undefined;

const pool = new Pool({
	host: PGHOST,
	database: PGDATABASE,
	user: PGUSER,
	password: PGPASSWORD,
	port: 5432,
	ssl: true,
});

async function conn() {
	if (client) return client;
	client = await pool.connect();
	return client;
}

export async function selectAll() {
	await conn();
	return pool.query("SELECT * FROM neon_auth.users_sync");
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
	await conn();

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
