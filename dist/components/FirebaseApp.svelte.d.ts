import { SvelteComponent } from "svelte";
import type { Auth } from "firebase/auth";
import type { Firestore } from "firebase/firestore";
import type { Database } from "firebase/database";
import type { FirebaseStorage } from "firebase/storage";
declare const __propDef: {
    props: {
        firestore: Firestore;
        rtdb: Database;
        auth: Auth;
        storage: FirebaseStorage;
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
