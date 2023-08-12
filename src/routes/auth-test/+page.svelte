<script lang="ts">
  import SignedIn from '$lib/components/SignedIn.svelte';
  import SignedOut from '$lib/components/SignedOut.svelte';
  import { signInAnonymously } from "firebase/auth";
</script>

<h1>Auth Test</h1>

<SignedIn let:user let:signOut>
    <h2>Signed In</h2>
    <p>Hello {user.uid}</p>
    <button on:click={signOut}>Sign Out</button>
</SignedIn>

<SignedOut let:auth>
     <h2>Signed Out</h2>
    <button on:click={() => signInAnonymously(auth)}>Sign In</button>
</SignedOut>
