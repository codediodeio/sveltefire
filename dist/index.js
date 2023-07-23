// Reexport your entry components here
import User from './components/User.svelte';
import Collection from './components/Collection.svelte';
import Doc from './components/Doc.svelte';
import FirebaseApp from './components/FirebaseApp.svelte';
import SignedIn from './components/SignedIn.svelte';
import SignedOut from './components/SignedOut.svelte';
// import { docStore, collectionStore } from './stores/stores.js';
import { userStore } from './stores/auth.js';
import { docStore, collectionStore  } from './stores/firestore.js';

export {
    Doc,
    User,
    Collection,
    FirebaseApp,
    SignedOut,
    SignedIn,
    docStore,
    collectionStore,
    userStore
}