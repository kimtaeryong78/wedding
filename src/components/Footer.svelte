<script lang="ts">
	import { onMount } from 'svelte';
	import { PUBLIC_KAKAO_JS_KEY } from '$env/static/public';
	import githubSquare from 'svelte-awesome/icons/githubSquare';
	import { Icon } from 'svelte-awesome';
	import copy from 'copy-to-clipboard';
	import {
		brideFullName,
		groomFullName,
		mainImageURL,
		dday,
		timeStr,
		poiName
	} from '../resource/input';

	// share main image
	const shareTitle = groomFullName + ' ❤ ' + brideFullName + '의 결혼식에 초대합니다.';
	const shareDescription =
		dday[0] + '년 ' + dday[1] + '월 ' + dday[2] + '일 ' + timeStr + ' \n' + poiName;

	onMount(() => {
		const url = location.href;
		(window as any).Kakao.init(PUBLIC_KAKAO_JS_KEY);
		(window as any).Kakao.Share.createDefaultButton({
			container: '#kakaotalk-share-btn',
			objectType: 'feed',
			content: {
				title: shareTitle,
				imageUrl: mainImageURL,
				link: {
					mobileWebUrl: url,
					webUrl: url
				},
				imageWidth: 300,
				imageHeight: 200,
				description: shareDescription
			},
			buttons: [
				{
					title: '청첩장 보러가기',
					link: {
						mobileWebUrl: url,
						webUrl: url
					}
				}
			],
			installTalk: true
		});
	});

	async function sharePage() {
		const url = location.href;
		const title = document.title;

		if (window.ReactNativeWebView?.postMessage) {
			window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'share', url, title }));
			return;
		}
		if (window.Android?.share) {
			window.Android.share(url);
			return;
		}
		if (window.webkit?.messageHandlers?.share) {
			window.webkit.messageHandlers.share.postMessage({ url, title });
			return;
		}

		// 2. Web Share API
		if (navigator.share) {
			try {
				await navigator.share({ title, url });
				return; // 성공 시 그냥 종료
			} catch (err) {
				if (err instanceof DOMException && err.name === 'AbortError') {
					console.log('사용자가 공유를 취소했습니다.');
					return;
				}
				console.warn('Web Share API 실패', err);
			}
		}

		if (navigator.clipboard?.writeText) {
			try {
				await navigator.clipboard.writeText(url);
				alert('링크가 복사되었습니다.');
				return;
			} catch (err) {
				console.warn('Clipboard API 실패', err);
			}
		}

		if (typeof copy === 'function' && copy(url)) {
			alert('링크가 복사되었습니다.');
			return;
		}

		alert('이 브라우저에서는 공유 기능을 지원하지 않습니다.');
	}
</script>

<svelte:head>
	<script
		src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.6/kakao.min.js"
		integrity="sha384-WAtVcQYcmTO/N+C1N+1m6Gp8qxh+3NlnP7X1U7qP6P5dQY/MsRBNTh+e1ahJrkEm"
		crossorigin="anonymous"
	></script>
</svelte:head>

<section>
	<div class="text-center px-5 py-5">
		<button
			id="kakaotalk-share-btn"
			class="btn inline-block text-black rounded bg-gray-200 px-2 m-2 py-1 font-medium text-base"
		>
			카카오톡으로 공유</button
		>
		<button
			class="btn inline-block text-black rounded bg-gray-200 px-2 m-2 py-1 font-medium text-base"
			on:click={sharePage}>링크로 공유</button
		>
	</div>
</section>

<div class="w-full bg-stone-300 py-2">
	<div class="max-w-xl w-full mx-auto flex space-x-2 text-sm justify-center items-center">
		<span> developed by </span>
		<span class="text-lg font-bold text-gray-800"> kimtaeryong78 </span>
		<a
			class="text-gray-400"
			href="https://github.com/kimtaeryong78"
			target="_blank"
			rel="noreferrer"
		>
			<Icon class="blackIcon text-black" data={githubSquare} scale={2} />
		</a>
	</div>
</div>
