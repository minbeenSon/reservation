<script>
	import Footer from '../../template/Footer.svelte';
	import Header from '../../template/Header.svelte';

	export let data;
	console.log(data);
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
			<a href="/community/board/write/new" class="btn btn-primary btn-lg" type="button">Write</a>
		</div>
		<div class="row mb-2">
			{#each data.boardList as board}
				<div class="col-md-6">
					<div
						class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative"
					>
						<div class="col p-4 d-flex flex-column position-static">
							<h3 class="mb-0">{board.title}</h3>
							<div class="mb-1 text-body-secondary">{board.created_at}</div>
							<p class="card-text mb-auto">{board.content_text}</p>
							<a href="/community/board/{board.id}" class="icon-link gap-1 icon-link-hover stretched-link">
								Continue reading
								<svg class="bi"><use xlink:href="#chevron-right" /></svg>
							</a>
						</div>
						<div class="col-auto d-none d-lg-block">
							<img class="bd-placeholder-img" width="200" height="250" src={board.content_image_url} alt="" />
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</main>

<Footer />
