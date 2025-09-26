<script lang="ts">
	import { onMount } from 'svelte';
	import { env } from '$env/dynamic/public';
	import { poiName, address, latitude, longitude, kakaoLocationId, privateCarMsg1, privateCarMsg2, privateCarMsg3, publicSubwayMsg1, publicBusMsg1, publicBusMsg2, publicBusMsg3, publicBusMsg4, publicBusMsg5, publicBusMsg6, publicBusMsg7, publicBusMsg8, publicBusMsg9, mapImageSrc } from '../resource/input';

	export let isMobile: boolean;

	onMount(() => {
		let mapOption = new naver.maps.Map('naverMap', {
			center: new naver.maps.LatLng(latitude, longitude), // 안내와 다르게 건물 근접 위,경도로 지정
			zoom: 17
		});

		let marker = new naver.maps.Marker({
			position: new naver.maps.LatLng(latitude, longitude),
			map: mapOption
		});
	});

	//티맵 길안내
	async function tMap() {
		if (isMobile) {
			const href = 'tmap://route?goalx=' +
				longitude +
				'&goaly=' +
				latitude +
				'&goalname=' +
				poiName;
			window.location.href = href;
		} else {
			const pos = await new Promise((resolve, reject) => {
				navigator.geolocation.getCurrentPosition(resolve, reject);
			});
			console.log(pos.coords.longitude)
			console.log(pos.coords.latitude)
			const result = await fetch('https://apis.openapi.sk.com/tmap/app/routes?version=1', {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'appKey': String(env.PUBLIC_TMAP_API_KEY)
				},
				body: JSON.stringify({
					startX: pos.coords.longitude,
					startY: pos.coords.latitude,
					endX: longitude,
					endY: latitude,
					tollgateFareOption: '2',
					mainRoadInfo: 'Y'
				})
			});
			console.log(result);
		}
		let href = isMobile() ? 'tmap://route?' : ('https://apis.openapi.sk.com/tmap/app/routes?appKey=' + String(env.PUBLIC_TMAP_API_KEY) + '&')
	}

	// 구글맵 길안내
	function gMap() {
		const href = 'https://www.google.com/maps/dir/?api=1&destination=제이오스티엘'
		window.location.href = href;
	}

	//카카오맵 길안내
	function kakaoMap() {
		const href = 'https://map.kakao.com/link/to/' + kakaoLocationId;
		window.location.href = href;
	}

	//네이버맵 길안내
	function naverMap(name: string, lat: number, lng: number) {
		const href =
			'http://app.map.naver.com/launchApp/?version=11&menu=navigation&elat=' +
			lat +
			'&elng=' +
			lng +
			'&etitle=' +
			name;
		window.location.href = href;
	}
</script>

<svelte:head>
	<script
		src="https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId={env.PUBLIC_NAVER_API_KEY}"
	></script>
</svelte:head>

<section>
	<div class="py-5 mx-auto">
		<h1 class="mb-8 text-3xl md:text-3xl font-bold text-center text-stone-600">오시는 길</h1>
		<div class="text-center py-2 text-xl">
			<p>{poiName}</p>
			<p class="text-gray-500 text-base">{address}</p>
		</div>

		<div id="naverMap" class="w-full h-60" />
		<div class="text-center px-1 py-5">
			<button
				id="kakao-navi"
				on:click={kakaoMap}
				class="btn rounded-lg mx-2"
			>
				<img src="image/kakao.png" height="10" width="10" alt="" />
				<span class="text-sm">카카오 지도</span>
			</button>
{#if isMobile}
			<button
				id="tmap-navi"
				on:click={tMap}
				class="btn mx-2 rounded-lg"
			>
				<img src="image/tmap.png" height="10" width="10" alt="" />
				<span class="text-sm">티맵 내비</span>
			</button>
{:else}
			<button
				id="gmap-navi"
				on:click={gMap}
				class="btn mx-2 rounded-lg"
			>
				<img src="image/gmap.png" height="10" width="10" alt="" />
				<span class="text-sm">구글 맵</span>
			</button>
{/if}
			<button
				id="naver-navi"
				on:click={naverMap}
				class="btn mx-2 rounded-lg"
			>
				<img src="image/naver.png" height="10" width="10" alt="" />
				<span class="text-sm">네이버 지도</span>
			</button>
		</div>
		<div class="flex flex-col w-full px-5 mt-4">
			<div>
				<p class="leading-relaxed mt-1" />
			</div>
			<div class="card p-4 my-2 bg-base-100 shadow-xl">
				<h2 class="text-xl font-bold title-font">자가용으로 오시는 경우</h2>
				<p class="leading-relaxed mt-1 text-base">
					{privateCarMsg1} <br />
					{privateCarMsg2} <br />
					{privateCarMsg3}
				</p>
			</div>
			<div class="card p-4 my-2 bg-base-100 shadow-xl">
				<h2 class="text-xl font-bold title-font">버스로 오시는 경우</h2>
				<p class="leading-relaxed mt-1 text-base">
					{publicBusMsg1} <br />
					{publicBusMsg2} <br />
					{publicBusMsg3} <br />
					{publicBusMsg4} <br />
					{publicBusMsg5} <br />
					{publicBusMsg6} <br />
					{publicBusMsg7} <br />
					{publicBusMsg8} <br />
					{publicBusMsg9}
				</p>
			</div>
			<div class="card p-4 my-2 bg-base-100 shadow-xl">
				<h2 class="text-xl font-bold title-font">지하철로 오시는 경우</h2>
				<p class="leading-relaxed mt-1 text-base">
					{publicSubwayMsg1}
				</p>
			</div>
			<img src={mapImageSrc} class="mx-auto" alt="" />
		</div>
	</div>
</section>
