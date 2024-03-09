import type { PageServerLoad } from './$types';
//import { redirect } from '@sveltejs/kit';

export const load = (async ({ locals }) => {
    const uid = locals.userID;

    if (!uid) {
        console.log('No uid found, from +page.server.ts');
        console.log('locals: ', locals)
        //throw redirect(301, '/login');
    }

    return {
        message: "Hello from Dashboard +page.server.ts"
    };
}) satisfies PageServerLoad;