<script lang="ts">
  import { setFirebaseContext } from "$lib/stores/sdk.js";
  import type { FirebaseApp } from "firebase/app";
  import type { Auth } from "firebase/auth";
  import type { Firestore } from "firebase/firestore";
  import type { FirebaseStorage } from "firebase/storage";

  export let app: FirebaseApp;
  export let firestore: Firestore;
  export let auth: Auth;
  export let storage: FirebaseStorage;

  setFirebaseContext({ firestore, auth, storage, app });
</script>

<slot />
