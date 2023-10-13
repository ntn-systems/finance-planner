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
	let dateInputPlaceholder = '';

	const validDays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

	$: {
		if (fixedInterval === 'weekly') {
			dateInputPlaceholder = 'Day of the Week (e.g, Sunday)';
		} else if (fixedInterval === 'monthly') {
			dateInputPlaceholder = 'DD/MM';
		} else if (fixedInterval === 'annual') {
			dateInputPlaceholder = 'MM/YYYY';
		} else {
			dateInputPlaceholder = '';
		}
	}

	function createNewEntrys(initialValue?: FinancesEntry[]) {
		if (!initialValue) throw new Error('No initial value');
		const { subscribe, update, set } = writable<FinancesEntry[]>(initialValue);

		const isValidDayOfWeek = (day: string) => validDays.includes(day.toLowerCase());

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
				if (fixedInterval === 'weekly' && dayOfWeek && !isValidDayOfWeek(dayOfWeek)) {
					alert('Invalid  day of week.(Please use a valid day (e.g, Sunday, Monday etc.)');
					return;
				}

				const id = Math.floor(Math.random() * 1000);
				const newEntry: FinancesEntry = {
					id,
					value,
					category,
					fixedInterval,
					dayOfWeek: fixedInterval === 'weekly' ? dayOfWeek : undefined,
					month: fixedInterval === 'monthly' ? month : undefined,
					year: fixedInterval === 'annual' ? year : undefined
				};
				update((entries) => [...entries, newEntry]);
			}
		};
	}

	const finances = createNewEntrys([]);
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
		{#if fixedInterval === 'weekly'}
			<input type="text" bind:value={dayOfWeek} placeholder={dateInputPlaceholder} />
		{:else if fixedInterval === 'monthly'}
			<input type="text" bind:value={month} placeholder={dateInputPlaceholder} />
		{:else if fixedInterval === 'annual'}
			<input type="text" bind:value={year} placeholder={dateInputPlaceholder} />
		{/if}
		<button
			tabindex="0"
			on:click={() => {
				if (value && fixedInterval) {
					finances.add(value, category, fixedInterval, dayOfWeek, month, year);
				} else {
					alert(
						'Please fill in the value field with a positive or negative number to gerate a new credit or debit.'
					);
				}
			}}
			on:keydown={(event) => {
				if (event.key === 'Enter') {
					if (value && fixedInterval) {
						finances.add(value, category, fixedInterval, dayOfWeek, month, year);
					} else {
						alert(
							'Please fill in the value field with a positive or negative number to gerate a new credit or debit.'
						);
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
				Value: {entry.value} | Category: {entry.category} | Interval: {entry.fixedInterval}
				{#if entry.fixedInterval === 'weekly' || entry.fixedInterval === 'monthly' || entry.fixedInterval === 'annual'}
					| Date: {entry.dayOfWeek || entry.month || entry.year}
				{/if}
			</li>
		{/each}
	</ul>
</main>

<!-- hello -->
