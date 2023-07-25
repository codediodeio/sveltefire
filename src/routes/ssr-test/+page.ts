import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase.js';

export const load = (async () => {
    const ref = doc(db, 'posts', 'test');
    const docSnap = await getDoc(ref);
    const data = docSnap.data();
    return {
        title: data?.title,
        content: data?.content,
        uid: data?.uid,
    };
});