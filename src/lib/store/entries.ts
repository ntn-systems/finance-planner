import { browser } from '$app/environment'
import { writable } from 'svelte/store'

export type FinanceEntry = {

    id: number | string
    amount: string
    category?: string
    fixedInterval: 'not fixed' | 'daily' | 'weekly' | 'monthly' | 'annual'
    reocurrency?: string
}

const initial_state = () => {
    if (browser) {
        const previous_state = localStorage['finance-planner-state']
        if (previous_state) return JSON.parse(previous_state)
    }
    return []
}

export const entries = writable<FinanceEntry[]>(initial_state())

entries.subscribe(state => {
    if (browser) {
        localStorage['finance-planner-state'] = JSON.stringify(state)
    }
})
entries.subscribe(console.log)