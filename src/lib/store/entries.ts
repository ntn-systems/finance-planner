import { browser } from '$app/environment'
import { derived,writable } from 'svelte/store'
import type { FinanceEntry } from './entries-validator'

const initial_state = () => {
    if (browser) {
        const previous_state = localStorage['finance-planner-state']
        if (previous_state) return JSON.parse(previous_state)
    }
    return []
}

export const entries = writable<FinanceEntry[]>(initial_state())

export const weeklyEntries = derived(entries, ($entries) => 
    $entries.filter((entry) => entry.reocurrency === 'weekly').map((entry) => {
        const amount = entry.amount as number;

        return {
            ...entry,
            WeeklyFee: amount,
            MonthlyFee: amount * 4,
            AnnualFee: amount * 48,
        };
    })
);

entries.subscribe(state => {
    if (browser) {
        localStorage['finance-planner-state'] = JSON.stringify(state)
    }
})
entries.subscribe(console.log)

export type { FinanceEntry }
