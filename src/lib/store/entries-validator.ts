import { z } from 'zod'

const ReocurrencyTypes = z.nativeEnum({
    'not fixed': 'not fixed',
    daily: 'daily',
    weekly: 'weekly',
    monthly: 'monthly',
    annual: 'annual',
})

export const annualSchema = z.string().refine(day => {
    const validDayAndMonth = /^\d{2}\/\d{2}$/
    return validDayAndMonth.test(day)
})

export type FinanceEntry = {
    id: number | string
    amount: string | number
    category?: string
    reocurrency: z.infer<typeof ReocurrencyTypes>
    fixedInterval?: string | string[]
    weeklyFee?: number
    monthlyFee?: number
    annualFee?: number

}

export const parse_formdata = (form_data: FormData) => {
    const obj = Object.fromEntries(form_data.entries())
    if (!obj) return undefined
    return obj
}

export const is_finance_entry: (
    _e: unknown,
  ) => FinanceEntry | undefined = (entry) => {
    const is_object = typeof entry === 'object';
  
    try {
      entry = parse_formdata(entry as FormData);
  
      if (!entry && !is_object) return undefined;
  
      let new_entry = entry as Record<string, unknown>;
  
      new_entry = {
        ...new_entry,
        id: new_entry?.id ?? crypto.randomUUID(),
        fixedInterval:
          (new_entry.fixedInterval as string)?.split(',')
            .map((v) => v.trim())
            .filter((v) => v)
      };
  
      new_entry.amount = Number(new_entry.amount);
  
      if (new_entry.amount === 0) return undefined;
  
      const validator = z.object({
        id: z.string().uuid(),
        amount: z.number().safe().finite(),
        category: z
          .string()
          .optional()
          .refine(
            (category) => {
              return !/^\d+$/.test(category ?? '');
            },
            { message: 'Category cannot contain only numbers' }
          ),
        reocurrency: ReocurrencyTypes,
        fixedInterval: z
          .array(z.string()).optional()
      });
  
      const validated = validator.parse(new_entry);
      console.log(`🚀 ~ validated:`, validated);
  
      return validated as FinanceEntry;
    } catch (e) {
      console.log(`🚀 ~ e:`, e);
      return undefined;
    }
  };
 