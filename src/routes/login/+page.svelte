<script>
	import Header from '../template/Header.svelte';
	import Footer from '../template/Footer.svelte';
	import { page } from '$app/stores';

	let email;
	let password;

	async function logIn() {
		if (email && password) {
			const logInResponse = await fetch('/api/login', {
				method: 'POST',
				body: JSON.stringify({ email, password })
			});

			if (logInResponse.status === 200) {
				const pathname = $page.url.searchParams.get('pathname');
				alert('로그인 성공');
				location.href = pathname ?? '/';
			} else {
				alert('로그인 실패');
			}
		} else {
			alert('아이디 또는 비밀번호를 입력해주세요.');
		}
	}
</script>

<Header active="" />

<div class="container">
	<h1>Log In</h1>
	<div class="pt-5 pb-5">
		<div class="col-12">
			<label for="email" class="form-label">Email</label>
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

		<hr class="my-4" />

		<button class="w-100 btn btn-primary btn-lg" type="button" on:click={logIn}>Log In</button>
		<a href="/signup" class="w-100 btn btn-primary btn-lg mt-3">Sign Up</a>
	</div>
</div>

<Footer />
