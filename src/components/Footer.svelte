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
	const shareImageUrl = mainImageURL;
	const shareTitle = groomFullName + ' ❤ ' + brideFullName + '의 결혼식에 초대합니다.';
	const shareDescription =
		dday[0] + '년 ' + dday[1] + '월 ' + dday[2] + '일 ' + timeStr + ' \n' + poiName;

	onMount(() => {
		(window as any).Kakao.init(PUBLIC_KAKAO_JS_KEY);
		(window as any).Kakao.Share.createDefaultButton({
			container: '#kakaotalk-share-btn',
			objectType: 'feed',
			content: {
				title: shareTitle,
				description: shareDescription,
				imageUrl: shareImageUrl,
				link: {
					mobileWebUrl: 'https://wedding-ryomi-lisunnyil.vercel.app/',
					webUrl: 'https://wedding-ryomi-lisunnyil.vercel.app/'
				}
			},
			buttons: [
				{
					title: '청첩장 보러가기',
					link: {
						mobileWebUrl: 'https://wedding-ryomi-lisunnyil.vercel.app/',
						webUrl: 'https://wedding-ryomi-lisunnyil.vercel.app/'
					}
				}
			]
		});
	});

	async function sharePage() {
		try {
			if (navigator.share) {
				await navigator.share({ title: document.title, url: location.href });
				return;
			}

			if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
				await navigator.clipboard.writeText(location.href);
				alert('링크가 복사되었습니다.');
				return;
			}

			// 폴백 라이브러리 사용
			const ok = copy(location.href);
			if (ok) {
				alert('링크가 복사되었습니다.');
				return;
			}

			throw new Error('clipboard fallback failed');
		} catch (err) {
			console.error('share/copy error', err);

			// 웹뷰 네이티브 핸들러 호출 시도
			if (window.ReactNativeWebView && window.ReactNativeWebView.postMessage) {
				window.ReactNativeWebView.postMessage(
					JSON.stringify({ type: 'share', url: location.href, title: document.title })
				);
				return;
			}
			if (window.Android && typeof window.Android.share === 'function') {
				window.Android.share(location.href);
				return;
			}
			if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.share) {
				window.webkit.messageHandlers.share.postMessage({
					url: location.href,
					title: document.title
				});
				return;
			}

			// 최후 수단 안내
			alert('공유에 실패했습니다. 링크를 수동으로 복사해 주세요.');
		}
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
			class="btn inline-block text-black rounded bg-gray-200 px-2 m-2 pb-[5px] pt-[11px] font-medium text-base"
		>
			카카오톡으로 공유</button
		>
		<button
			class="btn inline-block text-black rounded bg-gray-200 px-2 m-2 pb-[5px] pt-[6px] font-medium text-base"
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
