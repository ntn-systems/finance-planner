<script lang="ts">
</script>

<div>
    <div class="sm:hidden">
        <label for="tabs" class="sr-only">Select a tab</label>
        <!-- Use an "onChange" listener to redirect the user to the selected tab URL. -->
        <select
            id="tabs"
            name="tabs"
            class="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
        >
            <option>Weekly</option>
            <option selected>Monthly</option>
            <option>Annual</option>
        </select>
    </div>
    <div class="hidden sm:block">
        <div class="aling-center border-b border-gray-200">
            <nav class="-mb-px flex" aria-label="Tabs">
                <a
                    href="#"
                    class="w-1/3 border-b-2 border-transparent px-1 py-4 text-center text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                >
                    Weekly
                </a>
                <a
                    href="#"
                    class="w-1/3 border-b-2 border-transparent px-1 py-4 text-center text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                >
                    Monthly
                </a>
                <a
                    href="#"
                    class="w-1/3 border-b-2 border-transparent px-1 py-4 text-center text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                >
                    Annual
                </a>
            </nav>
        </div>
    </div>
</div>
