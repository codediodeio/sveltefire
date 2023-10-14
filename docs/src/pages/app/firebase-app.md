---
title: FirebaseApp Component
pubDate: 2023-07-23
description: SvelteFire FirebaseApp Component API reference
layout: ../../layouts/MainLayout.astro
---

# FirebaseApp

Puts the Firebase app into Svelte's context. It should be used as a parent to all other SvelteFire components.

### Props

- `firestore` - Firebase Auth instance
- `auth` - Firestore instance
- `storage` - Firebase Storage instance

### Example

```svelte
<script>
  import { FirebaseApp } from "sveltefire";
  import { initializeApp } from "firebase/app";
  import { getFirestore } from "firebase/firestore";
  import { getAuth } from "firebase/auth";

  // Initialize Firebase
  const app = initializeApp(/* your firebase config */);
  const firestore = getFirestore(app);
  const auth = getAuth(app);
</script>

<FirebaseApp {auth} {firestore}>
  <slot />
</FirebaseApp>
```
