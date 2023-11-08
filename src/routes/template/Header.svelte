<script>
	export let activeMenu;
	export let isLogedIn;

	let display = true;
	let screenSize;

	$: if (screenSize > 769) {
		display = true;
	}

	async function logOut() {
		const response = await fetch('/api/logout', {
			method: 'DELETE'
		});
		if (response.status === 200) {
			location.href = '/';
		}
	}
</script>

<svelte:window bind:innerWidth={screenSize} />

<header>
	<nav class="navbar">
		<div class="navbar-logo">
			<i class="fa-solid fa-cloud" />
			<a href="/">민빈이에게예약하기</a>
		</div>
		{#if display}
			<ul class="navbar-menu active">
				<li><a href="/" class:active-menu={activeMenu === 'HOME'}>HOME</a></li>
				<li>
					<a href="/reservation" class:active-menu={activeMenu === 'RESERVATION'}>RESERVATION</a>
				</li>
				<li><a href="/community/vote" class:active-menu={activeMenu === 'COMMUNITY'}>COMMUNITY</a></li>
				<li><a href="/mypage" class:active-menu={activeMenu === 'MYPAGE'}>MY PAGE</a></li>
			</ul>
			<div class="navbar-log active">
				{#if isLogedIn}
					<button on:click={logOut} class="btn btn-primary">LOG OUT </button>
				{:else}
					<a href="/login" class="btn btn-primary">LOG IN</a>
				{/if}
			</div>
		{/if}

		<a href="#" class="navbar-toogle" on:click={() => (display = !display)}>
			<i class="fa-solid fa-bars" />
		</a>
	</nav>

	<nav class="sub-nav">
		<ul class="sub-nav-menu">
			{#if activeMenu === 'RESERVATION'}
				<li><a href="#">예약하기</a></li>
				<li><a href="#">나의예약</a></li>
			{:else if activeMenu === 'COMMUNITY'}
				<li><a href="/community/vote">투표</a></li>
				<li><a href="#">나의일상</a></li>
				<li><a href="/community/board">방명록</a></li>
			{:else if activeMenu === 'MYPAGE'}
				<li><a href="#">즐겨찾기</a></li>
				<li><a href="#">내정보</a></li>
			{/if}
		</ul>
	</nav>
</header>

<style>
	a {
		text-decoration: none;
		color: white;
	}

	.navbar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #263343;
		padding: 16px 48px;
	}
	.navbar-logo {
		font-size: 24px;
		color: white;
	}
	.navbar-logo i {
		color: #d49466;
	}
	.navbar-menu {
		display: flex;
		list-style: none;
		padding-left: 0;
		margin-bottom: 0;
	}
	.navbar-menu li {
		padding: 8px 12px;
	}
	.navbar-menu li:hover {
		background-color: #d49466;
		border-radius: 4px;
	}
	.navbar-log {
		color: white;
		display: flex;
	}
	.navbar-toogle {
		display: none;
		position: absolute;
		right: 32px;
		font-size: 24px;
		color: #d49466;
	}
	.active-menu {
		border-bottom: 2px solid #d49466;
	}

	.sub-nav {
		/* justify-content: center; */
		background-color: greenyellow;
		width: 100%;
		margin: 0 auto;
	}
	.sub-nav-menu {
		/* float: left; */
		text-align: center;
	}
	.sub-nav-menu li {
		display: inline-block;
		text-align: center;
		padding: 8px 12px;
	}

	@media only screen and (max-width: 768px) {
		.navbar {
			flex-direction: column;
			align-items: flex-start;
		}
		.navbar-menu {
			flex-direction: column;
			width: 100%;
			align-items: center;
		}
		.navbar-menu li {
			width: 100%;
			text-align: center;
			margin-bottom: 5px;
		}
		.navbar-log {
			justify-content: center;
			width: 100%;
		}
		.navbar-toogle {
			display: block;
		}
		.navbar-menu.active,
		.navbar-log.active {
			display: flex;
		}
	}
</style>
