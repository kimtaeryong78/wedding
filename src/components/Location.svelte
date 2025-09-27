<script lang="ts">
	import {
		poiName,
		address,
		latitude,
		longitude,
		kakaoLocationId,
		privateCarMsg1,
		privateCarMsg2,
		privateCarMsg3,
		publicSubwayMsg1,
		publicBusMsg1,
		publicBusMsg2,
		publicBusMsg3,
		publicBusMsg4,
		publicBusMsg5,
		publicBusMsg6,
		publicBusMsg7,
		publicBusMsg8,
		publicBusMsg9,
		mapImageSrc
	} from '../resource/input';
	export let isMobile: boolean;

	//티맵 길안내
	async function tMap() {
		const href = 'tmap://route?goalx=' + longitude + '&goaly=' + latitude + '&goalname=' + poiName;
		window.location.href = href;
	}

	// 구글맵 길안내
	function gMap() {
		const href = 'https://www.google.com/maps/dir/?api=1&destination=제이오스티엘';
		window.location.href = href;
	}

	//카카오맵 길안내
	function kakaoMap() {
		const href = 'https://map.kakao.com/link/to/' + kakaoLocationId;
		window.location.href = href;
	}

	//네이버맵 길안내
	function naverMap() {
		if (isMobile) {
			const href =
				'nmap://route?appname=WeddingMap&lat=' +
				longitude +
				'&lon=' +
				latitude +
				'&name=' +
				poiName;
			window.location.href = href;
		} else {
			const href =
				'https://map.naver.com/p/directions/-/14124190.9542216,4509559.5806679,%EC%A0%9C%EC%9D%B4%EC%98%A4%EC%8A%A4%ED%8B%B0%EC%97%98,13358566,PLACE_POI/-/transit?c=15.00,0,0,0,dh';
			window.location.href = href;
		}
	}
</script>

<section>
	<div class="py-5 mx-auto">
		<h1 class="mb-8 text-3xl md:text-3xl font-bold text-center text-stone-600">오시는 길</h1>
		<div class="text-center py-2 text-xl">
			<p>{poiName}</p>
			<p class="text-gray-500 text-base">{address}</p>
		</div>

		<div id="main_map" class="w-full h-60">
			<iframe
				title="map"
				src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3165.1833549922544!2d126.87712107653897!3d37.50359342773382!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357c9e6d91734c27%3A0x102b2a62c34fda08!2z7KCc7J207Jik7Iqk7Yuw7JeY!5e0!3m2!1sko!2sjp!4v1758895181304!5m2!1sko!2sjp"
				width="100%"
				height="100%"
				style="border:0;"
				allowfullscreen
				loading="lazy"
				referrerpolicy="no-referrer-when-downgrade"
			></iframe>
		</div>
		<div class="text-center px-1 py-5">
			<button id="kakao-navi" on:click={kakaoMap} class="btn rounded-lg mx-2">
				<img src="image/kakao.png" height="10" width="10" alt="" />
				<span class="text-sm">카카오 지도</span>
			</button>
			{#if isMobile}
				<button id="tmap-navi" on:click={tMap} class="btn mx-2 rounded-lg">
					<img src="image/tmap.png" height="10" width="10" alt="" />
					<span class="text-sm">티맵 내비</span>
				</button>
			{:else}
				<button id="gmap-navi" on:click={gMap} class="btn mx-2 rounded-lg">
					<img src="image/gmap.png" height="10" width="10" alt="" />
					<span class="text-sm">구글 맵</span>
				</button>
			{/if}
			<button id="naver-navi" on:click={naverMap} class="btn mx-2 rounded-lg">
				<img src="image/naver.png" height="10" width="10" alt="" />
				<span class="text-sm">네이버 지도</span>
			</button>
		</div>
		<div class="flex flex-col w-full px-5 mt-4">
			<div>
				<p class="leading-relaxed mt-1"></p>
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
