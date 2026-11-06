import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

import { AmountInput } from './components/AmountInput'
import { ConversionList } from './components/ConversionList'
import { ConversionResult } from './components/ConversionResult'
import { CurrencySelect } from './components/CurrencySelect'
import { useConversion } from './hooks/useConversion'

export type ConversionsList = {
  id: string
  amount: number
  toCurrency: string
  fromCurrency: string
  conversionValue: number
}

function App() {
  const [amount, setAmount] = useState('')
  const [fromCurrency, setFromCurrency] = useState('')
  const [toCurrency, setToCurrency] = useState('')
  const [conversionsList, setConversionsList] = useState<ConversionsList[]>([])
  const { data: conversionValue } = useConversion({
    from: fromCurrency,
    to: toCurrency,
    amount: Number(amount),
  })

  const id = crypto.randomUUID()
  const CONVERSION_LIST_LIMIT = 5

  const handleAddConversion = () => {
    setConversionsList((prev) => {
      const newArray = [
        {
          id,
          amount: Number(amount),
          fromCurrency,
          toCurrency,
          conversionValue: Number(conversionValue),
        },
        ...prev,
      ]
      if (CONVERSION_LIST_LIMIT - 1 < conversionsList.length) {
        newArray.pop()
      }

      return newArray
    })
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
          <button type="button" onClick={handleAddConversion}>
            Add
          </button>

          <ConversionList conversionsList={conversionsList} />
        </div>
      </section>
    </>
  )
}

export default App
