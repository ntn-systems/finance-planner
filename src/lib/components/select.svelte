<script lang="ts">
    import { createEventDispatcher } from 'svelte'
    import { fade } from 'svelte/transition'
    import { twMerge } from 'tailwind-merge'

    const dispatch = createEventDispatcher()

    let open = false
    export let name: string | undefined = undefined
    export let selected: string | string[] | null = null
    export let options: Array<{
        label: string
        value: string
    }>
    export let multiple = false
    export let disabled = false
    export let label: string | undefined = undefined
    export let error: boolean | string | undefined = undefined

    type FnPredicate = (s: string | string[] | null) => string
    export let selected_label: string | FnPredicate | undefined = undefined

    const is_fn = (l: any): l is FnPredicate => !!l?.apply

    $: selected_label_selector = is_fn(selected_label)
        ? selected_label(selected)
        : selected_label
        ? selected_label
        : multiple && Array.isArray(selected)
        ? selected.map(k => options.find(o => o.value === k)?.label).join(', ')
        : options.find(o => o.value === selected)?.label

    let ul: HTMLUListElement | null = null

    const classes = twMerge(`
        relative w-full cursor-pointer rounded-full bg-violet-300 bg-white py-1.5
        pl-3 pr-10 text-left text-violet-900 shadow-sm ring-1
        ring-inset ring-violet-300 dark:bg-violet-600 dark:text-violet-50 dark:ring-violet-600
        ${disabled ? 'cursos-default bg-neutral-200 dark:bg-neutral-600' : ''}
        ${error && 'outline-dashed outline-red-500 dark:outline-red-400'}
        $$restProps.class sm:text-sm
        sm:leading-6
    `)

    $: if (open) {
        ul?.focus()
    }

    $: is_selected = (key: string) => {
        if (selected) {
            if (multiple && Array.isArray(selected))
                return selected.includes(key)
            else return key === selected
        } else return false
    }

    const toggle_option = (key: string) => (e: Event) => {
        e.stopPropagation()
        if (multiple) {
            if (!selected) selected = [key]
            else if (is_selected(key)) {
                const index = selected.indexOf(key)
                selected = [
                    ...selected.slice(0, index),
                    ...selected.slice(index + 1),
                ]
            } else {
                selected = [...selected, key]
            }
        } else {
            selected = key
            open = false
        }
        dispatch('change', selected)
    }
</script>

<div class="flex w-full flex-col items-start gap-0.5">
    {#if label}
        <span
            class="text-md ml-2 font-semibold capitalize text-violet-900 dark:text-violet-50"
            class:hidden={$$restProps.type === 'hidden'}
        >
            {label}
        </span>
    {/if}
    <input type="hidden" {name} value={selected} />
    <div class="relative w-full">
        <button
            type="button"
            on:click={() => {
                if (!disabled) open = !open
            }}
            class={classes}
            aria-haspopup="listbox"
            aria-expanded="true"
            aria-labelledby="listbox-label"
        >
            <span class="block truncate font-sans font-medium">
                {selected_label_selector || 'Select an item'}
            </span>
            <span
                class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
            >
                <svg
                    class="h-5 w-5 text-neutral-400 dark:text-neutral-700"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                >
                    <path
                        fill-rule="evenodd"
                        d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
                        clip-rule="evenodd"
                    />
                </svg>
            </span>
        </button>
        {#if open}
            <ul
                transition:fade={{ duration: 100 }}
                bind:this={ul}
                class="fixed z-10 mt-1 max-h-60 w-fit overflow-auto rounded-md bg-violet-200 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 duration-100 focus:outline-none dark:bg-violet-700 sm:text-sm"
                tabindex="-1"
                role="listbox"
                aria-labelledby="listbox-label"
                aria-activedescendant="listbox-option-3"
                on:blur={() => {
                    open = false
                }}
            >
                {#each options as option}
                    {@const option_selected = is_selected(option.value)}
                    <li
                        class="relative cursor-pointer select-none px-8 py-2 text-violet-900 transition duration-100 hover:bg-violet-200 dark:text-violet-50 dark:hover:bg-violet-600"
                        class:group={option_selected}
                        id={option.value}
                        role="option"
                        on:click={toggle_option(option.value)}
                        on:keydown={toggle_option(option.value)}
                        aria-selected={option_selected}
                    >
                        <span
                            class="group:font-medium block truncate font-normal"
                        >
                            {option.label}
                        </span>
                        {#if option_selected}
                            <span
                                class="text-primary absolute inset-y-0 left-0 flex items-center pl-1.5"
                            >
                                <svg
                                    class="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                        clip-rule="evenodd"
                                    />
                                </svg>
                            </span>
                        {/if}
                    </li>
                {/each}
            </ul>
        {/if}
    </div>
</div>
