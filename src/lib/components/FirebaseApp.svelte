<script lang="ts">
  import { setFirebaseContext } from "$lib/stores/sdk.js";
  import type { Auth } from "firebase/auth";
  import type { Firestore } from "firebase/firestore";
  import type { Database } from "firebase/database";

  export let firestore: Firestore;
  export let rtdb: Database;
  export let auth: Auth;

  setFirebaseContext({ firestore, rtdb, auth });
</script>

<slot />
