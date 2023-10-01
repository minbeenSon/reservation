<script>
	import { onMount } from 'svelte';

	export let boardId;
	export let userId;
    export let likeCount;

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
			pressed = !pressed;
            if (pressed) {
                likeCount = likeCount + 1;
            } else {
                likeCount = likeCount - 1;
            }
		} else {
			alert('좋아요 실패');
		}
	}

	onMount(async () => {
		let responseLike = await fetch(`/api/boardLike?boardId=${boardId}&userId=${userId}`);
		if (responseLike.status === 200) {
			let result = await responseLike.json();
			pressed = result.pressed;
		}
        console.log(pressed)
	});
</script>

{#if pressed}
	<button on:click={pressLike}>❤</button><span>{likeCount}</span>
{:else}
	<button on:click={pressLike}>🤍</button><span>{likeCount}</span>
{/if}


<style>
	button {
		border: 0;
        background-color: transparent;
	}
</style>