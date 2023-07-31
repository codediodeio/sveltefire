---
title: SignedIn Component
pubDate: 2023-07-23
description: SvelteFire SignedIn Component API reference
layout: ../../layouts/MainLayout.astro
---

# SignedIn

The `SignedIn` component renders content for the current user. It is a wrapper around the `userStore`. If the user is not signed in, the children will not be rendered. 

### Slot Props

- `user` - The current Firebase user
- `auth` - The current Firebase auth instance
- `signOut` - A function to sign out the current user

### Example

```svelte
<script>
    import { SignedIn } from 'sveltefire';
</script>

<SignedIn let:user>
    <p>Howdy, {user.uid}</p>
</SignedIn>


<SignedIn let:signOut>
    <button on:click={signOut}>Sign Out</button>
</SignedIn>
```