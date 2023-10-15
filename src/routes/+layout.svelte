<script lang="ts">
    import '../app.css'
    import CoinPile from '$lib/icons/coin-pile.svg?component'
</script>

<nav
    class="container fixed inset-x-0 top-0 z-10 mx-auto flex items-center gap-4 py-4 max-sm:px-4"
>
    <CoinPile class="h-10 w-10 fill-white sm:h-12 sm:w-12" />
    <span class="text-xl font-bold dark:text-white sm:text-3xl">
        CoinCounter
    </span>
</nav>
<div
    class="relative z-[1] min-h-screen bg-violet-50 pt-12 dark:bg-violet-950 sm:pt-20"
>
    <slot />
</div>
