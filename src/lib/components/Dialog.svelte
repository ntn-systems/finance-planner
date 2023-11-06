<script lang="ts">
    import { createEventDispatcher, onMount } from 'svelte'
    import { twMerge } from 'tailwind-merge'

    const dispatch = createEventDispatcher()

    export let open = false
    export let confirm_text: string | null = null
    export let undialog = false

    const proceed = (res: boolean | null) => {
        dispatch('proceed', res)
    }
    const close = () => dispatch('close')
    let dialog: HTMLDialogElement

    $: if (dialog) {
        if (open) {
            dialog.showModal()
        } else {
            dialog.close()
        }
    }

    onMount(() => {
        dialog.addEventListener('click', function (event) {
            let rect = dialog.getBoundingClientRect()
            let is_in_dialog =
                rect.top <= event.clientY &&
                event.clientY <= rect.top + rect.height &&
                rect.left <= event.clientX &&
                event.clientX <= rect.left + rect.width
            if (!is_in_dialog) {
                open = false
                close()
                proceed(null)
            }
        })
    })

    const classes = twMerge(
        'rounded-xl bg-violet-100 bg-white p-4 backdrop:bg-black backdrop:bg-opacity-40 dark:bg-violet-900 dark:ring-2 dark:ring-violet-700 dark:backdrop:bg-opacity-50',
        'dark:text-white',
        $$restProps.class,
    )
</script>

{#if undialog}
    <slot />
{:else}
    <dialog bind:this={dialog} class={classes}>
        {#if confirm_text}
            <h4 class="mb-2 text-lg font-medium">Are you sure?</h4>
            <p class="mb-4 max-w-sm">{confirm_text}</p>
            <div class="flex justify-end gap-2">
                <button
                    class="rounded-lg bg-neutral-200 px-4 py-2 text-neutral-800 hover:bg-neutral-300"
                    on:click={() => {
                        open = false
                        proceed(false)
                    }}
                >
                    Cancel
                </button>
                <button
                    class="bg-primary hover:bg-dark rounded-lg px-4 py-2 text-white"
                    on:click={() => {
                        open = false
                        proceed(true)
                    }}
                >
                    Confirm
                </button>
            </div>
        {:else}
            <slot />
        {/if}
    </dialog>
{/if}
