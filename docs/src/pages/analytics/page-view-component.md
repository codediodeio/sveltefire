---
title: PageView Component
pubDate: 2023-12-23
description: SvelteFire PageView Component API reference
layout: ../../layouts/MainLayout.astro
---

# PageView

The `PageView` component logs a Google analytics `page_view` event when it is mounted.

### Slot Props

- `eventName` - (default: 'page_view') Set the current user as the userId in Google Analytics
- `setUser` - (default: true) Set the current user as the userId in Google Analytics
- `customParams` - (optional) custom parameters to pass to the `signIn` function

### Layout Example (recommended)

The most efficient way to integrate Firebase Analytics is to log events from a layout component. This will ensure that every route change is logged, both on the client and server. Make sure to `key` the `PageView` component so that it is re-mounted on every route change.

```svelte
<!-- +layout.svelte  --> 
<script lang="ts">
  import { page } from "$app/stores";
  import { PageView } from "sveltefire";
</script>

<slot />

{#key $page.route.id}
  <PageView />
{/key}
```

### Page Example

For fine-grained control, you can include `PageView` on a page-by-page basis. This is useful when sending custom parameters.


```svelte
<!-- +page.svelte  --> 
<script lang="ts">
    const myData = {
        guild: 'griffindor',
        currency: 'gpb'
    }
</script>


<PageView eventName="my_page_view" customParams={myData} setUser={false} />
```