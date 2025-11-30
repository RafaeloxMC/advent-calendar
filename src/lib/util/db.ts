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
