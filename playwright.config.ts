import { defineConfig } from '@playwright/test';

export default defineConfig({
	webServer: {
		command: 'firebase emulators:exec --only firestore,storage,auth "NODE_ENV=ci npm run build && npm run preview"',
		port: 4173
	},
	testDir: 'tests',
	testMatch: /(.+\.)?(test|spec)\.[jt]s/
});
