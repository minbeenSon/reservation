<script>
	import Footer from "../template/Footer.svelte";
    import Header from "../template/Header.svelte";

    export let data;

    async function deleteUser() {
        const response = await fetch('/api/user?userId=' + data.user.id, {
            method: 'DELETE'
        })
        if (response.status === 200) {
            alert('계정 삭제 완료');
            location.href = '/';
        } else {
            alert('계정 삭제 실패');
        }
    }
</script>

<Header activeMenu='MYPAGE' isLogedIn = {data.user}/>

<main class="container">
    <h1>MY PAGE</h1>
    <div class="pt-5 pb-5">
        <div class="my-1">
            <a href="/mypage/myaccount" class="btn btn-primary btn-lg" type="button">MY ACCOUNT</a>
        </div>
        <div class="my-1">
            <button class="btn btn-primary btn-lg" type="button" on:click={deleteUser}>DELETE ACCOUNT</button>
        </div>
        {#if data.user.user_rank === 'MANAGER'}
        <div class="my-1">
            <a href="/mypage/management" class="btn btn-danger btn-lg" type="button">MANAGEMENT</a>
        </div>
        {/if}
    </div>
    
</main>

<Footer />