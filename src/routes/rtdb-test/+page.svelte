<script lang="ts">
  import DataRef from "$lib/components/DataRef.svelte";
  import DataList from "$lib/components/DataList.svelte";
  import SignedOut from "$lib/components/SignedOut.svelte";
  import SignedIn from "$lib/components/SignedIn.svelte";
  import { signInAnonymously } from "firebase/auth";
  import { push, ref } from "firebase/database";
  import { getFirebaseContext } from "$lib/stores/sdk.js";

  const rtdb = getFirebaseContext().rtdb!;

  async function addPost(uid: string) {
    const postsRef = ref(rtdb, `users/${uid}/posts`);
    await push(postsRef, {
      content: "RTDB item " + (Math.random() + 1).toString(36).substring(7),
      created: Date.now(),
    });
  }
</script>

<h1>Realtime Database Test</h1>

<h2>Single Data Reference</h2>

<DataRef ref="posts/test" let:data={post}>
  <p data-testid="ref-data">{post?.title}</p>
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
  <DataList
    ref={`users/${user.uid}/posts`}
    startWith={[]}
    let:data={posts}
    let:count
  >
    <p data-testid="count">You've made {count} posts</p>

    <ul>
      {#each posts as post (post.ref.key)}
        <li>{post?.content} ... {post.ref.key}</li>
      {/each}
    </ul>

    <button on:click={() => addPost(user.uid)}>Add Data</button>
  </DataList>
</SignedIn>
