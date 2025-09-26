import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { env } from '$env/dynamic/private';
// if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');
const client = postgres('postgres://mjl:ElTovar2016@host:1234/mjl');
export const db = drizzle(client);
