<script lang="ts">
  import { setFirebaseContext } from "$lib/stores/sdk.js";
  import type { Auth } from "firebase/auth";
  import type { Firestore } from "firebase/firestore";
  import type { FirebaseStorage } from "firebase/storage";

  export let firestore: Firestore;
  export let auth: Auth;
  export let storage: FirebaseStorage;

  setFirebaseContext({ firestore, auth, storage });
</script>

<slot />
