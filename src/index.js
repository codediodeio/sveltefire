import FirebaseApp from './FirebaseApp.svelte';
import User from './User.svelte';
import Doc from './Doc.svelte';
import Collection from './Collection.svelte';
import { userStore } from './auth';
import { docStore, collectionStore } from './firestore';
<<<<<<< HEAD
=======
import { fileStore, uploadFileStore } from './storage';
import File from './File.svelte';
import Upload from './Upload.svelte';
>>>>>>> cff7a90ef6de662946e8fe2d34d89991af243890


export {
    FirebaseApp,
    User,
    Doc,
    Collection, 
    userStore,
    docStore,
    collectionStore,
<<<<<<< HEAD
=======
    fileStore,
    uploadFileStore,
    File,
    Upload,
>>>>>>> cff7a90ef6de662946e8fe2d34d89991af243890
}