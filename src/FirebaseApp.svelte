<script lang="ts">
  import { onMount, setContext, createEventDispatcher } from "svelte";
  import { FirebaseApp, FirebaseOptions, initializeApp } from "firebase/app";
  import { initializePerformance } from "firebase/performance";
  import { initializeAnalytics } from "firebase/analytics";
  export let firebase :FirebaseApp = null;
  export let config :FirebaseOptions = null;
  export let perf = false;
  export let analytics = false;

  // Ready required to use the app event,
  // prevents child components from running before init
  let ready = false;

  // Emit firebase
  const dispatch = createEventDispatcher();

  // Must be a function to ensure changes after initialization are caught
  setContext("firebase", { 
    getFirebase: () => firebase
  });


  onMount(() => {

    if (config) {
      firebase = initializeApp(config);
    }
    // Set firebase context from window if needed
    firebase = firebase || (window && ((window as any)['firebaseApp'] as FirebaseApp));

    if (!firebase) {
      throw Error(
        "No firebase app was provided. You must provide a Firebase configuration as parameter 'config', or an initialized app as parameter 'firebaseApp' or make it available globally as window.firebaseApp."
      );
    } else {

      // Init perf and analytics
      if (perf) {
        initializePerformance(firebase);
      }
      if (analytics) {
        initializeAnalytics(firebase);
      }

      // Optional event to set additional config
      dispatch("initializeApp", {
        firebase
      });

      ready = true;
    }
  });
</script>

{#if ready}
  <slot firebaseApp={firebase} />
{/if}
