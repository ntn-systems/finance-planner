<script lang="ts">
    import MaskInput from 'svelte-input-mask/MaskInput.svelte'
    import { twMerge } from 'tailwind-merge'
    import { keys } from 'ramda'

    type MaskOptions = Partial<{
        reformat: string
        mask_string: string
        mask_char: string
        mask: string
        mask_format: {
            str?: string
            regexp?: RegExp
            char?: string
        }[]
        always_show_mask: boolean
        show_mask: boolean
    }>

    export let name: string
    export let label: string | undefined = undefined

    export let value = ''
    export let error: boolean | string | undefined = undefined
    export let default_value: string | undefined = undefined

    export let mask: MaskOptions | undefined = undefined

    $: is_using_mask = !!keys(mask ?? {}).length

    $: merged_classes = twMerge(
        'min-w-[198px] rounded-full px-3 py-1.5 font-sans',
        'text-violet-900 dark:text-violet-50',
        'bg-violet-300 outline-2 focus:outline-2 dark:bg-violet-600',
        'focus:outline-violet-500 disabled:border-2 disabled:text-neutral-500 dark:focus:outline-violet-400',
        'dark:[color-scheme:dark]',
        error && 'outline-dashed outline-red-500 dark:outline-red-400',
        $$restProps.type === 'number' && 'text-right',
        $$restProps.class,
    )
</script>

<div class={`flex w-full flex-col items-start gap-0.5 ${$$restProps.class}`}>
    {#if label}
        <label
            for={name}
            class="text-md ml-2 font-semibold capitalize text-violet-900 dark:text-violet-50"
            class:hidden={$$restProps.type === 'hidden'}
        >
            {label}
        </label>
    {/if}
    {#if is_using_mask && mask}
        <MaskInput
            {...$$restProps}
            id={name}
            {name}
            class={merged_classes}
            bind:value
            defaultValue={default_value ?? $$restProps.placeholder}
            reformat={mask.reformat}
            maskString={mask.mask_string}
            maskChar={mask.mask_char ?? '_'}
            mask={mask.mask}
            maskFormat={mask.mask_format}
            alwaysShowMask={mask.always_show_mask}
            showMask={mask.show_mask}
        />
    {:else}
        <input {...$$restProps} {name} class={merged_classes} bind:value />
    {/if}
    {#if typeof error === 'string'}
        <span class="ml-2 text-sm text-red-500 dark:text-red-400">
            {error}
        </span>
    {/if}
</div>
