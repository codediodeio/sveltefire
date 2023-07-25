import { SvelteComponent } from "svelte";
import type { Auth } from "firebase/auth";
import type { Firestore } from "firebase/firestore";
declare const __propDef: {
    props: {
        firestore: Firestore;
        auth: Auth;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type FirebaseAppProps = typeof __propDef.props;
export type FirebaseAppEvents = typeof __propDef.events;
export type FirebaseAppSlots = typeof __propDef.slots;
export default class FirebaseApp extends SvelteComponent<FirebaseAppProps, FirebaseAppEvents, FirebaseAppSlots> {
}
export {};
