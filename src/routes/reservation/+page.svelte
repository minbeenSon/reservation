<script>
	import Footer from "../template/Footer.svelte";
    import Header from "../template/Header.svelte";

    export let data;
</script>

<Header activeMenu='RESERVATION' isLogedIn = {data.user} />

<main class="container">
    <h1>RESERVATION PAGE</h1>
</main>

<Footer />