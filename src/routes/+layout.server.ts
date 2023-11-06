import dayjs from 'dayjs'
import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = () => {
    const week_days_options = Array.from(new Array(7)).map((_, i) => ({
        label: dayjs().day(i).format('dddd'),
        value: i.toString(),
    }))
    const months_days_options = Array.from(new Array(31)).map((_, i) => ({
        label: (i + 1).toString(),
        value: (i + 1).toString(),
    }))
    const annual_months_options = Array.from(new Array(12)).map((_, i) => ({
        label: dayjs().month(i).format('MMMM'),
        value: i.toString(),
    }))

    return {
        week_days_options,
        months_days_options,
        annual_months_options,
    }
}
