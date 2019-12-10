## Install from Template (Recommended)

Follow the instructions on the [sveltefire-template](https://github.com/codediodeio/sveltefire-template). 

## Install from Scratch

Create a Svelte App and install Firebase. 

```bash
npm install sveltefire firebase
```

Create a web app from the [Firebase Console](https://console.firebase.google.com/) and grab your project config. Enable **Anonymous Login** and create a **Firestore** database instance in test mode. 


Initialize the Firebase app in the `App.svelte` file. Make sure to import the Firebase packages you expect to use. 

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


<FirebaseApp {firebase}>

    <!-- 1. 🔥 Have some fun in here -->

</FirebaseApp>
```


If you see the error **'openDb' is not exported by node_modules\idb\build\idb.js**, go in the `rollup.config.js` and add this line: 

```js
    resolve({
        ...
        mainFields: ['main', 'module'] /// <-- here
    }),
```