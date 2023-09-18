<script>
	import Footer from '../../../template/Footer.svelte';
	import Header from '../../../template/Header.svelte';

	export let data;

	async function updateUserRank(userId, userRank) {
		const response = await fetch('/api/user/management', {
			method: 'PUT',
			body: JSON.stringify({ userId, userRank })
		});
		if (response.status === 200) {
			alert('등급 변경 완료');
		} else {
			alert('등급 변경 실패');
		}
	}

	async function deleteUser(userId) {
		const response = await fetch('/api/user/management?userId=' + userId, {
			method: 'DELETE'
		});
		if (response.status === 200) {
			alert('유저 삭제 성공');
			location.reload();
		} else {
			alert('유저 삭제 실패');
		}
	}
</script>

<Header activeMenu="MYPAGE" isLogedIn={data.user} />

<main class="container">
	<h1>MANAGEMENT-USER</h1>

	<div class="pt-5 pb-5">
		<div class="d-flex justify-content-between align-items-center mb-4">
			<div>TOTAL : <small>{data.userList.length}</small></div>
			<div>
				<form role="search">
					<div>
						<label for="">Manager</label>
						<input type="checkbox" name="manager" />
						<label for="">ExcludeDeleted</label>
						<input type="checkbox" name="deleted" />
					</div>
					<div class="d-flex">
						<select class="form-control me-2" name="searchPart">
							<option value="">ALL</option>
							<option value="email">Email</option>
							<option value="nickname">Nickname</option>
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
		<div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
			{#each data.userList as user}
				<div class="col">
					<div class="card shadow-sm">
						<img
							class="bd-placeholder-img card-img-top"
							style="object-fit: cover;"
							height="400px"
							src={user.profile_img_url}
							alt=""
						/>
						<div class="card-body">
							<div class="card-text">
								<div>Email : <small>{user.email}</small></div>
								<div>Nickname : <small>{user.nickname}</small></div>
								<div>Join : <small>{user.created_at.toLocaleDateString()}</small></div>
								<div>Birth : <small>{user.birth}</small></div>
								<div>Sex : <small>{user.gender}</small></div>
								<div>Country : <small>{user.country}</small></div>
								<div>
									Delete : <small
										>{user.deleted_at ? user.deleted_at.toLocaleDateString() : ''}</small
									>
								</div>
								<hr />
							</div>
							<div class="align-items-center">
								<label for="">Rank : </label>
								<div class="btn-group">
									<select bind:value={user.user_rank}>
										<option value="USER">USER</option>
										<option value="MANAGER">MANAGER</option>
									</select>
									<button
										type="button"
										class="btn btn-sm btn-outline-secondary"
										on:click={() => updateUserRank(user.id, user.user_rank)}>Edit</button
									>
								</div>
							</div>
							<hr />
							<div class="d-flex justify-content-between align-items-center">
								<button
									type="button"
									class="btn btn-sm btn-outline-danger"
									on:click={() => deleteUser(user.id)}>Delete</button
								>
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</main>

<Footer />
