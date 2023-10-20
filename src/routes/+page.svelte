<script lang="ts">
    import Button from '$lib/components/Button.svelte'
    import { entries } from '$lib/store/entries'
    import AddEntryDialog from './add-entry-dialog.svelte'

    let error = false
    $: console.log(`🚀 ~ error:`, error)

    $: totalEarnings = $entries
        .filter(e => Number(e.amount) > 0)
        .reduce((acc, curr) => Number(curr.amount) + acc, 0)
    $: totalSpendings = $entries
        .filter(e => Number(e.amount) < 0)
        .reduce((acc, curr) => Number(curr.amount) + acc, 0)

    $: totalValue = totalEarnings + totalSpendings

    function deleteEntry(entryFindId: number | string) {
        const index = $entries.findIndex(entry => entry.id === entryFindId)
        if (index !== -1) {
            $entries = [
                ...$entries.slice(0, index),
                ...$entries.slice(index + 1),
            ]
        }
    }
</script>

<main class="container relative mx-auto py-8 max-sm:px-4">
    <AddEntryDialog
        on:submit={e => {
            if (e.detail) $entries = [...$entries, e.detail]
            else error = true
        }}
    />
    <p class="mb-4 mt-4 flex justify-center gap-4 text-white">
        You have spended ${totalSpendings} and you have earned ${totalEarnings}
        for a total of ${totalValue}
    </p>
    <div class="mx-auto mb-auto ml-auto mr-auto mt-auto flex">
        <div class="col-auto w-1/2">
            {#each $entries as entry}
                {@const value = Number(entry.amount)}
                {@const isNegative = value < 0}
                {#if isNegative}
                    <div class="mt-4 text-red-400">
                        Value: {entry.amount} | Category: {entry.category ||
                            'Empty'} | Interval: {entry.fixedInterval} | Date: {entry.reocurrency}
                        <Button
                            class="ml-3 inline-block gap-4"
                            on:click={() => deleteEntry(entry.id)}
                        >
                            Delete
                        </Button>
                    </div>
                {/if}
            {/each}
        </div>
        <div class="w-1/2">
            {#each $entries as entry}
                {@const value = Number(entry.amount)}
                {@const isNegative = value < 0}
                {#if !isNegative}
                    <div class="mt-4 text-blue-400">
                        Value: {entry.amount} | Category: {entry.category ||
                            'Empty'} | Interval: {entry.fixedInterval} | Date: {entry.reocurrency}
                        <Button
                            class="ml-3 inline-block gap-4"
                            on:click={() => deleteEntry(entry.id)}
                        >
                            Delete
                        </Button>
                    </div>
                {/if}
            {/each}
        </div>
    </div>
</main>
