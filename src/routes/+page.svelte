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
    <Newtab on:currTab={handleTabChange} />
</main>
