import { SvelteComponent } from "svelte";
import type { DocumentReference, Firestore } from 'firebase/firestore';
declare const __propDef: {
    props: {
        ref: string | DocumentReference;
        startWith?: any;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {
            data: any;
            ref: DocumentReference | null;
            firestore?: Firestore | undefined;
        };
        loading: {};
    };
};
export type DocProps = typeof __propDef.props;
export type DocEvents = typeof __propDef.events;
export type DocSlots = typeof __propDef.slots;
export default class Doc extends SvelteComponent<DocProps, DocEvents, DocSlots> {
}
export {};
