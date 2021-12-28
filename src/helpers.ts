import { getContext } from 'svelte';
import type { FirebaseApp } from 'firebase/app';

export function getFirebaseContext() :FirebaseApp {
  const { getFirebase } = getContext('firebase');
  return getFirebase();
}