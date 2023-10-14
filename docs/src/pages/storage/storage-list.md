---
title: StorageList Component
pubDate: 2023-07-23
description: SvelteFire StorageList Component API reference
layout: ../../layouts/MainLayout.astro
---

# StorageList

Returns a list of files stored in Firebase Storage.

### Props

- `ref` - A Firebase Storage reference or path string (e.g. `files/hi-mom.txt`)

### Slots

- `default` - Shown when the list is available
- `loading` - Shown while the list is loading

### Slot Props

- `list` - The list of files and prefixes
- `ref` - Storage reference
- `storage` - The Firestore instance

### Example

```svelte
<script>
  import { StorageList } from "sveltefire";
</script>

<StorageList ref="images/uid" let:list>
  <ul>
    {#if list === null}
      <li>Loading...</li>
    {:else if list.prefixes.length === 0 && list.items.length === 0}
      <li>Empty</li>
    {:else}
      <!-- Listing the prefixes -->
      {#each list.prefixes as prefix}
        <li>
          {prefix.name}
        </li>
      {/each}
      <!-- Listing the objects in the given folder -->
      {#each list.items as item}
        <li>
          {item.name}
        </li>
      {/each}
    {/if}
  </ul>
</StorageList>
```
