# SvelteFire

A minimal, yet powerful library that puts realtime Firebase data into Svelte stores. 

```svelte
<!-- 1. 🔥 Firebase App -->
<FirebaseApp {auth} {firestore}>

    <!-- 2. 👤 Get the current user -->
    <User let:user>

        <p>Howdy, {user.uid}</p>

        <!-- 3. 📜 Get a Firestore document owned by a user -->
        <Doc ref={`posts/${user.uid}`} let:data={post} let:ref={postRef}>
            
            <h2>{post.title}</h2>

            <!-- 4. 💬 Get all the comments in its subcollection -->
            <Collection ref={postRef.path + '/comments'} let:data={comments}>
                {#each comments as comment}

                {/each}
...
```

## Why?

Svelte makes it possible to dramatically simplify the way developers work with Firebase. Here are some problems the project solves:

- Access users and realtime Firestore data as Svelte stores 
- Automatic subscription disposal to prevent memory/cost leaks
- Better TypeScript experience for Firebase
- Handle complex relational data between Auth and Firestore
- Easily hydrate SvelteKit server data into a realtime Firebase stream

## Quick Start

1. Install Firebase `npm i firebase` v9+ and initialize it in a file like `lib/firebase.js`:

```ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Initialize Firebase
const app = initializeApp(/* your firebase config */);
export const db = getFirestore(app);
export const auth = getAuth(app);
```

2. Get the Current user

```svelte
<script>
  import { auth } from '$lib/firebase';
  import { userStore } from 'sveltefire';
  const user = userStore(auth);
</script>

Hello {$user?.uid}
```

3. Listen to realtime data. 

Use the `$` as much as you want - it will only result in one Firebase read request. When the all subscriptions are removed, it will automatically unsubscribe. 

```svelte
<script>
  import { firestore } from '$lib/firebase';
  import { docStore } from 'sveltefire';

  const post = docStore(firestore, 'posts/test');
</script>

{$post?.content}
{$post?.title}
```

Or better yet, use the built in `Doc` and `Collection` components. See below. 


## Stores

Stores are the building blocks of SvelteFire.

### Auth Store

Listen to the current user. Render UI conditionally based on the auth state:

```svelte
<script>
  import { userStore } from 'sveltefire';

  const user = userStore(auth);
</script>

{#if $user}
    <p>Hi {$user.uid}</p>
{:else}
    <p>Sign in...</p>
{/if}
```

### Firestore Stores

Subscribe to realtime data. The store will unsubscribe automatically to avoid unnecessary Firestore reads. 

```svelte
<script>
  import { docStore, collectionStore } from 'sveltefire';

  const post = docStore(firestore, 'posts/test');

  // OR 

  const posts = collectionStore(firestore, 'posts');
</script>

{$post?.content}

{#each $posts as p}

{/each}
```

Cast Firebase data to a TS interface:

```ts
interface Post {
    id: string;
    title: string;
    content: string;
}
const post = docStore<Post>(firestore, 'posts/test');
const posts = collectionStore<Post>(firestore, 'posts'); // returns 
```

Hydrate server-fetched data from SvelteKit into a realtime feed:

```ts
// Data fetched via server
export let data: PageData;

// Just give the store a startWith value 
const store = docStore(db, 'posts/test', data.thing);
```

## Realtime Components

In addition to stores, SvelteFire provides a set of components that can build complex realtime apps without leaving the HTML.

### FirebaseApp

Technically optional, this component puts Firebase into Svelte context. This avoids the need to pass `auth` and `firestore` down to every component. All other components should be nested below it. 
```svelte
<script>
  // Initialize Firebase...
  const db = getFirestore(app);
  const auth = getAuth(app);
</script>

<FirebaseApp {auth} {firestore}>

    <User let:user></User>
    <!-- other sveltefire components here -->

</FirebaseApp>
```

Note: Components outside a FirebaseApp will need the auth/firestore prop, i.e `<User auth={auth}>`

#### User

Get the current user. 

```svelte
<User let:user>
    Hello {user.uid}

    <div slot="signedOut">You are signed out</div>
</User>
```

### Doc

Fetch a single document and listen to data in realtime. The `data` slot prop provides access to the fetched data, while `ref` is the Firestore document reference.

```svelte
<Doc ref="posts/test" let:data let:ref>
    {data.content}
    {ref.path}
</Doc>
```

Slot props can be renamed:

```svelte
<Doc ref="posts/test" let:data={post} let:ref={postRef}>
    {post.content}
    {postRef.path}
</Doc>

All Firestore components can also handle loading states:
  
```svelte
<Doc path="posts/test">
    <!-- data renders here in the default slot -->
    <div slot="loading">Loading.... This will disappear when data is defined</div>
</Doc>
```

Pass a `startWith` value to bypass the loading state. This is useful in SvelteKit when you need to hydrate server data into a realtime stream:

```svelte
<Doc ref="posts/test" startWith={dataFromServer} />
```


### Collection

Collections provides array of objects containing the document data, as well as the `id` and `ref` for each result. It also provides a `count` slot prop for number of docs in the query. 

```svelte
<Collection ref="posts" let:data let:count>
  <p>Fetched {count} documents</p>
  {#each data as post}
    {post.id}
    {post.ref.path}
    {post.content}
  {/each}
</Collection>
```

Collections can also take a Firestore Query instead of a path:

```svelte
<script>
    const testQuery = query(collection(firestore, 'posts'), where('test', '==', 'test'));
</script>

<Collection ref={testQuery} let:data>
</Collection>
```

For complex queries that required dynamic data, it can be useful to build the query reactively.

```svelte
<script>
  $: buildQuery = (uid:string) => {
    return query(collection(firestore, 'posts'), where('uid', '==', uid));
  }
</script>

<User let:user>
  <Collection ref={buildQuery(user.uid)} />
</User>
```
### Using Components Together

These components can be combined to build complex realtime apps. It's especially powerful when fetching data that requires the current user's UID or a related document's path.


```svelte
<FirebaseApp {auth} {firestore}>
  <User let:user>
      <p>UID: {user.uid}</p>
      

      <h3>Profile</h3>
      <Doc ref={`posts/${user.uid}`} let:data={profile} let:ref={profileRef}>

        {profile.content}


        <h4>Comments</h4>
        <Collection ref={profileRef.path + '/comments'} let:data={comments}>
          {#each comments as comment}
            <strong>{comment.content}</strong>
          {/each}

          <div slot="loading">Loading Comments...</div>
        </Collection>

        <div slot="loading">Loading Profile...</div>
      </Doc>

      <div slot="signedOut">Signed out</div>
  </User>
</FirebaseApp>
```


## Notes

- This library should only run the the client, it is not for server-side data fetching. 
- Requires Firebase v9 or greater. 
- I've have not been able to get TS generics to work right in the components yet, so no intellisense on the `data` slot prop. 
