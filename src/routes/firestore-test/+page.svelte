<script lang="ts">
  import Doc from "$lib/components/Doc.svelte";
  import SignedOut from '$lib/components/SignedOut.svelte';
  import { signInAnonymously } from "firebase/auth";
  import {
    addDoc,
    collection,
    orderBy,
    query,
  } from "firebase/firestore";
  import Collection from "$lib/components/Collection.svelte";
  import SignedIn from "$lib/components/SignedIn.svelte";
  import { getFirebaseContext } from "$lib/stores/sdk.js";

  const firestore = getFirebaseContext().firestore!;

  async function addPost(uid: string) {
    const posts = collection(firestore, `users/${uid}/posts`);
    await addDoc(posts, {
      content: 'firestore item ' + (Math.random() + 1).toString(36).substring(7),
      created: Date.now(),
    });
  }

  $: makeQuery = (uid: string) => {
    const q = query(
      collection(firestore, `users/${uid}/posts`),
      orderBy("created")
    );
    return q;
  };
</script>

<h1>Firestore Test</h1>

<h2>Single Document</h2>

<Doc ref="posts/test" let:data={post}>
  <p data-testid="doc-data">{post?.title}</p>
  <div slot="loading">
    <p data-testid="loading">Loading...</p>
  </div>
</Doc>

<h2>User Owned Posts</h2>

<SignedOut let:auth>
    <h2>Signed Out</h2>
   <button on:click={() => signInAnonymously(auth)}>Sign In</button>
</SignedOut>



<SignedIn let:user>
  <h2>Collection</h2>
  <Collection
    ref={makeQuery(user.uid)}
    startWith={[]}
    let:data={posts}
    let:count
  >
    <p data-testid="count">You've made {count} posts</p>

    <ul>
      {#each posts as post (post.id)}
        <li>{post?.content} ... {post.id}</li>
      {/each}
    </ul>

    <button on:click={() => addPost(user.uid)}>Add Post</button>
  </Collection>

  <h2>Should show an error</h2>
  <Doc ref="invalid" let:error>
    <div slot="loading">
      <p data-testid="loading">Loading...</p>
    </div>
    {#if error !== null}
      <p data-testid="error">Error occured {error}</p>
    {:else}
      <p data-testid="error">No error while retrieving data</p>
    {/if}
  </Doc>
</SignedIn>
