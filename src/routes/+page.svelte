<script lang="ts">
	import { writable } from 'svelte/store';

	type FinancesEntry = {
		id: number;
		value: number;
		category?: string;
		fixedInterval: 'not fixed' | 'daily' | 'weekly' | 'monthly' | 'annual';
		dayOfWeek?: string;
		month?: string;
		year?: string;
	};

	let value = 0;
	let category = '';
	let fixedInterval: 'not fixed' | 'daily' | 'weekly' | 'monthly' | 'annual' = 'not fixed';
	let dayOfWeek = '';
	let month = '';
	let year = '';
	const validDays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

	function createNewEntrys(initialValue?: FinancesEntry[]) {
		if (!initialValue) throw new Error('No initial value');
		const { subscribe, update, set } = writable<FinancesEntry[]>(initialValue);

		return {
			subscribe,
			update,
			set,
			add: (
				value: number,
				category: string,
				fixedInterval: 'not fixed' | 'daily' | 'weekly' | 'monthly' | 'annual',
				dayOfWeek?: string,
				month?: string,
				year?: string
			) => {
				const id = Math.floor(Math.random() * 1000);
				const newEntry: FinancesEntry = {
					id,
					value,
					category,
					fixedInterval
				};
				update((entries) => [...entries, newEntry]);
			}
		};
	}

	const finances = createNewEntrys([
		{
			id: 1,
			value: 100,
			category: 'School',
			fixedInterval: 'monthly',
			month: '06/09'
		},
		{
			id: 2,
			value: 200,
			category: '',
			fixedInterval: 'not fixed',
			dayOfWeek: 'sunday'
		}
	]);
</script>

<main>
	<h1 class="flex justify-center">My Finances</h1>
	<div>
		<input type="number" bind:value placeholder="Valor" />
		<input type="text" bind:value={category} placeholder="Category" />
		<select bind:value={fixedInterval}>
			<option value="not fixed">Not Fixed</option>
			<option value="daily">Daily</option>
			<option value="weekly">Weekly</option>
			<option value="monthly">Monthly</option>
			<option value="annual">Annual</option>
		</select>
		<button
			tabindex="0"
			on:click={() => {
				if (value && category && fixedInterval) {
					finances.add(value, category, fixedInterval);
				} else {
					console.error('Please fill in all fields');
				}
			}}
			on:keydown={(event) => {
				if (event.key === 'Enter') {
					if (value && category && fixedInterval) {
						finances.add(value, category, fixedInterval);
					} else {
						console.error('Please fill in all fields');
					}
				}
			}}
		>
			Add Entry
		</button>
	</div>
	<ul>
		{#each $finances as entry (entry.id)}
			<li>
				Valor: {entry.value}, Categoria: {entry.category}, Periodo: {entry.fixedInterval}
			</li>
		{/each}
	</ul>
</main>

<!-- hello -->
