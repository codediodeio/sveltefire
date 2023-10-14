---
title: userStore
pubDate: 2023-07-23
description: SvelteFire userStore API reference
layout: ../../layouts/MainLayout.astro
---

# userStore

Listens the current Firebase user.

### Parameters

- `auth` - Firebase Auth instance

### Example

```svelte
<script>
  import { userStore } from "sveltefire";
  import { auth } from "$lib/firebase"; // your firebase auth instance

  const user = userStore(auth);
</script>

Hello {$user.uid}
```
