<script>
	import { createEventDispatcher } from 'svelte';

	let resultMessage = '';
	const dispatch = createEventDispatcher();

	async function onUpload(event) {
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
			dispatch('getImgUrl', { imageUrl: imageUrl });
			resultMessage = 'uploaded image link = ' + imageUrl;
		} else {
			resultMessage = 'failed to upload image';
		}
	}
</script>

<div class="col-12">
	<label for="profile-image" class="form-label">Profile Image</label>
	<input
		class="form-control"
		type="file"
		accept="image/jpg, image/jpeg, image/png"
		on:change={onUpload}
	/>
	<div>{resultMessage}</div>
</div>
