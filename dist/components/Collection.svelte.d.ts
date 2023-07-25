import { SvelteComponent } from "svelte";
import type { CollectionReference, Firestore, Query } from 'firebase/firestore';
declare const __propDef: {
    props: {
        ref: string | CollectionReference | Query;
        startWith?: any;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {
            data: any[];
            ref: CollectionReference | Query | null;
            count: number;
            firestore?: Firestore | undefined;
        };
        loading: {};
    };
};
export type CollectionProps = typeof __propDef.props;
export type CollectionEvents = typeof __propDef.events;
export type CollectionSlots = typeof __propDef.slots;
export default class Collection extends SvelteComponent<CollectionProps, CollectionEvents, CollectionSlots> {
}
export {};
