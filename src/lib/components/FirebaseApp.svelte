<script lang="ts">
  import { setFirebaseContext } from "$lib/stores/sdk.js";
  import type { Auth } from "firebase/auth";
  import type { Firestore } from "firebase/firestore";
  import type { Database } from "firebase/database";
  import type { FirebaseStorage } from "firebase/storage";
  import type { Analytics } from "firebase/analytics";

  export let firestore: Firestore | undefined = undefined;
  export let rtdb: Database | undefined = undefined;
  export let auth: Auth | undefined = undefined;
  export let storage: FirebaseStorage | undefined = undefined;
  export let analytics: Analytics | undefined = undefined;

  setFirebaseContext({ firestore, rtdb, auth, storage, analytics });
</script>

<slot />
