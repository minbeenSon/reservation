<script>
	import Footer from '../../template/Footer.svelte';
	import Header from '../../template/Header.svelte';

	export let data;

	console.log(data)
</script>

<Header activeMenu="COMMUNITY" isLogedIn={data.user} />

<main class="container">
	<h1>VOTE PAGE</h1>

	<a href="/community/vote/create/new" class="btn btn-primary btn-lg" type="button">Create Vote</a>

	{#each data.voteListWithMetaData as voteWithMetaData}
		<div class="my-5">
			<div>
				<div>
					<img src="" alt="" />
				</div>
				<div>
					<p>{voteWithMetaData.creator.nickname}</p>
				</div>
			</div>
			<div>Title : <span>{voteWithMetaData.vote.title}</span></div>
			<div>Start : <span>{voteWithMetaData.startAt}</span></div>
			<div>End : <span>{voteWithMetaData.endAt}</span></div>
			<form method="post" action="?/vote_candidate_count">
				<input type="text" name="user-id" value={data.user.id} hidden />
				<input type="text" name="vote-id" value={voteWithMetaData.vote.id} hidden />
				{#each data.candidateListWithMetaData as candidateWithMetaData}
					{#if voteWithMetaData.vote.id === candidateWithMetaData.candidate.vote_id}
						<div>
							<label for="">
								<input
									type="radio"
									name="candidate-id"
									value={candidateWithMetaData.candidate.id}
									checked={candidateWithMetaData.checked}
									disabled={data.user && new Date(voteWithMetaData.endAt) < new Date()}
								/>
								<span>{candidateWithMetaData.candidate.name}</span>
								<span
									>( count : {candidateWithMetaData.candidate.count}, Percentage : {candidateWithMetaData.percentage}, User :  {candidateWithMetaData.userNicknameList} )</span
								>
							</label>
						</div>
					{/if}
				{/each}
				<button disabled={new Date(voteWithMetaData.endAt) < new Date()}>제출</button>
			</form>
		</div>
	{/each}
</main>

<Footer />
