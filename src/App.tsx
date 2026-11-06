import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

import { AmountInput } from './components/AmountInput'
import { type Conversion, ConversionList } from './components/ConversionList'
import { ConversionResult } from './components/ConversionResult'
import { CurrencySelect } from './components/CurrencySelect'
import { useConversion } from './hooks/useConversion'

// How many recent conversions to show
const RECENT_CONVERSIONS_LIMIT = 5

function App() {
  const [amount, setAmount] = useState('')
  const [fromCurrency, setFromCurrency] = useState('')
  const [toCurrency, setToCurrency] = useState('')
  const [recentConversions, setRecentConversions] = useState<Conversion[]>([])
  const { data: conversionValue } = useConversion({
    from: fromCurrency,
    to: toCurrency,
    amount: Number(amount),
  })

  // Only defined once both currencies and a valid amount give a result
  const canAddConversion = conversionValue !== undefined

  const handleAddConversion = () => {
    if (conversionValue === undefined) return

    const conversion: Conversion = {
      id: crypto.randomUUID(),
      amount: Number(amount),
      fromCurrency,
      toCurrency,
      conversionValue,
    }
    // Keep every conversion, newest first
    setRecentConversions((prev) => [conversion, ...prev])
  }

  return (
    <>
      <section>
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Currency Conversion Tool</h1>
        </div>
      </section>

      <section className="converter">
        <div className="converter-row">
          <AmountInput value={amount} onChange={setAmount} />
          <CurrencySelect
            label="From"
            value={fromCurrency}
            onChange={setFromCurrency}
          />
        </div>
        <div className="converter-row">
          <ConversionResult
            from={fromCurrency}
            to={toCurrency}
            amount={Number(amount)}
          />
          <CurrencySelect
            label="To"
            value={toCurrency}
            onChange={setToCurrency}
          />
        </div>
        <div className="converter-row">
          <button
            type="button"
            onClick={handleAddConversion}
            disabled={!canAddConversion}
          >
            Add to recent conversions
          </button>
          {recentConversions.length > 0 && (
            <ConversionList
              conversions={recentConversions.slice(0, RECENT_CONVERSIONS_LIMIT)}
            />
          )}
        </div>
      </section>
    </>
  )
}

export default App
