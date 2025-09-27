<script lang="ts">
	import { onMount } from 'svelte';

	import Header from '../../components/Header.svelte';
	import MainImage from '../../components/MainImage.svelte';
	import MainMessage from '../../components/MainMessage.svelte';
	import AnimationFrame from '../../components/AnimationFrame.svelte';
	import Calendar from '../../components/Calendar.svelte';
	import Location from '../../components/Location.svelte';
	import Gallery from '../../components/Gallery.svelte';
	import Footer from '../../components/Footer.svelte';
	import { dday, mainDescription, mainImageURL, mainTitle, siteURL } from '../../resource/input';

	let isTouched: boolean = false;
	let isMobile: boolean = false;

	const imageUrl = mainImageURL;
	const siteUrl = siteURL;
	const title = mainTitle;
	const description = mainDescription;
	onMount(() => {
		if (typeof window === 'undefined') return; // SSR 방어
		isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
	});
</script>

<svelte:head>
	<title>{title}</title>
	<meta property="og:title" content={title} />
	<meta property="og:url" content={siteUrl} />
	<meta property="og:description" content={description} />
	<meta property="og:type" content="website" />
	<meta property="og:image" content={imageUrl} />
</svelte:head>

<Header />
<MainImage bind:isTouched />
<div class="divide-y py-10"></div>
<MainMessage />
<Calendar year={dday[0]} month={dday[1]} theDay={dday[2]} />
<div class="divide-y py-10"></div>
<Gallery />
<div class="divide-y py-10"></div>
<Location bind:isMobile />
<div class="divide-y py-10"></div>
<Footer />

{#if !isTouched}
	<AnimationFrame isHeartMode={true} bind:isMobile />
{:else}
	<AnimationFrame isHeartMode={false} bind:isMobile />
{/if}
