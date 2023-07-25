import { SvelteComponent } from "svelte";
import type { User } from "firebase/auth";
declare const __propDef: {
    props: Record<string, never>;
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {
            user: User;
        };
        signedOut: {};
    };
};
export type UserProps = typeof __propDef.props;
export type UserEvents = typeof __propDef.events;
export type UserSlots = typeof __propDef.slots;
export default class User extends SvelteComponent<UserProps, UserEvents, UserSlots> {
}
export {};
