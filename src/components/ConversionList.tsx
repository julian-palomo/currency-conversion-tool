import { useId } from 'react'
import { formatCurrency } from '../utils/formatCurrency'

export type Conversion = {
  id: string
  amount: number
  fromCurrency: string
  toCurrency: string
  conversionValue: number
}

type ConversionListProps = {
  conversions: Conversion[]
}

export function ConversionList({ conversions }: ConversionListProps) {
  const headingId = useId()

  return (
    <section aria-labelledby={headingId}>
      <h2 id={headingId}>Recent conversions</h2>

      <ol>
        {conversions.map(
          ({ id, amount, fromCurrency, toCurrency, conversionValue }) => (
            <li key={id}>
              {formatCurrency(amount, fromCurrency, 'code')} →{' '}
              {formatCurrency(conversionValue, toCurrency, 'code')}
            </li>
          ),
        )}
      </ol>
    </section>
  )
}
