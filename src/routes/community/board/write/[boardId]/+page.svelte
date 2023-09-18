<script>
	import Footer from '../../../../template/Footer.svelte';
	import Header from '../../../../template/Header.svelte';

	export let data;
	
	async function uploadImage(event) {
		const element = event.target;
		if (!element) return;
		const files = element.files;
		if (!files) return;

		const uploadData = new FormData();
		uploadData.append('file', files[0], `${files[0].name}`);

		const uploadRequest = await fetch('https://image.maho-l.ink/img', {
			method: 'POST',
			body: uploadData
		});

		if (uploadRequest.status === 200) {
			const imageUrl = 'https://image.maho-l.ink/img/' + (await uploadRequest.text());
			data.board.content_image_url = imageUrl;
		} else {
			alert('업로드 실패');
		}
	}

	async function createBoard() {
		if (!data.board.title || !data.board.content_text) {
			alert('제목과 내용을 작성해주세요')
			return;
		}
		data.board.user_id = data.user.id;

		const response = await fetch('/api/board/', {
			method: data.board.id === 0 ? 'POST' : 'PUT',
			body: JSON.stringify(data.board)
		});
		if (response.status === 200) {
			alert('Board 작성 완료');
			location.href='/community/board'
		} else {
			alert('Board 작성 실패');
		}
	}
	
</script>

<Header activeMenu="COMMUNITY" isLogedIn={data.user} />

<div class="container">
	<h1>BOARD WRITE</h1>

	<div class="pt-5 pb-5">
		<div class="col-12">
			<label for="title" class="form-label">Title</label>
			<input
				type="text"
				class="form-control"
				bind:value={data.board.title}
				placeholder="Title"
				required
			/>
		</div>

		<div class="col-12">
			<label for="title" class="form-label">Content</label>
			<textarea class="form-control" bind:value={data.board.content_text} cols="30" rows="10" placeholder="content"></textarea>
		</div>

		<div class="col-12">
			<div>
				<img src={data.board.content_image_url} alt="" />
			</div>
			<label for="profile-image" class="form-label">Content Image</label>
			<input
				class="form-control"
				type="file"
				accept="image/jpg, image/jpeg, image/png"
				on:change={uploadImage}
			/>
		</div>

		<hr class="my-4" />

		<button class="w-100 btn btn-primary btn-lg" type="button" on:click={createBoard}>Create</button>
	</div>
</div>

<Footer />
