<script lang="ts">
    import Button from '$lib/components/Button.svelte'
    import Input from '$lib/components/input.svelte'
    import Select from '$lib/components/select.svelte'
    import Dialog from '$lib/components/Dialog.svelte'
    import { entries, type FinanceEntry } from '$lib/store/entries'

    let open = false

    let fixedInterval: 'not fixed' | 'daily' | 'weekly' | 'monthly' | 'annual' =
        'not fixed'

    const reocurrency_labels: Record<string, string> = {
        weekly: 'Day of the Week',
        monthly: 'Ocurring day',
        annual: 'Day of the year',
    }

    const on_submit = (
        e: SubmitEvent & {
            currentTarget: HTMLFormElement
        },
    ) => {
        const form = e.currentTarget
        const form_data = new FormData(form)
        const entry = Object.fromEntries(
            // gambi pra transformar uma pseudo array em array
            [...form_data.entries()].map(([k, v]) => [k, v.toString()]),
        ) as FinanceEntry
        $entries = [...$entries, entry]
    }
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
    <Dialog bind:open>
        <form class="flex flex-col gap-4" on:submit={on_submit}>
            <Input name="amount" type="number" label="Amount" />
            <Input name="category" label="Category" />
            <Select
                label="Reocurrency"
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
    <ul>
        {#each $entries as entry}
            <li class="dark:text-white">
                Value: {entry.amount} | Category: {entry.category} | Interval: {entry.fixedInterval}
                | Date: {entry.reocurrency}
            </li>
        {/each}
    </ul>
</main>
