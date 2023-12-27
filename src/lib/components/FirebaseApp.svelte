<script lang="ts">
  import { setFirebaseContext } from "$lib/stores/sdk.js";
  import type { Auth } from "firebase/auth";
  import type { Firestore } from "firebase/firestore";
  import type { Database } from "firebase/database";
  import type { FirebaseStorage } from "firebase/storage";
  import type { Analytics } from "firebase/analytics";

  export let firestore: Firestore;
  export let rtdb: Database;
  export let auth: Auth;
  export let storage: FirebaseStorage;
  export let analytics: Analytics | null;

  setFirebaseContext({ firestore, rtdb, auth, storage, analytics });
</script>

<slot />
