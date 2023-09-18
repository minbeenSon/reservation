<script>
	import Footer from '../../../template/Footer.svelte';
	import Header from '../../../template/Header.svelte';

	export let data;
</script>

<Header activeMenu="COMMUNITY" isLogedIn={data.user} />

<div class="container">
	<h1>BOARD DETIAL</h1>

	<div class="pt-5 pd-5">
		
	</div>
</div>

<Footer />
