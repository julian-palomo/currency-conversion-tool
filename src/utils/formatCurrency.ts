// Formats a value in an ISO 4217 currency, using the user's locale.
// `currencyDisplay: 'code'` gives "USD 100.00" instead of "$100.00".
export function formatCurrency(
  value: number,
  currency: string,
  currencyDisplay: Intl.NumberFormatOptions['currencyDisplay'] = 'symbol',
) {
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency,
    currencyDisplay,
  }).format(value)
}
