<script>
	import Header from '../../template/Header.svelte';
	import Footer from '../../template/Footer.svelte';

	export let data;

	let password = '';
	let passwordCheck = '';


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
			data.user.profile_img_url = imageUrl;
		} else {
			alert('업로드 실패');
		}
	}

    async function updateUser() {

        if (!data.user.nickname) {
            alert('닉네임을 입력하세요.')
            return;
        }
        
        if (password === passwordCheck) {
            let updatedUser = {};
            updatedUser.id = data.user.id;
            updatedUser.password = password;
            updatedUser.profile_img_url = data.user.profile_img_url;
            updatedUser.nickname = data.user.nickname;
            updatedUser.country = data.user.country;
            updatedUser.gender = data.user.gender;
            updatedUser.birth = data.user.birth;

            const response = await fetch('/api/user', {
                method: 'PUT',
                body: JSON.stringify(updatedUser)
            })
            
            if (response.status === 200) {
                alert('계정 정보 변경 완료');
                location.href = '/mypage';
            } else {
                console.error('계정 정보 변경 실패')
            }
        } else {
            alert('패스워드 불일치')
        }
        
    }
</script>

<Header activeMenu="MYPAGE" isLogedIn={data.user} />

<main class="container">
	<h1>MY ACCOUNT</h1>

	<div class="pt-5 pb-5">
		<div class="col-12">
			<div>
				<img src={data.user.profile_img_url} alt="" />
			</div>
			<label for="profile-image" class="form-label">Profile Image</label>
			<input
				class="form-control"
				type="file"
				accept="image/jpg, image/jpeg, image/png"
				on:change={uploadImage}
			/>
		</div>

		<div class="col-12">
			<label for="nickname" class="form-label">Nickname</label>
			<input
				type="text"
				class="form-control"
				bind:value={data.user.nickname}
				placeholder="nickname"
				required
			/>
		</div>

		<div class="col-12">
			<label for="password" class="form-label">Password</label>
			<input
				type="password"
				class="form-control"
				bind:value={password}
				placeholder="password"
				required
			/>
		</div>

		<div class="col-12">
			<label for="password" class="form-label"
				>Password<small class="text-body-secondary m-1">(Check)</small></label
			>
			<input
				type="password"
				class="form-control"
				bind:value={passwordCheck}
				placeholder="password"
				required
			/>
		</div>

        <div class="col-12">
            <label for="country" class="form-label">Country</label>
            <select class="form-select" bind:value={data.user.country}>
                <option value=null>Choose...</option>
                <option value="korea">Korea</option>
                <option value="japan">Japan</option>
                <option value="china">China</option>
                <option value="taiwan">Taiwan</option>
                <option value="canada">Canada</option>
                <option value="usa">U.S.A</option>
            </select>
        </div>

        <div class="col-12">
            <label for="gender" class="form-label">Gender</label>
            <select class="form-select" bind:value={data.user.gender}>
                <option value=null>Choose...</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="etc">etc</option>
            </select>
        </div>

        <div class="col-12">
            <label for="birth" class="form-label">Birth</label>
            <input type="date" class="form-control" bind:value={data.user.birth} />
        </div>

		<hr class="my-4" />

		<button class="w-100 btn btn-primary btn-lg" type="button" on:click={updateUser}>Update</button>
	</div>
</main>

<Footer />
