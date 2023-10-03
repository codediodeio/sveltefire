<script lang="ts">
  import { setFirebaseContext } from "$lib/stores/sdk.js";
  import type { Auth } from "firebase/auth";
  import type { Firestore } from "firebase/firestore";
  import type { FirebaseStorage } from "firebase/storage";

  export let auth: Auth | undefined = undefined;
  export let firestore: Firestore | undefined = undefined;
  export let storage: FirebaseStorage | undefined = undefined;

  setFirebaseContext({ auth, firestore, storage });
</script>

<slot />
