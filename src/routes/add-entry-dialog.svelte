<script lang="ts">
    import Button from '$lib/components/Button.svelte'
    import Dialog from '$lib/components/Dialog.svelte'
    import Input from '$lib/components/input.svelte'
    import Select from '$lib/components/select.svelte'
    import { is_finance_entry } from '$lib/store/entries-validator'
    import { createEventDispatcher } from 'svelte'

    const dispatch = createEventDispatcher()

    let open = false
    let error = false
    $: console.log(`🚀 ~ error:`, error)

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
        e.preventDefault()
        const form = e.currentTarget
        const form_data = new FormData(form)

        const entry = is_finance_entry(form_data)
        console.log(`🚀 ~ entry:`, entry)
        dispatch('submit', entry)
        if (!entry) error = true
        form.reset()
    }
</script>

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
        <Input {error} name="amount" type="number" label="Amount" />
        <Input {error} name="category" label="Category" />
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
                name="fixedInterval"
                label={reocurrency_labels[fixedInterval]}
            />
        {/if}
        <Button type="submit" class="mt-2 w-full">Save</Button>
    </form>
</Dialog>
