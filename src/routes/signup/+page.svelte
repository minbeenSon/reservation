<script>
	import Header from '../template/Header.svelte';
	import Footer from '../template/Footer.svelte';
	import ImageUploader from '/src/domain/component/ImageUploader.svelte';

	export let data;

	let email;
	let password;
	let passwordCheck;
	let nickname;
	let profileImage;
	let country;
	let gender;
	let birth;

	function handleImgUrl(event) {
		profileImage = event.detail.imageUrl;
	}

	async function createUser() {
		const response = await fetch('/api/user/emailDuplication?email=' + email, {
			method: 'GET'
		});
		if (response.status === 200) {
			alert('중복된 이메일');
			return;
		}

		if (email && password && passwordCheck && nickname) {
			if (password === passwordCheck) {
				let response = await fetch('/api/user', {
					method: 'POST',
					body: JSON.stringify({
						email,
						password,
						nickname,
						profileImage,
						country,
						gender,
						birth
					})
				});
				if (response.status === 200) {
					alert('회원가입 성공');
					location.href = '/login';
				} else {
					alert('회원가입 실패');
				}
			} else {
				alert('비밀번호 비일치');
			}
		} else {
			alert('필수 항목 누락');
		}
	}
</script>

<Header active="" isLogedIn={data.user} />

<div class="container">
	<h1>Sign Up</h1>
	<div class=" pt-5 pb-5">
		<div class="row g-3">
			<h4>Required</h4>

			<div class="col-12">
				<label for="email" class="form-label"
					>Email<small class="text-body-secondary m-1"
						>(이메일 인증이 있으니 실제 이메일 작성해주세요.)</small
					></label
				>
				<input
					type="email"
					class="form-control"
					bind:value={email}
					placeholder="you@example.com"
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
				<label for="nickname" class="form-label">Nickname</label>
				<input
					type="text"
					class="form-control"
					bind:value={nickname}
					placeholder="nickname"
					required
				/>
			</div>

			<ImageUploader />

			<hr class="my-4" />

			<h4>Optional</h4>

			<div class="col-12">
				<label for="country" class="form-label">Country</label>
				<select class="form-select" bind:value={country}>
					<option value="">Choose...</option>
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
				<select class="form-select" bind:value={gender}>
					<option value="">Choose...</option>
					<option value="male">Male</option>
					<option value="female">Female</option>
					<option value="etc">etc</option>
				</select>
			</div>

			<div class="col-12">
				<label for="birth" class="form-label">Birth</label>
				<input type="date" class="form-control" bind:value={birth} />
			</div>
		</div>

		<hr class="my-4" />

		<button class="w-100 btn btn-primary btn-lg" type="button" on:click={createUser}>Create</button>
	</div>
</div>

<Footer />
