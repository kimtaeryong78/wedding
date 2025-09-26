import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';
import preprocess from 'svelte-preprocess';
/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
      		runtime: 'nodejs18.x' // Node 16 또는 18로 빌드하도록 지정
    	}),
		alias: {
			$db: './src/db'
		}
	},
	preprocess: vitePreprocess()
};
export default config;
