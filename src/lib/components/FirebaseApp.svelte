<script lang="ts">
  import { setFirebaseContext } from "$lib/stores/sdk.js";
  import type { FirebaseApp } from "firebase/app";
  import type { Auth } from "firebase/auth";
  import type { Firestore } from "firebase/firestore";
  import type { Database } from "firebase/database";
  import type { FirebaseStorage } from "firebase/storage";

  export let app: FirebaseApp;
  export let firestore: Firestore;
  export let rtdb: Database;
  export let auth: Auth;
  export let storage: FirebaseStorage;

  setFirebaseContext({ firestore, rtdb, auth, storage, app });
</script>

<slot />
