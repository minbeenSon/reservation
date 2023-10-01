<script>
	import BoardLike from '../../../../domain/component/BoardLike.svelte';
	import Footer from '../../../template/Footer.svelte';
	import Header from '../../../template/Header.svelte';

	export let data;
	let commentMain;
	let countCommentMain = 0;
	let commentSub = [];
	let countCommentSub = [];

	function copyUrl() {
		let currentUrl = window.location.href;
		navigator.clipboard.writeText(currentUrl).then((res) => {
			alert('복사완료');
		});
	}

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

	function countTextMain() {
		countCommentMain = commentMain.value.length;
	}

	function countTextSub(idx) {
		countCommentSub[idx] = commentSub[idx].value.length;
	}
</script>

<Header activeMenu="COMMUNITY" isLogedIn={data.user} />

<div class="container">
	<h1>BOARD DETIAL</h1>

	<div class="pt-5 pb-5">
		<h3 class="mb-5">
			{data.board.title}
		</h3>
		<div class="mb-5">
			{data.board.content_text}
		</div>
		<div style="display: flex;">
			<div style="margin-right: 0.5rem;">
				<BoardLike
					boardId={data.board.id}
					userId={data.user?.id}
					likeCount={data.boardLikeCount ?? 0}
				/>
			</div>
			<div style="margin-right: 0.5rem;">
				<button style="background-color: transparent;" on:click={copyUrl}>📍</button>
			</div>
		</div>

		{#if data.user && data.user.id === data.board.user_id}
			<div class="my-3">
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

		<hr />

		<div class="my-3">
			<form method="post" action="?/comment_create">
				<input type="hidden" name="board-id" value={data.board.id} />
				<input type="hidden" name="user-id" value={data.user?.id} />
				<div class="my-3">
					COMMENT : <span>{data.boardComment.length}</span>
				</div>
				<textarea
					placeholder="内容を入力してください"
					rows="4"
					name="content"
					maxlength="300"
					bind:this={commentMain}
					on:keyup={countTextMain}
					class="form-control"
					required
				/>
				<div class="mt-1" style="display: flex; justify-content: space-between;">
					<div>
						<p class="comment-length">{countCommentMain}/300</p>
					</div>
					<div>
						<button class="btn btn-primary btn-lg">Send</button>
					</div>
				</div>
			</form>
		</div>

		<div>
			{#each data.boardComment as comment}
				<div>
					<div style="display: flex; justify-content: space-between;">
						<div>{comment.main.user_id}</div>
						<div>{comment.main.created_at}</div>
					</div>

					<div class="my-3">{comment.main.content}</div>
				</div>

				<div>
					<form method="post" action="?/comment_create">
						<input type="hidden" name="board-id" value={data.board.id} />
						<input type="hidden" name="user-id" value={data.user?.id} />
						<input type="hidden" name="comment-id" value={comment.main.id} />
						<textarea
							placeholder="内容を入力してください"
							rows="3"
							name="content"
							maxlength="300"
							bind:this={commentSub[comment.id]}
							on:keyup={() => countTextSub(comment.id)}
							class="form-control"
							required
						/>
						<div class="mt-1 mb-1" style="display: flex; justify-content: space-between;">
							<div>
								<p class="comment-length">{countCommentSub[comment.id] ?? 0}/300</p>
							</div>
							<div>
								<button class="btn btn-primary btn-lg">Send</button>
							</div>
						</div>
					</form>
				</div>

				{#each (comment.sub).reverse() as subComment}
					<div class="ms-3">
						<div style="display: flex; justify-content: space-between;">
							<div><span>└▶</span>{subComment.user_id}</div>
							<div>{subComment.created_at}</div>
						</div>

						<div class="my-3 ms-4">{subComment.content}</div>
					</div>
				{/each}

				<hr />
			{/each}
		</div>
	</div>
</div>

<Footer />

<style>
	button {
		border: 0;
	}
</style>
