import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: Record<string, never>;
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type SignedOutProps = typeof __propDef.props;
export type SignedOutEvents = typeof __propDef.events;
export type SignedOutSlots = typeof __propDef.slots;
export default class SignedOut extends SvelteComponent<SignedOutProps, SignedOutEvents, SignedOutSlots> {
}
export {};
