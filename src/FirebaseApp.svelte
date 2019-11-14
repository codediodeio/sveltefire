<script>
  import { onMount, setContext, createEventDispatcher } from "svelte";
  export let firebase;
  export let perf = false;
  export let analytics = false;

  // Ready required to use the app event,
  // prevents child components from running before init
  let ready = false;

  // Emit firebase
  const dispatch = createEventDispatcher();

    // Set firebase context
    firebase = firebase || window.firebase;
    setContext("firebase", firebase);

  onMount(() => {
    console.log(firebase)

    if (!firebase) {
      throw Error(
        "No firebase app was provided. You must provide an initialized Firebase app or make it available globally."
      );
    } else {

      // Init perf and analytics
      perf && firebase.performance();
      analytics && firebase.analytics();

      // Optional event to set additional config
      dispatch("initializeApp", {
        firebase
      });

      ready = true;
    }
  });
</script>

{#if ready}
  <slot />
{/if}
