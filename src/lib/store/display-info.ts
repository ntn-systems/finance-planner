import { derived} from 'svelte/store'
import { entries, weeklyEntries, monthlyEntries, annualEntries } from '$lib/store/entries'

export const totalEarnings = derived(entries, ($entries) =>
  $entries
    .filter((e) => Number(e.amount) > 0)
    .reduce((acc, curr) => Number(curr.amount) + acc, 0)
);

export const totalSpendings = derived(entries, ($entries) =>
  $entries
    .filter((e) => Number(e.amount) < 0)
    .reduce((acc, curr) => Number(curr.amount) + acc, 0)
);

export const totalValue = derived([totalEarnings, totalSpendings], ([$totalEarnings, $totalSpendings]) =>
  $totalEarnings + $totalSpendings
);

export const allEntries = derived([weeklyEntries, monthlyEntries, annualEntries], ([$weeklyEntries, $monthlyEntries, $annualEntries]) =>
  [...$weeklyEntries, ...$monthlyEntries, ...$annualEntries]
);

export const totalAnnualSpendings = derived(allEntries, ($allEntries) =>
  $allEntries
    .filter((e) => Number(e.annualFee) < 0)
    .reduce((acc, curr) => Number(curr.annualFee) + acc, 0)
);

export const totalMonthlySpendings = derived(allEntries, ($allEntries) =>
  $allEntries
    .filter((e) => Number(e.monthlyFee) < 0)
    .reduce((acc, curr) => Number(curr.monthlyFee) + acc, 0)
);

export const totalWeeklySpendings = derived(allEntries, ($allEntries) =>
  $allEntries
    .filter((e) => Number(e.weeklyFee) < 0)
    .reduce((acc, curr) => Number(curr.weeklyFee) + acc, 0)
);
