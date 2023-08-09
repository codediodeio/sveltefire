<script lang="ts">
  import DataRef from "$lib/components/DataRef.svelte";
  import DataList from "$lib/components/DataList.svelte";
  import SignedOut from "$lib/components/SignedOut.svelte";
  import SignedIn from "$lib/components/SignedIn.svelte";
  import { signInAnonymously } from "firebase/auth";
  import { push, ref } from "firebase/database";
  import { getFirebaseContext } from "$lib/stores/sdk.js";

  const rtdb = getFirebaseContext().rtdb!;

  async function addData(uid: string) {
    const dataRef = ref(rtdb, `users/${uid}/data`);
    await push(dataRef, {
      content: "RTDB item " + (Math.random() + 1).toString(36).substring(7),
      created: Date.now(),
    });
  }
</script>

<h1>Realtime Database Test</h1>

<h2>Single Data Reference</h2>

<DataRef path="test" let:data>
  <p data-testid="ref-data">{data.key}</p>
  <div slot="loading">
    <p data-testid="loading">Loading...</p>
  </div>
</DataRef>

<h2>User Owned Data</h2>

<SignedOut let:auth>
  <h2>Signed Out</h2>
  <button on:click={() => signInAnonymously(auth)}>Sign In</button>
</SignedOut>

<SignedIn let:user>
  <h2>Data List</h2>
  <DataList path={`users/${user.uid}/data`} startWith={[]} let:data let:count>
    <p data-testid="count">You've {count} items</p>

    <ul>
      {#each data as item (item.key)}
        <li>{item.content} ... {item.key}</li>
      {/each}
    </ul>

    <button on:click={() => addData(user.uid)}>Add Data</button>
  </DataList>
</SignedIn>
