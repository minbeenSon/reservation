<script>
	import Footer from "../template/Footer.svelte";
    import Header from "../template/Header.svelte";
    
    export let data;
</script>

<Header activeMenu='COMMUNITY' isLogedIn = {data.user} />



<main class="container">
    <h1>COMMUNITY PAGE</h1>
</main>

<Footer />