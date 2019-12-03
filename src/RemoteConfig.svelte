<script>
    export let defaultConfig = {};
    import { onMount, onDestroy, createEventDispatcher } from "svelte";
    import { remoutConfigStore } from "./remoteConfig";
  
    let opts = {
        defaultConfig,
    };

    let store = remoteConfigStore(opts);
  
    const dispatch = createEventDispatcher();
    let unsub;
    onMount(() => {
      unsub = store.subscribe(config => {
        dispatch("config", {
          config
        });
      });
    });
  
    onDestroy(() => unsub());
  </script>
  
  <slot name="before" />
  {#if $store}
    <slot config={$store} />
  {:else}
    <slot config={defaultConfig} />
  {/if}
  <slot name="after" />