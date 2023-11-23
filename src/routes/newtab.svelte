<script lang="ts">
    import { page } from '$app/stores'
    import Button from '$lib/components/Button.svelte'
    import Dialog from '$lib/components/Dialog.svelte'
    import { entries } from '$lib/store/entries'
    import { createEventDispatcher } from 'svelte'
    let selectedTab = 'weekly'

    const dispatch = createEventDispatcher()

    $: {
        console.log('🚀 ~ file: newtab.svelte:3 ~ selectedTab:', selectedTab)
        dispatch('currTab', { tab: selectedTab })
    }

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
    $: displayValue = (originalValue: any, selectedTab: string) => {
        const value = Number(originalValue)
        // console.log('🚀 ~ file: newtab.svelte:22 ~ value:', value)

        if (selectedTab === 'weekly') {
            return (value / 4).toFixed(2)
        } else if (selectedTab === 'monthly') {
            return value.toFixed(2)
        } else if (selectedTab === 'annual') {
            return (value * 12).toFixed(2)
        }

        return originalValue
    }

    export const currentTab = selectedTab
</script>

<div>
    <div class="sm:hidden">
        <label for="tabs" class="sr-only">Select a tab</label>
        <select
            id="tabs"
            name="tabs"
            class="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
            bind:value={selectedTab}
        >
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="annual">Annual</option>
        </select>
    </div>
    <div class="hidden sm:block">
        <div class="aling-center border-b border-gray-200">
            <nav class="-mb-px flex" aria-label="Tabs">
                <button
                    on:click={() => {
                        selectedTab = 'weekly'
                    }}
                    class="w-1/3 border-b-2 border-transparent px-1 py-4 text-center text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                >
                    Weekly
                </button>
                <button
                    on:click={() => {
                        selectedTab = 'monthly'
                    }}
                    class="w-1/3 border-b-2 border-transparent px-1 py-4 text-center text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                >
                    Monthly
                </button>
                <button
                    on:click={() => {
                        selectedTab = 'annual'
                    }}
                    class="w-1/3 border-b-2 border-transparent px-1 py-4 text-center text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                >
                    Annual
                </button>
            </nav>
        </div>
    </div>
    <div class="mx-auto mb-auto ml-auto mr-auto mt-auto flex">
        <div class="col-auto">
            {#each $entries as entry}
                {@const value = Number(entry.amount)}
                {@const isNegative = value < 0}
                {@const interval = Array.isArray(entry.fixedInterval)
                    ? entry?.fixedInterval
                          .map(
                              i =>
                                  $page.data.options_dict[entry.reocurrency]?.[
                                      Number(i)
                                  ]?.label,
                          )
                          .join(', ')
                    : $page.data.options_dict[entry.reocurrency]?.[
                          Number(entry.fixedInterval)
                      ]?.label}
                {#if isNegative}
                    <div class="mt-4 text-red-400">
                        Value: {displayValue(entry.amount, selectedTab)} | Category:
                        {entry.category || 'Empty'} | Interval: {entry.reocurrency}
                        | Date: {interval || ''}
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
