import { ADMIN_AUTH } from '$lib/server/admin';
import type { Handle } from '@sveltejs/kit';

export const handle = (async ({ event, resolve }) => {
    const sessionCookie = event.cookies.get('__session');

    console.log('Hooks are firing?')

    try {
        const decodedClaims = await ADMIN_AUTH.verifySessionCookie(sessionCookie!);

        console.log('decodedClaims: ', decodedClaims);

        event.locals.userID = decodedClaims.uid;

        if (decodedClaims.uid) {
            console.log('Found user id: ', decodedClaims.uid)
        } else {
            console.log('Did not find user')
        }
    } catch (e) {
        event.locals.userID = null;
        return resolve(event);
    }

    return resolve(event);
}) satisfies Handle;