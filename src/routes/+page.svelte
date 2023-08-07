<script lang="ts">
  import { getFirebaseContext } from "$lib/stores/sdk.js";


  const ctx = getFirebaseContext();

</script>

<h1>Welcome to SvelteFire</h1>

<ul>
  <li><a href="/auth-test">Auth Test</a></li>
  <li><a href="/firestore-test">Firestore Test</a></li>
  <li><a href="/ssr-test">SSR Test</a></li>
  <li><a href="/storage-test">Storage Test</a></li>
</ul>
<ul>
  <li data-testid="auth">Auth Context: {!!ctx.auth}</li>
  <li data-testid="firestore">Firestore Context: {!!ctx.firestore}</li>
  <li data-testid="firestore">Storage Context: {!!ctx.storage}</li>
</ul>
