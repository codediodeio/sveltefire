<script lang="ts">
  import { setFirebaseContext } from "$lib/stores/sdk.js";
  import type { Auth } from "firebase/auth";
  import type { Firestore } from "firebase/firestore";

  export let firestore: Firestore;
  export let auth: Auth;

  setFirebaseContext({ firestore, auth });
</script>

<slot />
