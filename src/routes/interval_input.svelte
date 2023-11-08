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

    const dict = $page.data.options_dict
</script>

{#if fixedInterval === 'weekly'}
    <Select
        {error}
        name="fixedInterval"
        label="Day(s) of the Week"
        options={dict[fixedInterval]}
        multiple
    />
{:else if fixedInterval === 'monthly'}
    <Select
        {error}
        name="fixedInterval"
        options={dict[fixedInterval]}
        label="Day(s) of the Month"
        multiple
    />
{:else if fixedInterval === 'annual'}
    <Select
        {error}
        name="fixedInterval"
        options={dict[fixedInterval]}
        label="Month(s) of the Year"
        multiple
    />
{/if}
