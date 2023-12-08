<script lang="ts">
    import Dialog from '$lib/components/Dialog.svelte'
    import { entries } from '$lib/store/entries'
    import {
        totalWeeklySpendings,
        totalMonthlySpendings,
        totalAnnualSpendings,
        totalSpendings,
    } from '$lib/store/display-info'
    import AddEntryDialog from './add-entry-dialog.svelte'
    import Newtab from './newtab.svelte'

    let currentTab = 'weekly'

    function handleTabChange(event: { detail: { tab: string } }) {
        currentTab = event.detail.tab
        console.log('test', currentTab)
    }

    export let data
    console.log('🚀 ~ file: +page.svelte:30 ~ data:', data)

    $: sumTotal = (originalValue: any, currentTab: string) => {
        const value = Number(originalValue)

        if (currentTab === 'weekly') {
            return $totalWeeklySpendings
        } else if (currentTab === 'monthly') {
            return $totalMonthlySpendings
        } else if (currentTab === 'annual') {
            return $totalAnnualSpendings
        }

        return originalValue
    }
</script>

<main class="pyc-8 container relative mx-auto px-2 max-sm:px-4">
    <AddEntryDialog
        on:submit={e => {
            if (e.detail) $entries = [...$entries, e.detail]
        }}
    />
    <p class="mb-4 mt-4 flex justify-center gap-4 text-white">
        Your current {currentTab} cost is ${sumTotal(
            totalSpendings,
            currentTab,
        )}
    </p>
    <p class="text-white">
        Weekly total test: {$totalWeeklySpendings}
    </p>
    <p class="text-white">
        Monthly total test: {$totalMonthlySpendings}
    </p>

    <p class="text-white">
        Annual total test: {$totalAnnualSpendings}
    </p>
    <Newtab on:currTab={handleTabChange} />

    <!-- <div class="w-1/2">
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
            {/each} -->

    <!-- </div> -->
</main>
