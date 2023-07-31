---
title: SignedOut Component
pubDate: 2023-07-23
description: SvelteFire SignedOut Component API reference
layout: ../../layouts/MainLayout.astro
---

# SignedOut

The `SignedOut` component renders content when the current user is `null`. It is a wrapper around the `userStore`. If the user is signed in, the children will not be rendered.

### Slot Props

- `auth` - The current Firebase auth instance

### Example

```svelte
<script>
    import { SignedOut } from 'sveltefire';
    import { signInAnonymously } from "firebase/auth";
</script>

<SignedOut>
    You must be signed in to see this!
</SignedOut>


<SignedOut let:auth>
    <button on:click={() => signInAnonymously(auth)}>Sign In</button>
</SignedOut>
```
