<script lang="ts">
  import { getFirebaseContext } from "$lib/stores/sdk.js";

  const ctx = getFirebaseContext();
</script>

<h1>Welcome to SvelteFire</h1>

<ul class="left">
  <li><a href="/auth-test">Auth Test</a></li>
  <li><a href="/firestore-test">Firestore Test</a></li>
  <li><a href="/rtdb-test">Realtime Database Test</a></li>
  <li><a href="/ssr-test">SSR Test</a></li>
  <li><a href="/storage-test">Storage Test</a></li>
  <li><a href="/analytics-test">Analytics Test</a></li>
</ul>
<ul class="right">
  <li data-testid="auth">Auth Context: {!!ctx.auth}</li>
  <li data-testid="firestore">Firestore Context: {!!ctx.firestore}</li>
  <li data-testid="rtdb">Realtime Database Context: {!!ctx.rtdb}</li>
  <li data-testid="storage">Storage Context: {!!ctx.storage}</li>
</ul>

<style>
  h1 {
    color: #ff2b06;
    text-align: center;
  }
  a {
    display: inline-block;
    border-radius: 25px;
    background-color: #fa9200;
    color: white;
    padding: 10px 20px;
    margin: 5px 0;
    text-decoration: none;
  }
  a:hover {
    background-color: #ff0606;
    transition: 0.5s;
  } 
  ul {
    display: flex;
    flex-direction: column;
    justify-content: center;
    list-style: none;
    background-color: #f0f0f0;
    padding: 1rem;
    margin: 1rem auto;
    border-radius: 10000px;
    text-align: center;
    width: 350px;
    height: 350px;
    background: linear-gradient(to top, red, red, yellow);
  }
  ul.left {
    margin: 0%;
  }
  ul.right {
    margin-left: 50%;
  }
</style>
