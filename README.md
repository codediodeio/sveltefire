# SvelteFire

[Cybernetically](https://svelte.dev/) enhanced [Firebase](https://firebase.google.com/) apps 💪🔥  

## Basics

- Use Firebase declaratively in Svelte components. 
- Handle complex relational data between Auth and Firestore.  
- Built in loading & fallback states for async data. (Similar to React Suspense) 
- Automatic data disposal to prevent memory/cost leaks, plus enhanced logging.  
- Automatic performance monitoring & Google Analytics.  


**Psuedo Example**

Handle multiple levels of async relational data (and their loading & fallback states) entirely from the Svelte HTML. 


```html
<!-- 1. 🔥 Firebase App -->
<FirebaseApp {firebase}>

    <!-- 2. 😀 Get the current user -->
    <User let:user>

        <p>Howdy, {user.uid}</p>

        <!-- 3. 📜 Get a Firestore document owned by a user -->
        <Doc path={`posts/${user.uid}`} let:data={post} let:ref={postRef}>
            
            <h2>{post.title}</h2>

            <!-- 4. 💬 Get all the comments in its subcollection -->
            <Collection path={postRef.collection('comments')} let:data={comments}>
                {#each comments as comment}

                {/each}


...
```


## Quick Start

Create a Svelte App and install Firebase. 

```bash
npx degit sveltejs/template fireapp
cd fireapp 
npm install

npm install sveltefire firebase
```


Create a web app from the [Firebase Console](https://console.firebase.google.com/) and grab your project config. Enable **Anonymous Login** and create a **Firestore** database instance in test mode. 


Initialize the Firebase app in the `App.svelte` file. 

```html
<script>
    import { FirebaseApp, User, Doc, Collection } from 'sveltefire';
    
    // Import the Firebase Services you want bundled and call initializeApp
    import firebase from "firebase/app";
    import 'firebase/firestore';
    import 'firebase/auth';
    import 'firebase/performance';
    import 'firebase/analytics';

	const firebaseConfig = {
        apiKey: 'api-key',
        authDomain: 'project-id.firebaseapp.com',
        databaseURL: 'https://project-id.firebaseio.com',
        projectId: 'project-id',
        storageBucket: 'project-id.appspot.com',
        messagingSenderId: 'sender-id',
        appId: 'app-id',
        measurementId: 'G-measurement-id',
    }

    firebase.initializeApp(firebaseConfig)
</script>
```

**Full Example**

Start by building an **authenticated realtime CRUD app** . A user can sign-in, create posts, and add comments to that post. Paste this code into your app. 

```html
<!-- 1. 🔥 Firebase App -->
<FirebaseApp {firebase}>

  <!-- 2. 😀 Get the current user -->
  <User let:user let:auth>

    <p>Howdy, {user.uid}</p>
    <button on:click={() => auth.signOut()}>Sign Out</button>

    <div slot="signed-out">
      <button on:click={() => auth.signInAnonymously()}>Sign In</button>
    </div>

    <!-- 3. 📜 Get a Firestore document owned by a user -->
    <Doc path={`posts/${user.uid}`} let:data={post} let:ref={postRef} log>

      <h2>{post.title}</h2>

      <span slot="loading">Loading post...</span>
      <span slot="fallback">
        <p>Demo post not created yet...</p>

        <button on:click={() => postRef.set({ title: 'I like Svelte' })}>
          Create it Now
        </button>
      </span>

      <!-- 4. 💬 Get all the comments in its subcollection -->
      <Collection
        path={postRef.collection('comments')}
        let:data={comments}
        let:ref={commentsRef}
        log>
		
        {#each comments as comment}
          <p>{comment.text}</p>
          <button on:click={() => comment.ref.delete()}>Delete</button>
        {/each}

        <hr />

        <button on:click={() => commentsRef.add({ text: 'Cool!' })}>
          Add Comment
        </button>

        <span slot="loading">Loading comments...</span>

      </Collection>
    </Doc>
  </User>
</FirebaseApp>
```

Run it on localhost:5000

```
npm run dev
```

If you see the error **'openDb' is not exported by node_modules\idb\build\idb.js**, go in the `rollup.config.js` and add this line: 

```js
    resolve({
        ...
        mainFields: ['main', 'module'] /// <-- here
    }),
```

## Concepts

SvelteFire allows you to use Firebase data anywhere in the Svelte component without the need to manage async state, promises, or streams. 

### Slots

[Slots](https://svelte.dev/tutorial/slots) render different UI templates based on the state of your data. The `loading` state is shown until the first response is received from Firebase. The `fallback` state is shown if there is an error or timeout.

In most cases, state flows from *loading* -> *default*. For errors, non-existent data, or high-latency, state flows from *loading* -> *fallback* `maxWait` default is 10000ms). 


```html
<Doc path={'foods/ice-cream'}>

    <!-- Default Slot -->
    Data loaded, yay 🍦!

    <!-- Only shown when loading -->
    <div slot="loading"></div>

    <!-- Shown on error or if nothing loads after maxWait time-->
    <div slot="fallback"></div>
</Doc>
```

Error handling made easy:

```html
<Doc {path} let:error>

    <div slot="fallback">
        😔 This doc cannot be read {error}
    </div>
</Doc>
```

Loading state made easy:

```html
<Doc {path}>

    <div slot="loading">
        ⌛
    </div>
</Doc>
```

You can bypass the loading state entirely by passing a `startWith` prop. 

```html
<Doc {path} startWith={ {flavor: 'vanilla'} }>
```



### Slot Props

[Slot props](https://svelte.dev/tutorial/slot-props) **pass data down** to children the component tree. SvelteFire has done the hard work to expose the data you will need in the UI. For example, `let:data` gives you access to the document data, while `={yourVar}` is the name you use to reference it in your code. The `data` is a plain object for showing data in the UI, while the `ref` is a Firestore `DocumentReference` used to execute writes. 


```html
<Doc path={`food/ice-cream`} let:data={icecream} let:ref={docRef}>

    {icecream.flavor} yay 🍦!

    <button on:click={() => docRef.delete()}>Delete</button>
</Doc>
```

### Events

[Events](https://svelte.dev/tutorial/component-events) **emit data up** to the parent. You can use components as a mechanism to read documents without actually rendering UI. Also useful for trigging side effects. 

```html
<Doc path={'food/ice-cream'} on:data={(e) => console.log(e.detail.data)} />
```

### Reactive

Components are reactive. When props change, they unsubscribe from the last stream and start a new one. This means you can change the document path or query function by simplying changing a prop value. 

Example: Collections have special slot props for pagination called `first` and `last`. Use them to create reactive pagination queries. 


```html
<script>
let query = (ref) => ref.orderBy('flavor').limit(3)

function nextPage(last) {
    query = (ref) => ref.orderBy('flavor').startAfter(last.flavor).limit(3);
}
</script>

<Collection path={'foods'} {query} let:data let:last>

    {#each data as food}
        {food.name}
    {/each}

    <button on:click={() => nextPage(last) }>Next</button>


</Collection>
```

### Stores

[Stores](https://svelte.dev/tutorial/custom-stores) are used under the hood to manage async data in components. It's an advanced use-case, but they can be used directly in a component script or plain JS. 

```js
<script>
import { collectionStore } from 'sveltefire';

const data = collectionStore('things', (ref => ref.orderBy('time') ));

data.subscribe(v => doStuff(v) )
</script>
```

### Firebase App Context

The Firebase SDK is available via the [Context API](https://svelte.dev/tutorial/context-api) under the key of `firebase`. 

```js
const db = getContext('firebase').firestore();
```

## API

### `<FirebaseApp>`

Sets Firebase app context

Props:

- *firebase* Firebase instance. If empty, it will attempt to use `window.firebase`. 
- *perf* Starts Firebase Performance Monitoring
- *analytics* Starts Firebase/Google Analytics


```html
<FirebaseApp firebase={firebase} perf analytics>
    <!-- default slot -->
</FirebaseApp>
```


### `<User>`

Listens to the current user. 

Props:

- *persist* user in `sessionStorage` or `localStorage`. Can prevent flash if user refreshes browser. Default `null`;

Slots: 

- *default slot* shown to signed-in user
- *signed-out* shown to signed-out user

Slot Props & Events: 

- *user* current FirebaseUser or `null`
- *auth* Firebase Auth to call login methods. 

```html
<User persist={sessionStorage} let:user={user} let:auth={auth} on:user>
    {user.uid}

    <div slot="signed-out"></div>
</User>
```


### `<Doc>`

Retrieves and listens to a Firestore document. 

Props:

- *path (required)* - Path to document as `string` OR a DocumentReference i.e `db.doc('path')`
- *startWith* any value. Bypasses loading state. 
- *maxWait* `number` milliseconds to wait before showing fallback slot if nothing is returned. Default 10000. 
- *once* single read execution, no realtime updates. Default `false`. 
- *log* debugging info to the console. Default `false`.  
- *traceId* `string` name that runs a Firebase Performance trace for latency.

Slots: 

- *default slot*  shown when document is available. 
- *loading*  when waiting for first response. 
- *fallback* when error occurs. 


Slot Props & Events: 

- *data* Document data
- *ref* DocumentReference for writes
- *error* current error

```html
<Doc 
    path={'posts/postId'} 
    startWith={defaultData}
    log 
    traceId={'postRead'} 
    let:data={myData} 
    let:ref={myRef} 
    on:data 
    on:ref
>


    {post.title}

    <span slot="loading">Loading...</span>
    <span slot="fallback">Error...</span>
</Doc>
```


### `<Collection>`

Retrieves and listens to a Firestore collection or query. 

Props:

- *path (required)* to document as `string` OR  `CollectionReference` i.e `db.collection('path')`
- *query* `function`, i.e (ref) => ref.where('age, '==', 23)
- *startWith* any value. Bypasses loading state. 
- *maxWait* `number` milliseconds to wait before showing fallback slot if nothing is returned. Default 10000. 
- *once* single read execution, no realtime updates. Default `false`. 
- *log* debugging info to the console. Default `false`. 
- *traceId* `string` name that runs a Firebase Performance trace for latency.

Slots: 

- *default slot*  shown when document is available. 
- *loading*  when waiting for first response. 
- *fallback* when error occurs. 


Slot Props & Events: 

- *data* collection data as array. 
- *ref* CollectionReference for writes
- *first* the first result in the query, useful for pagination. 
- *last* the last result in the query, useful for pagination. 
- *error* current error

```html
<Collection 
    path={'comments'} 
    query={ (ref) => ref.orderBy(date).limit(10) } 
    traceId={'readComments'} 
    log
    let:data={comments} 
    let:ref={commentsRef} 
    let:last={firstComment}
    let:first={lastComment}
    on:data
    on:ref
>

    {#each comments as comment}
        {comment.text}
    {/each}

    <div slot="loading">Loading...</div>

    <div slot="fallback">
        Unable to display comments...
    </div>

</Collection>
```

Note: Each data item in the collection contains the document data AND fields for the `id` and `ref` (DocumentReference). 
