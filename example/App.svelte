<script lang="ts">
  import { onMount } from "svelte";
  import FirebaseApp from "../src/FirebaseApp.svelte";
  import Doc from "../src/Doc.svelte";
  import Collection from "../src/Collection.svelte";
  import User from "../src/User.svelte";
  import UploadTask from "../src/UploadTask.svelte";
  import StorageRef from "../src/StorageRef.svelte";
  import { initializeApp } from "@firebase/app"
  import { addDoc, collection, CollectionReference, deleteDoc, doc, DocumentData, DocumentReference, getFirestore, initializeFirestore, setDoc, updateDoc, where } from "firebase/firestore";
import { signInAnonymously } from "firebase/auth";

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
  const firebaseApp = initializeApp(config);

  let appName :string;
  let eventData :DocumentData = {} as DocumentData;
  let eventRef :DocumentReference = {} as DocumentReference;

  let file = new File(['hello world'], 'filename');

  let readyToUpload = false;

  function onData(e :CustomEvent<{data:DocumentData}>) {
    eventData = e.detail.data;
  }
  function onRef(e :CustomEvent<{ref:DocumentReference}>) {
    eventRef = e.detail.ref;
  }

   async function useEmulator() {
    // const firebase = e.detail.firebase;

    if (location.hostname === "localhost") {
      initializeFirestore(firebaseApp, { host: "localhost:8080", ssl: false });
      const db = getFirestore(firebaseApp);

      appName = firebaseApp.name;

      deleteDoc(doc(db,"posts/slow-post"));

      
      setDoc(doc(db,"posts/event-post"), { title: "Event Post" });
      setDoc(doc(db,"posts/once"), { title: "Once-Doc" });

      setTimeout(() => {
        setDoc(doc(db,"posts/slow"), { title: "Slowness" });
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

<FirebaseApp firebase={firebaseApp} on:initializeApp={useEmulator} perf analytics>

  <h1>FirebaseApp</h1>

  <p>Firebase Ready {appName}</p>

  <h1>User</h1>
  <User let:user let:auth>

    <div slot="signed-out">
      <button on:click={() => signInAnonymously(auth)}>Sign In</button>
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
          on:click={() => setDoc(postRef, { uid: user.uid, title: 'My Post' })}>
          Create Post
        </button>
      </div>

      <!-- Start Post Default -->

      <h2>{post.title}</h2>
      <p>By {post.uid}</p>

      <Collection
        path={collection(postRef,'comments')}
        query={ref => where('uid', '==', post.uid)}
        let:data={comments}
        let:ref={commentsRef}
        traceId={'readComments'}
        log>

        <div slot="loading">Loading...</div>

        <div slot="fallback">Unable to display comments...</div>

        <!-- Start Comments Default -->

        <button
          on:click={() => {
            addDoc(commentsRef, {
              uid: user.uid,
              text: 'My Awesome Comment'
            });
          }
          }>
          Add Comment
        </button>
        <div id="posts">
          {#each comments as comment}
            <span>
              <h5>{comment.text} {comment.id}</h5>
              <button on:click={() => deleteDoc(comment.ref)}>Delete</button>
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

      <button on:click={() => deleteDoc(slowRef)}>X</button>
  </Doc>

  <h3>One-Time Reads</h3>

    <Doc
    path={`posts/once`}
    let:data={onceData}
    let:ref={onceRef}
    once>

    {onceData.title}

    <button on:click={() => deleteDoc(onceRef)}>Try to Delete</button>
  </Doc>


  <h3>Events</h3>

  <p>Path: {eventRef.path}</p>
  <p>Event Data: {eventData && eventData.title}</p>
  <button on:click={() => updateDoc(eventRef, { title: 'My Data Changed' })}>
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
