import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const user = pgTable('notes.auth_user', {
	id: text('id').primaryKey(),
	username: text('username').notNull().unique(),
	passwordHash: text('hashed_password').notNull()
});

export const session = pgTable('session', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull()
});

export type Session = typeof session.$inferSelect;

export type User = typeof user.$inferSelect;
