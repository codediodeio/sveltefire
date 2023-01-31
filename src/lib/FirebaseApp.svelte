<script lang="ts">
  import type {Auth} from 'firebase/auth'
  import type {Firestore} from 'firebase/firestore'
  import {sdk} from './stores'

  export let firestore: Firestore
  export let auth: Auth
  sdk.set({firestore, auth})
</script>

<slot />
