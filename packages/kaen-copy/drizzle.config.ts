import { defineConfig } from 'drizzle-kit';

export default defineConfig({
	dialect: 'postgresql',
	schema: './src/schema.ts',
	out: './drizzle',

	dbCredentials: {
		url: 'postgres://mjl:ElTovar2016@host:1234/mjl'
	},

	verbose: true,
	strict: true
});
if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not set');
