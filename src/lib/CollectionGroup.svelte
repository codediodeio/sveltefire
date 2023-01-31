<script lang="ts">
  import type {Firestore, Query} from 'firebase/firestore'
  import {collectionGroupStore, sdk} from './stores'

  interface $$Slots {
    default: {data: any[]; ref: Query | null; count: number}
    loading: object
  }

  export let ref: string | Query
  export let firestore: Firestore = $sdk?.firestore
  export let startWith: any = undefined

  let store = collectionGroupStore(firestore, ref, startWith)
</script>

{#if $store !== undefined}
  <slot data={$store} ref={store.ref} count={$store?.length ?? 0} />
{:else}
  <slot name="loading" />
{/if}
