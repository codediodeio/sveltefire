---
title: getFirebaseContext
pubDate: 2023-07-23
description: SvelteFire FirebaseApp Component API reference
layout: ../../layouts/MainLayout.astro
---

# getFirebaseContext

Get the Firebase SDK context from a component.

### Example

```svelte
<script>
  import { getFirebaseContext } from "sveltefire";
  const { auth, firestore, storage } = getFirebaseContext();
</script>
```
