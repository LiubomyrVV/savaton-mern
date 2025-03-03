import { ChangeSelectionProps, OpenMenuProps } from './types'
import { defaultStates } from './constants'

export const changeSelection = ({
  event,
  selections,
  setSelections,
  dispatch
}: ChangeSelectionProps) => {
  

  const currentValue = event.currentTarget.textContent || ''
  
  const type =
    event.currentTarget.parentElement?.parentElement?.className === 'valutes'
      ? 'valutes'
      : 'languages'
  if (currentValue === selections[type].current) return

  const modifiedList = selections[type].list.map((el) =>
    el === currentValue ? selections[type].current : el
  )
  setSelections({
    ...selections,
    [type]: {
      current: currentValue,
      list: modifiedList,
    },
  })
  if (type === 'languages') {
    dispatch({ type: 'SET_CURRENT_LANGUAGE', payload: currentValue })
    localStorage.setItem('currentLanguage', JSON.stringify(currentValue))
    dispatch({ type: 'SET_CURRENT_LANGUAGE_LIST', payload: modifiedList })
    localStorage.setItem('currentLanguageList', JSON.stringify(modifiedList))
  } else {
    dispatch({ type: 'SET_CURRENT_VALUTE', payload: currentValue })
    localStorage.setItem('currentValute', JSON.stringify(currentValue))
    dispatch({ type: 'SET_CURRENT_VALUTE_LIST', payload: modifiedList })
    localStorage.setItem('currentValuteList', JSON.stringify(modifiedList))
  }
}


export const openMenu = ({ event, isActive, setIsActive }: OpenMenuProps) => {
  const target = event.target as HTMLElement
  const type =
    target.parentElement?.className === 'valutes'
      ? 'isValutesActive'
      : 'isLanguagesActive'

  setIsActive({
    ...defaultStates,
    [type]: !isActive[type],
  })
}

export const generateDynamicKey = (name: string) => {
  return `is${
    `${name[0].toUpperCase()}` +
    Array.from(name.slice(1))
      .map((el) => el)
      .join('')
  }Active`
}

