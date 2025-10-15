import { defineConfig } from 'drizzle-kit';
import 'dotenv/config';

export default defineConfig({
	dialect: 'postgresql',
	schema: './src/lib/server/db/schema.ts',
	out: './drizzle',

	dbCredentials: {
		url: process.env.DATABASE_URL
	},

	verbose: true,
	strict: true
});
if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not set');
