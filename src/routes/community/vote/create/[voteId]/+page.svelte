<script>
	import { onMount } from 'svelte';
	import Footer from '../../../../template/Footer.svelte';
	import Header from '../../../../template/Header.svelte';
	import { datetimeSplitBuilder, datetimeCombineBuilder } from '../../../../../domain/common/datetimeBulider';

	export let data;
	let startDate;
	let startTime;
	let endDate;
	let endTime;
	let candidate;

	function addVoteCandidate() {
		let newDiv = document.createElement('div');
		let newInput = document.createElement('input');
		newInput.setAttribute('type', 'text');
		newInput.setAttribute('name', 'candidate');
		let newButton = document.createElement('button');
		newButton.innerHTML = '✖';
		newButton.onclick = (e) => removeVoteCandidate(e.target);
		newDiv.appendChild(newInput);
		newDiv.appendChild(newButton);
		candidate.appendChild(newDiv);
	}

	function removeVoteCandidate(target) {
		let parent = target.parentNode;
		parent.remove();
	}

    async function createVote() {
        data.vote.start_at = datetimeCombineBuilder(startDate, startTime);
        data.vote.end_at = datetimeCombineBuilder(endDate, endTime);

        let responseVote = await fetch('/api/vote', {
            method: data.vote.id === 0 ?'POST': 'PUT',
            body: JSON.stringify(data.vote)
        });
        if (responseVote.status === 200) {
            let vote = (await responseVote.json()).vote;
            let candidateNames = [];
            let candidates =  document.getElementsByName('candidate');
            candidates.forEach(element => {
                candidateNames.push(element.value);
            });

            let responseCandidate = await fetch('/api/voteCandidate', {
                method: 'POST',
                body : JSON.stringify({voteId : vote.id, names: candidateNames})
            })
            
            if (responseCandidate.status === 200) {
                alert('생성 성공');
                location.href = '/community/vote';
            }
        }
    }

	onMount(() => {
		startDate = datetimeSplitBuilder(data.vote.start_at).dateData;
		startTime = datetimeSplitBuilder(data.vote.start_at).timeData;
		endDate = datetimeSplitBuilder(data.vote.end_at).dateData;
		endTime = datetimeSplitBuilder(data.vote.end_at).timeData;
	});
</script>

<Header activeMenu="COMMUNITY" isLogedIn={data.user} />

<main class="container">
	<h1>VOTE CREATE</h1>

	<div>
		<div>
			<div>제목</div>
			<input type="text" bind:value={data.vote.title} placeholder="Title" />
		</div>
		<div>
			<div>시작</div>
			<input type="date" bind:value={startDate} />
			<input type="time" bind:value={startTime} />
		</div>
		<label for="">
			<div>종료</div>
			<input type="date" bind:value={endDate} />
			<input type="time" bind:value={endTime} />
		</label>
		<div>
			<div>후보</div>
			<div bind:this={candidate}>
				<div>
					<input type="text" name="candidate" />
					<button on:click={(e) => removeVoteCandidate(e.target)}>✖</button>
				</div>
			</div>
			<button on:click={addVoteCandidate}>➕</button>
		</div>

        <button on:click={createVote}>CREATE</button>
	</div>
</main>

<Footer />
