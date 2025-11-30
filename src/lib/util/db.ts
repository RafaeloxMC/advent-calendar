import postgres, { Sql } from "postgres";

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

interface SQLQ extends Sql {
	query(qry: string): void;
}

const conn = postgres({
	host: PGHOST,
	database: PGDATABASE,
	username: PGUSER,
	password: PGPASSWORD,
	port: 5432,
	ssl: "require",
});

export function selectAll() {
	return (conn as SQLQ).query("SELECT * FROM neon_auth.users_sync");
}
