<script>
  export let name;
  import { writable } from "svelte/store";
  import { onMount } from "svelte";
  import { FirebaseApp, Doc, Collection, User, UploadTask, StorageRef } from "sveltefire";

  import firebase from "firebase/app";
  import "firebase/firestore";
  import "firebase/auth";
  import "firebase/storage";
  import "firebase/performance"; // Optional
  import "firebase/analytics"; // Optional

  const config = {
    apiKey: "AIzaSyAMHfJp1ec85QBo-mnke89qtiYGen9zTSE",
    authDomain: "sveltefire-testing.firebaseapp.com",
    databaseURL: "https://sveltefire-testing.firebaseio.com",
    projectId: "sveltefire-testing",
    storageBucket: "sveltefire-testing.appspot.com",
    messagingSenderId: "1030648105982",
    appId: "1:1030648105982:web:2afebc34841fa242ed4eaf",
    measurementId: "G-null"
  };

  firebase.initializeApp(config);


  let appName;
  let eventData = {};
  let eventRef = {};

  let file = new File(['hello world'], 'filename');

  let readyToUpload = false;

  function onData(e) {
    eventData = e.detail.data;
  }
  function onRef(e) {
    eventRef = e.detail.ref;
  }

   async function useEmulator() {
    // const firebase = e.detail.firebase;

    if (location.hostname === "localhost") {
      const db = firebase.firestore();

      db.settings({ host: "localhost:8080", ssl: false });

      appName = firebase.app().name;

      db.doc("posts/slow-post").delete();

      db.doc("posts/event-post").set({ title: "Event Post" });
      db.doc("posts/once").set({ title: "Once-Doc" });

      setTimeout(() => {
        db.doc("posts/slow").set({ title: "Slowness" });
      }, 5000);

    }
  };

  onMount(useEmulator)
</script>

<style>
  h1 {
    border-bottom: 1px dashed rgb(185, 185, 185);
  }
</style>

<FirebaseApp {firebase} on:initializeApp={useEmulator} perf analytics>

  <h1>FirebaseApp</h1>

  <p>Firebase Ready {appName}</p>

  <h1>User</h1>
  <User let:user let:auth>

    <div slot="signed-out">
      <button on:click={() => auth.signInAnonymously()}>Sign In</button>
      <br />
      <button>Sign Out</button>
      (NOOP for Cypress)
    </div>

    <!-- Start User Default -->
    UID: {user.uid}
    <button on:click={() => auth.signOut()}>Sign Out</button>

    <h1>Firestore</h1>

    <Doc path={`posts/first-post`} let:data={post} let:ref={postRef} log>
      <div slot="loading">Loading...</div>
      <div slot="fallback">
        <button
          on:click={() => postRef.set({ uid: user.uid, title: 'My Post' })}>
          Create Post
        </button>
      </div>

      <!-- Start Post Default -->

      <h2>{post.title}</h2>
      <p>By {post.uid}</p>

      <Collection
        path={postRef.collection('comments')}
        query={ref => ref.where('uid', '==', post.uid)}
        let:data={comments}
        let:ref={commentsRef}
        traceId={'readComments'}
        log>

        <div slot="loading">Loading...</div>

        <div slot="fallback">Unable to display comments...</div>

        <!-- Start Comments Default -->

        <button
          on:click={() => commentsRef.add({
              uid: user.uid,
              text: 'My Awesome Comment'
            })}>
          Add Comment
        </button>
        <div id="posts">
          {#each comments as comment}
            <span>
              <h5>{comment.text} {comment.id}</h5>
              <button on:click={() => comment.ref.delete()}>Delete</button>
            </span>
          {/each}
        </div>

      </Collection>
    </Doc>
  </User>

  <h3>Error Fallback</h3>
  <Doc path={`secure/anything`} let:data={secure} let:error={err}>
    <h3>Secure Post</h3>

    <div slot="loading">Trying to load...</div>

    <div slot="fallback">Unable to read secure doc {err}</div>
  </Doc>

  <h3>Timeout Fallback</h3>

  <Doc
    path={`posts/slow`}
    maxWait={3000}
    startWith={ {title: 'vanilla'} }
    let:ref={slowRef}
    let:data={slow}
    let:error={err}>

    <p>Slow Post has loaded</p>
    {JSON.stringify(slow)}


    <div slot="loading">Loading slow doc</div>

    <div slot="fallback">Unable to read slow doc {err}</div>

      <button on:click={() => slowRef.delete()}>X</button>
  </Doc>

  <h3>One-Time Reads</h3>

    <Doc
    path={`posts/once`}
    let:data={onceData}
    let:ref={onceRef}
    once>

    {onceData.title}

    <button on:click={() => onceRef.delete()}>Try to Delete</button>
  </Doc>


  <h3>Events</h3>

  <p>Path: {eventRef.path}</p>
  <p>Event Data: {eventData && eventData.title}</p>
  <button on:click={() => eventRef.update({ title: 'My Data Changed' })}>
    Update Event
  </button>

  <Doc path={'posts/event-post'} on:data={onData} on:ref={onRef} />




  <h1>Storage</h1>

  <button on:click={(e) => readyToUpload = true }>Start Upload</button>

  {#if readyToUpload}

    <h3>UploadTask:</h3>

    <UploadTask path={'myfile.txt'} {file} let:task let:snapshot let:downloadURL>

      Progress  {(snapshot.bytesTransferred / snapshot.totalBytes) * 100} <br>
      State {snapshot.state}

      <button on:click={() => task.pause()}>Pause</button>

      <div slot="complete">DownloadURL: {downloadURL}</div>

    </UploadTask>

  {/if}


  <h3>File</h3>

  <StorageRef path={'myfile.txt'} meta let:metadata let:downloadURL>

    URL: {downloadURL} <br>
    Meta: {JSON.stringify(metadata)}

    <div slot="loading">Loading file...</div>
  </StorageRef>


</FirebaseApp>

<div style="height: 500px"></div>
