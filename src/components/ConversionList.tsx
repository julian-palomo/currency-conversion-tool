import type { ConversionsList } from '../App'

type ConversionListProps = {
  conversionsList: ConversionsList[]
}

export function ConversionList({ conversionsList }: ConversionListProps) {
  return (
    <div>
      <ul>
        {conversionsList.map(
          ({ id, amount, toCurrency, fromCurrency, conversionValue }) => {
            const amountNormalised = new Intl.NumberFormat(undefined, {
              style: 'currency',
              currency: fromCurrency,
            }).format(amount)

            const conversionValueNormalised = new Intl.NumberFormat(undefined, {
              style: 'currency',
              currency: toCurrency,
            }).format(conversionValue)

            return (
              <li key={id}>
                {amountNormalised} - {conversionValueNormalised}
              </li>
            )
          },
        )}
      </ul>
    </div>
  )
}
