import { pgSchema, pgTable, serial, text, integer, pgSequence } from 'drizzle-orm/pg-core';

export const appSchema = pgSchema('notes');

export const userTable = appSchema.table('auth_user', {
	id: text('id').primaryKey(),
	username: text(`username`),
	hashed_password: text(`hashed_password`),
});
