import type { Query, CollectionReference, DocumentReference, DocumentData } from "firebase/firestore";
import type { Readable } from "svelte/motion";
interface DocStore<T> {
    subscribe: (cb: (value: T | null) => void) => void | (() => void);
    ref: DocumentReference | null;
    id: string;
}
/**
 * @param  {string|DocumentReference} ref document path or reference
 * @param  {T} startWith optional default data
 * @returns a store with realtime updates on document data
 */
export declare function docStore<T>(ref: string | DocumentReference, startWith?: T): DocStore<T>;
interface CollectionStore<T> {
    subscribe: (cb: (value: T | []) => void) => void | (() => void);
    ref: CollectionReference | Query | null;
}
/**
 * @param  {string|Query|CollectionReference} ref collection path, reference, or query
 * @param  {[]} startWith optional default data
 * @returns a store with realtime updates on collection data
 */
export declare function collectionStore<T>(ref: string | Query | CollectionReference, startWith?: T[]): CollectionStore<T[]>;
/**
 * experimental, fetch document based on curret user
 */
export declare function userDataStore<T = DocumentData>(collectionPath?: string): Readable<T | null>;
export {};
