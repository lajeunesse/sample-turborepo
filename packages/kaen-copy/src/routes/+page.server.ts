
/** @type {import('./$types').PageServerLoad} */

export async function load({ locals }) {
    /**
     * we are not building the previews now.
     */
	// let result = await locals.poolClient.query(`select * from notes.note`);
	return {
		post: JSON.stringify([])
		// post: JSON.stringify(result.rows)
	};
};
