// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}

	interface Window {
		Kakao: {
			init: (key: string) => void;
			Share: {
				createDefaultButton: (options: any) => void;
			};
		};
		ReactNativeWebView?: {
			postMessage: (message: string) => void;
		};
		Android?: {
			share: (url: string) => void;
		};
		webkit?: {
			messageHandlers: {
				share: {
					postMessage: (message: { url: string; title: string }) => void;
				};
			};
		};
		MSStream?: any;
	}
}

export {};
