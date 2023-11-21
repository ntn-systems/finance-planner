<script lang="ts">
    import { page } from '$app/stores'
    import Button from '$lib/components/Button.svelte'
    import Dialog from '$lib/components/Dialog.svelte'
    import { entries } from '$lib/store/entries'
    import AddEntryDialog from './add-entry-dialog.svelte'
    import Newtab from './newtab.svelte'

    $: totalEarnings = $entries
        .filter(e => Number(e.amount) > 0)
        .reduce((acc, curr) => Number(curr.amount) + acc, 0)
    $: totalSpendings = $entries
        .filter(e => Number(e.amount) < 0)
        .reduce((acc, curr) => Number(curr.amount) + acc, 0)

    $: totalValue = totalEarnings + totalSpendings

    let deleteDialog: false | string = false

    function deleteEntry(entryFindId: number | string) {
        const index = $entries.findIndex(entry => entry.id === entryFindId)
        if (index !== -1) {
            $entries = [
                ...$entries.slice(0, index),
                ...$entries.slice(index + 1),
            ]
        }
    }

    export let data
    console.log('🚀 ~ file: +page.svelte:30 ~ data:', data)
</script>

<main class="pyc-8 container relative mx-auto px-2 max-sm:px-4">
    <AddEntryDialog
        on:submit={e => {
            if (e.detail) $entries = [...$entries, e.detail]
        }}
    />
    <p class="mb-4 mt-4 flex justify-center gap-4 text-white">
        You have spended ${totalSpendings} and you have earned ${totalEarnings}
        for a total of ${totalValue}
    </p>
    <Newtab />
    <div class="mx-auto mb-auto ml-auto mr-auto mt-auto flex">
        <div class="col-auto w-1/2">
            {#each $entries as entry}
                {@const value = Number(entry.amount)}
                {@const isNegative = value < 0}
                {@const interval = Array.isArray(entry.fixedInterval)
                    ? entry?.fixedInterval
                          .map(
                              i =>
                                  data.options_dict[entry.reocurrency]?.[
                                      Number(i)
                                  ]?.label,
                          )
                          .join(', ')
                    : data.options_dict[entry.reocurrency]?.[
                          Number(entry.fixedInterval)
                      ]?.label}
                {#if isNegative}
                    <div class="mt-4 text-red-400">
                        Value: {entry.amount} | Category: {entry.category ||
                            'Empty'} | Interval: {entry.reocurrency} | Date: {interval ||
                            ''}
                        <Button
                            class="ml-3 inline-block gap-4"
                            on:click={() => {
                                deleteDialog = entry.id.toString()
                            }}
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
                {@const interval = Array.isArray(entry.fixedInterval)
                    ? entry?.fixedInterval
                          .map(
                              i =>
                                  data.options_dict[entry.reocurrency]?.[
                                      Number(i)
                                  ]?.label,
                          )
                          .join(', ')
                    : data.options_dict[entry.reocurrency]?.[
                          Number(entry.fixedInterval)
                      ]?.label}
                {#if !isNegative}
                    <div class="mt-4 text-blue-400">
                        Value: {entry.amount} | Category: {entry.category ||
                            'Empty'} | Interval: {entry.reocurrency} | Date: {interval ||
                            ''}
                        <Button
                            class="ml-3 inline-block gap-4"
                            on:click={() => {
                                deleteDialog = entry.id.toString()
                            }}
                        >
                            Delete
                        </Button>
                    </div>
                {/if}
            {/each}
            <Dialog
                open={deleteDialog !== false}
                on:close={() => {
                    deleteDialog = false
                }}
                confirm_text="Delete Entry"
                on:proceed={ev => {
                    if (deleteDialog && ev.detail === true) {
                        deleteEntry(deleteDialog)
                        deleteDialog = false
                    }
                }}
            />
        </div>
    </div>
</main>
