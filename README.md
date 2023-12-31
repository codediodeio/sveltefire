<div align="center">
<img width="128px" src="https://github.com/codediodeio/sveltefire/blob/master/docs/public/logo.png?raw=true">
<h1>SvelteFire <a href=""></h1>
<img alt="npm" src="https://img.shields.io/npm/dy/sveltefire">
<a href="https://discord.gg/fireship" target="_blank"><img alt="Discord" src="https://img.shields.io/discord/1015095797689360444?label=Discord"></a>
<img alt="License" src="https://img.shields.io/github/license/codediodeio/sveltefire">
<h6><i>Cybernetically Enhanced Firebase Apps</i></h6>
<hr />
</div>

<!-- ![npm](https://img.shields.io/npm/dy/sveltefire)
![Discord](https://img.shields.io/discord/1015095797689360444)
![GitHub License](https://img.shields.io/github/license/codediodeio/sveltefire) -->


A minimal, yet powerful library that puts realtime Firebase data into Svelte stores.

- [Quick Start](https://sveltefire.fireship.io/guide/start)
- [Documentation](https://sveltefire.fireship.io)

## Build Complex Apps Faster

SvelteFire allows you to access Firebase Auth, Firestore, Storage, RealtimeDB, and Analytics with minimal complexity. It simplfies relational data with a declarative syntax, handles loading states, automatically disposes of realtime data subscriptions, and more! 

Gaze in awe at the example below where we fetch multiple levels of realtime user data with just a few lines of Svelte code:

```svelte
<!-- 1. 🔥 Firebase App -->
<FirebaseApp {auth} {firestore}>

  <!-- 2. 👤 Get the current user -->
  <SignedIn let:user>

    <p>Howdy, {user.uid}</p>

    <!-- 3 (a). 📜 Get a Firestore document owned by a user -->
    <Doc ref={`posts/${user.uid}`} let:data={post} let:ref={postRef}>

      <h2>{post.title}</h2>

      <!-- 4 (a). 💬 Get all the comments in its subcollection -->
      <Collection ref={postRef.path + '/comments'} let:data={comments}>
        {#each comments as comment}

        {/each}
...
```

Each component in this example above is underpinned by a Svelte store.  These custom stores can be used for fine-grained control and to implement your own custom patterns.

Use stores to access Firebase data with Svelte's reactive `$` syntax:

```svelte
<script>
    import { docStore } from 'sveltefire';
    import { firestore } from '$lib/firebase'; // your firestore instance

    const post = docStore(firestore, 'posts/id');
</script>

{$post?.title}
```