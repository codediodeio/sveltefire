import { getContext } from 'svelte';


export function getApp() {
  return getContext('firebase');
}

// Validates end-user has setup context and imported proper modules into the Svelte app
export function assertApp(pkg) {

    const app = getApp();

    if (!app) {
      throw new Error(`Missing Firebase app in context. Are you inside a 'FirebaseApp' component?`)
    }

    if (pkg) {
        const pkgFn = app[pkg]; 
        if (!pkgFn || !pkgFn()) {
          throw new Error(`Firebase ${pkg} not found. You may be missing "import 'firebase/${pkg}'" `)
        } else {
          return pkgFn();
        }
    } else {
      return app;
    }
}
