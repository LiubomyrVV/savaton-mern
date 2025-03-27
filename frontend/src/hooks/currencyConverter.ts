import { useContext, useEffect, useState } from "react"
import { Store } from "../store"
import { convertCurrency } from "../utils"

export const useCurrencyConverter = (amount: number) => {
    const { state } = useContext(Store)
    const [convertedAmount, setConvertedAmount] = useState<number | null>(null)
  
    useEffect(() => {
      convertCurrency({ amount, from: 'USD', to: state.preferences.valute }).then(setConvertedAmount)
    }, [amount, state.preferences.valute])
  
    return Math.round(convertedAmount ? convertedAmount : 0)
  }
  