<script>
	import Footer from "../../template/Footer.svelte";
    import Header from "../../template/Header.svelte";

    export let data;

</script>

<Header activeMenu='MYPAGE' isLogedIn = {data.user}/>

<main class="container">
    <h1>MANAGEMENT</h1>
    <div class="pt-5 pb-5">
        <div class="my-1">
            <a href="/mypage/management/user" class="btn btn-primary btn-lg" type="button">USER</a>
        </div>
    </div>
    
</main>

<Footer />