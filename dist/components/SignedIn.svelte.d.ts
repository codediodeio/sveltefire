import { SvelteComponent } from "svelte";
import { signOut, type User, type Auth } from "firebase/auth";
declare const __propDef: {
    props: Record<string, never>;
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {
            user: User;
            auth: Auth;
            signOut: () => Promise<void>;
        };
    };
};
export type SignedInProps = typeof __propDef.props;
export type SignedInEvents = typeof __propDef.events;
export type SignedInSlots = typeof __propDef.slots;
export default class SignedIn extends SvelteComponent<SignedInProps, SignedInEvents, SignedInSlots> {
}
export {};
