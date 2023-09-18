<script>
    import Header from "./template/Header.svelte";
	import Footer from "./template/Footer.svelte";

    export let data;
</script>

<Header activeMenu = 'HOME' isLogedIn = {data.user}/>
    
<div class="container">
    <h1>MAIN PAGE</h1>
</div>

<Footer />
