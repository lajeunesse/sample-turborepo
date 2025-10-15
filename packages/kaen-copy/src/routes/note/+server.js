import { json } from '@sveltejs/kit';
export async function GET() {
	return new Response();
}

export async function POST({ request, cookies, locals }) {
	const payload = await request.json();
	const session = cookies.get('auth_session');
	const result = await locals.poolClient.query(
		`insert
		   into notes.note (note_json, user_id)
	     select $1, user_id
			   from notes.user_session
				where id = $2 
		   returning id`,
		[payload, session]
	);
	console.log(result);
	return json({ status: 201, id: result.rows[0].id });
}
