<script lang="ts">
  import Doc from '$lib/components/Doc.svelte';
  // import { collectionStore, docStore, userStore } from '$lib/stores';
  import User from '$lib/components/User.svelte';
  import { db as firestore, auth } from './firebase.js';
  import { signInAnonymously, signOut } from "firebase/auth";
  import { addDoc, collection, Firestore, orderBy, query, refEqual, where } from 'firebase/firestore';
  import Collection from '$lib/components/Collection.svelte';
  import FirebaseApp from '$lib/components/FirebaseApp.svelte';
  import SignedIn from '$lib/components/SignedIn.svelte';
  import SignedOut from '$lib/components/SignedOut.svelte';
  import { collectionStore, docStore, userDataStore } from '$lib/stores/firestore.js';
  import { userStore } from '$lib/stores/auth.js';

  async function addPost(uid:string) {
    const posts = collection(firestore, `users/${uid}/posts`);
    await addDoc(posts, {
      content: (Math.random() + 1).toString(36).substring(7),
      created: Date.now(),
    });
  }

  $: makeQuery = (uid:string) => {
    const q = query(collection(firestore, `users/${uid}/posts`), orderBy('created', 'desc'));
    return q;
  }

  // const userData = userDataStore<any>();
  // const userQuery= userQueryStore('posts');

  const myUser = userStore();
  const userData = docStore<{ name: string }>('users/Toy8wnsp9AMLdxtP8cR7idM8J263');
  const users = collectionStore<any>('users');


</script>

<h1>Welcome to SvelteFire</h1>

  <SignedIn let:user let:signOut>
    <p>Hi {user.displayName}</p>
    <button on:click={signOut}>Sign Out</button>
  </SignedIn>

  <SignedOut>
    <button on:click={() => signInAnonymously(auth)}>Sign in</button>
  </SignedOut>



  <Doc ref="posts/first-post" startWith={{ content: 'sup'}} let:data={post}>
    <p>{post?.content}</p>
    <div slot="loading">
      <p>Loading...</p>
    </div>
  </Doc>

  <User let:user>

    <p>Hello {user?.uid}</p>  

    <Doc ref="posts/first-post" let:data={post}>
      <p>{post?.content}</p>
      <div slot="loading">
        <p>Loading...</p>
      </div>
    </Doc>

    <h1>Your Posts</h1>

    <Collection ref={makeQuery(user.uid)} startWith={[]} let:data={posts} let:count>

      <p>You've made {count} posts</p>

      <ul>
        {#each posts as post (post.id)}
          <li>{post?.content} ... { post.id }</li>
        {/each}
      </ul>

      <button on:click={() => addPost(user.uid)}>Add Post</button>
    </Collection>


    <div slot="signedOut">
      <p>Sign in to do stuff</p>
      <button on:click={() => signInAnonymously(auth)}>Sign in</button>
    </div>
  </User>

  <p>
    <a href="/ssr">SSR Test</a>
  </p>

  <h1>User Query</h1>

  {$myUser?.uid}

  <!-- {#each $userQuery as post (post.id)}
    <li>{post?.content} ... { post.id }</li>
  {/each} -->

  {$userData?.name}

  {#each $users as user (user.id)}
    <li>{user?.name} ... { user.id }</li>
  {/each}