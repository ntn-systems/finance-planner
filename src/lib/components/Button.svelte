<script lang="ts">
    import { createEventDispatcher } from 'svelte'
    import { twMerge } from 'tailwind-merge'

    const dispatch = createEventDispatcher()

    export let href: string | undefined = undefined

    const classes = twMerge(
        'relative flex w-fit items-center justify-center  gap-2 rounded-full border-2 border-current bg-violet-50 px-3 py-2 text-center text-lg font-bold capitalize transition duration-200 ease-in dark:bg-violet-950',
        'disabled:cursor-default disabled:border-neutral-600 disabled:bg-neutral-600 disabled:text-neutral-50 disabled:hover:border-neutral-600 disabled:hover:bg-neutral-600 disabled:hover:text-white',
        'after:absolute after:-bottom-1.5 after:-right-1.5 after:left-1.5 after:top-1.5 after:z-[-1] after:h-full after:w-full after:rounded-full after:border-0 after:bg-current',
        'after:transition-all after:duration-100 after:ease-in hover:after:-bottom-[9px] hover:after:-right-[9px] hover:after:left-[9px] hover:after:top-[9px]',
        'text-violet-950 dark:text-violet-50',
        $$restProps.class,
    )

    const click = () => {
        dispatch('click')
    }
</script>

{#if href}
    <a {...$$restProps} class={classes} {href}>
        <slot />
    </a>
{:else}
    <button {...$$restProps} class={classes} on:click={click}>
        <slot />
    </button>
{/if}
