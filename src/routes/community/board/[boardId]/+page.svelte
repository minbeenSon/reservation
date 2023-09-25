<script>
	import Footer from '../../../template/Footer.svelte';
	import Header from '../../../template/Header.svelte';

	export let data;

	async function deleteBoard() {
		const response = await fetch('/api/board?boardId=' + data.board.id, {
			method: 'DELETE'
		});
		if (response.status === 200) {
			alert('게시물 삭제 완료');
			location.href = '/community/board';
		} else {
			alert('게시물 삭제 실패');
		}
	}
</script>

<Header activeMenu="COMMUNITY" isLogedIn={data.user} />

<div class="container">
	<h1>BOARD DETIAL</h1>

	<div class="pt-5 pb-5">
		<div>
			{data.board.title}
		</div>
		<div>
			{data.board.content_text}
		</div>
		{#if data.user && data.user.id === data.board.user_id}
			<div>
				<a
					href="/community/board/write/{data.board.id}"
					class="w-25 btn btn-primary btn-lg"
					type="button">Revise</a
				>
				<button class="w-25 btn btn-danger btn-lg" type="button" on:click={deleteBoard}
					>Delete</button
				>
			</div>
		{/if}
	</div>
</div>

<Footer />
