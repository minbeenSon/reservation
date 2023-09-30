<script>
	import { onMount } from 'svelte';

	export let boardId;
	export let userId;

	let pressed = false;

	async function pressLike() {
		if (!boardId || !userId) {
			alert('로그인하세요');
			return;
		}
		let response = await fetch('/api/boardLike', {
			method: 'POST',
			body: JSON.stringify({
				boardId,
				userId
			})
		});
		if (response.status === 200) {
			alert('좋아요 성공');
			pressed = !pressed;
		} else {
			alert('좋아요 실패');
		}
	}

	onMount(async () => {
		let response = await fetch(`/api/boardLike?boardId=${boardId}&userId=${userId}`);
		if (response.status === 200) {
			let result = await response.json();
			pressed = result.pressed;
		}
	});
</script>

{#if pressed}
	<div>
		<button on:click={pressLike}>❤</button>
	</div>
{:else}
	<div>
		<button on:click={pressLike}>🤍</button>
	</div>
{/if}
