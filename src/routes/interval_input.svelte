<script lang="ts">
    import Select from '$lib/components/select.svelte'
    import dayjs from 'dayjs'

    export let fixedInterval:
        | 'not fixed'
        | 'daily'
        | 'weekly'
        | 'monthly'
        | 'annual'
    export let error: boolean | string

    const week_days_options = Array.from(new Array(7)).map((_, i) => ({
        label: dayjs().day(i).format('dddd'),
        value: i.toString(),
    }))
    const months_days_options = Array.from(new Array(31)).map((_, i) => ({
        label: (i + 1).toString(),
        value: i.toString(),
    }))
    const annual_months_options = Array.from(new Array(12)).map((_, i) => ({
        label: dayjs().month(i).format('MMMM'),
        value: i.toString(),
    }))
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
