<script lang="ts">
  import Doc from '$lib/Doc.svelte';
  import { collectionStore, docStore, userStore } from '$lib/stores';
  import User from '$lib/User.svelte';
  import { db as firestore, auth } from './firebase';
  import { signInAnonymously } from "firebase/auth";
  import { addDoc, collection, Firestore, orderBy, query, refEqual, where } from 'firebase/firestore';
  import Collection from '$lib/Collection.svelte';
  import FirebaseApp from '$lib/FirebaseApp.svelte';

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



</script>

<FirebaseApp {auth} {firestore}>

  <Doc ref="posts/test" startWith={{ content: 'sup'}} let:data={post}>
    <p>{post?.content}</p>
    <div slot="loading">
      <p>Loading...</p>
    </div>
  </Doc>

  <User let:user>

    <p>Hello {user?.uid}</p>  

    <Doc ref="posts/test" let:data={post}>
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
          <li>{post.content} ... { post.id }</li>
        {/each}
      </ul>

      <button on:click={() => addPost(user.uid)}>Add Post</button>
    </Collection>

    <div slot="signedOut">
      <p>Sign in to do stuff</p>
      <button on:click={() => signInAnonymously(auth)}>Sign in</button>
    </div>
  </User>
</FirebaseApp>