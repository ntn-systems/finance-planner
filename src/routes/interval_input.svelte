<script lang="ts">
    import { page } from '$app/stores'
    import Select from '$lib/components/select.svelte'

    export let fixedInterval:
        | 'not fixed'
        | 'daily'
        | 'weekly'
        | 'monthly'
        | 'annual'
    export let error: boolean | string

    const { week_days_options, months_days_options, annual_months_options } =
        $page.data
</script>

{#if fixedInterval === 'weekly'}
    <Select
        {error}
        name="fixedInterval"
        label="Day(s) of the Week"
        options={week_days_options}
        multiple
    />
{:else if fixedInterval === 'monthly'}
    <Select
        {error}
        name="fixedInterval"
        label="Day(s) of the Month"
        options={months_days_options}
        multiple
    />
{:else if fixedInterval === 'annual'}
    <Select
        {error}
        name="fixedInterval"
        label="Month(s) of the Year"
        options={annual_months_options}
        multiple
    />
{/if}
