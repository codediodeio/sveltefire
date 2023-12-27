import type { PageServerLoad } from './$types';

export const load: PageServerLoad = (async () => {
    return {
        title: 'Analytics Test 1 - Server Rendered',
    };
}) satisfies PageServerLoad;