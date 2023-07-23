/// <reference types="svelte" />
/**
 * @param  {any} startWith optional default data. Useful for server-side cookie-based auth
 * @returns a store with the current firebase user
 */
export declare function userStore(startWith?: null): {
    subscribe: (this: void, run: import("svelte/store").Subscriber<import("@firebase/auth").User | null>, invalidate?: import("svelte/store").Invalidator<import("@firebase/auth").User | null> | undefined) => import("svelte/store").Unsubscriber;
};
