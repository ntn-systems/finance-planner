<script lang="ts">
    import Button from '$lib/components/Button.svelte'
    import Dialog from '$lib/components/Dialog.svelte'
    import Input from '$lib/components/input.svelte'
    import Select from '$lib/components/select.svelte'
    import { is_finance_entry } from '$lib/store/entries-validator'
    import { createEventDispatcher } from 'svelte'
    import IntervalInput from './interval_input.svelte'

    const dispatch = createEventDispatcher()

    let open = false
    let error = false
    let is_expense = true
    $: console.log(`🚀 ~ error:`, error)

    let fixedInterval: 'not fixed' | 'daily' | 'weekly' | 'monthly' | 'annual' =
        'not fixed'

    const on_submit = (
        e: SubmitEvent & {
            currentTarget: HTMLFormElement
        },
    ) => {
        e.preventDefault()
        const form = e.currentTarget
        const form_data = new FormData(form)

        let entry = is_finance_entry(form_data)
        if (entry) {
            entry = {
                ...entry,
                amount: is_expense ? Number(entry.amount) * -1 : entry.amount,
            }
            dispatch('submit', entry)
        } else error = true
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
        <span class="isolate inline-flex w-full rounded-md shadow-sm">
            <button
                type="button"
                class:bg-violet-700={is_expense}
                class:text-violet-50={is_expense}
                class:bg-violet-50={!is_expense}
                class:text-violet-900={!is_expense}
                class="relative flex-1 rounded-l-md px-3 py-2 text-center text-sm font-semibold ring-1 ring-inset ring-violet-300 transition hover:bg-violet-300 hover:text-violet-950 focus:z-10"
                on:click={() => {
                    is_expense = true
                }}
            >
                Expense
            </button>
            <button
                type="button"
                class:bg-violet-700={!is_expense}
                class:text-violet-50={!is_expense}
                class:bg-violet-50={is_expense}
                class:text-violet-900={is_expense}
                class="relative -ml-px flex-1 rounded-r-md px-3 py-2 text-center text-sm font-semibold ring-1 ring-inset ring-violet-300 transition hover:bg-violet-300 hover:text-violet-950 focus:z-10"
                on:click={() => {
                    is_expense = false
                }}
            >
                Income
            </button>
        </span>
        <Input {error} name="amount" type="number" min="1" label="Amount" />
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
        <IntervalInput {fixedInterval} {error} />
        <Button type="submit" class="mt-2 w-full">Save</Button>
    </form>
</Dialog>
