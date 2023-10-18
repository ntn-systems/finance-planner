<script lang="ts">
    import Button from '$lib/components/Button.svelte'
    import Input from '$lib/components/input.svelte'
    import Select from '$lib/components/select.svelte'
    import Dialog from '$lib/components/Dialog.svelte'
    import { entries, type FinanceEntry } from '$lib/store/entries'
    import { z } from 'zod'

    let open = false

    $: totalEarnings = $entries
        .filter(e => Number(e.amount) > 0)
        .reduce((acc, curr) => Number(curr.amount) + acc, 0)
    $: totalSpendings = $entries
        .filter(e => Number(e.amount) < 0)
        .reduce((acc, curr) => Number(curr.amount) + acc, 0)

    // const [negative, positive] = $entries.reduce(
    //     (acc, curr) => {
    //         const value = Number(curr.amount)
    //         if (value < 0) {
    //             return [acc[0] + value, acc[1]]
    //         } else return [acc[0], acc[1] + value]
    //     },
    //     [0, 0],
    // )
    // const [minus, plus] = $entries.reduce(
    //     (a, c) =>
    //         Number(c.amount) < 0
    //             ? [a[0] + Number(c.amount), a[1]]
    //             : [a[0], a[1] + Number(c.amount)],
    //     [0, 0],
    // )

    $: totalValue = totalEarnings + totalSpendings

    let fixedInterval: 'not fixed' | 'daily' | 'weekly' | 'monthly' | 'annual' =
        'not fixed'

    const reocurrency_labels: Record<string, string> = {
        weekly: 'Day of the Week',
        monthly: 'Ocurring day',
        annual: 'Day of the year',
    }

    const categorySchema = z.string().refine(
        category => {
            return !/^\d+$/.test(category)
        },
        { message: 'Category cannot contain only numbers' },
    )

    const testValidCategory = 'Car123'
    const testInvalidCategory = '12345'

    const on_submit = (
        e: SubmitEvent & {
            currentTarget: HTMLFormElement
        },
    ) => {
        e.preventDefault()
        const form = e.currentTarget
        const form_data = new FormData(form)
        console.log('🚀 ~ file: +page.svelte:26 ~ form_data:', form_data)
        const entry = {
            id: crypto.randomUUID(),
            ...Object.fromEntries(
                [...form_data.entries()].map(([k, v]) => [k, v.toString()]),
            ),
        } as FinanceEntry

        $entries = [...$entries, entry]
    }

    function deleteEntry(entryFindId: number | string) {
        const index = $entries.findIndex(entry => entry.id === entryFindId)
        if (index !== -1) {
            $entries = [
                ...$entries.slice(0, index),
                ...$entries.slice(index + 1),
            ]
        }
    }

    console.log(totalEarnings)
    console.log(totalSpendings)
</script>

<main class="container relative mx-auto py-8 max-sm:px-4">
    <Button
        variant="secondary"
        on:click={() => {
            open = true
        }}
    >
        Add entry
    </Button>
    <p class="mb-4 mt-4 flex justify-center gap-4 text-white">
        You have spended ${totalSpendings} and you have earned ${totalEarnings}
        for a total of ${totalValue}
    </p>
    <Dialog bind:open>
        <form class="flex flex-col gap-4" on:submit={on_submit}>
            <Input name="amount" type="number" label="Amount" />
            <Input name="category" label="Category" />
            <Select
                label="Reocurrency"
                name="reocurrency"
                options={[
                    {
                        label: 'Not Fixed',
                        value: 'not fixed',
                    },
                    {
                        label: 'Daily',
                        value: 'daily',
                    },
                    {
                        label: 'Weekly',
                        value: 'weekly',
                    },
                    {
                        label: 'Monthly',
                        value: 'monthly',
                    },
                    {
                        label: 'Annual',
                        value: 'annual',
                    },
                ]}
                bind:selected={fixedInterval}
            />
            {#if reocurrency_labels[fixedInterval]}
                <Input
                    name="ocurrency"
                    label={reocurrency_labels[fixedInterval]}
                />
            {/if}
            <Button type="submit" class="mt-2 w-full">Save</Button>
        </form>
    </Dialog>
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
