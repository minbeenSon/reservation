<script>
	import Footer from '../../template/Footer.svelte';
	import Header from '../../template/Header.svelte';

	export let data;
</script>

<Header activeMenu="COMMUNITY" isLogedIn={data.user} />

<main class="container">
	<h1>BoardList PAGE</h1>
	<div class="pt-5 pb-5">
		<div class="d-flex justify-content-between align-items-center mb-4">
			<div>TOTAL : <small>{data.boardList.length}</small></div>
			<div>
				<form role="search">
					<div class="d-flex">
						<select class="form-control me-2" name="searchPart">
							<option value="">ALL</option>
							<option value="title">Title</option>
							<option value="content">Content</option>
						</select>
						<input
							class="form-control me-2"
							name="searchText"
							type="search"
							placeholder="Search"
							aria-label="Search"
						/>
						<button class="btn btn-outline-success" type="submit">Search</button>
					</div>
				</form>
			</div>
		</div>
		<div class="my-3">
			<a href="/community/board/write/new" class="btn btn-primary btn-lg" type="button">Write Board</a>
		</div>
		<table class="table table-striped">
			<thead>
				<tr>
					<th scope="col">#</th>
					<th scope="col">Title</th>
					<th scope="col">Content</th>
					<th scope="col">Nickname</th>
					<th scope="col">Date</th>
				</tr>
			</thead>
			<tbody class="table-group-divider">
				{#each data.boardList as board}
					<tr>
						<th scope="row">{board.id}</th>
						<td><a href="/community/board/{board.id}" style="color:black">{board.title}</a></td>
						<td
							><a href="/community/board/{board.id}" style="color:black">{board.content_text}</a
							></td
						>
						<td>{board.user_id}</td>
						<td>{board.created_at}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</main>

<Footer />

<style>
	a {
		text-decoration: none;
	}
</style>
