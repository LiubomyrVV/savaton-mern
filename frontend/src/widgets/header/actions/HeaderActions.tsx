import { MouseEvent, useCallback, useEffect, useRef, useState } from 'react'

import { HeaderActionsContainer } from './index.styled'
import {
  changeSelection,
  defaultSelections,
  defaultStates,
  openMenu,
  Selections,
} from './utils'
import { Dropdown } from './ui/Dropdown'

const HeaderActions = () => {
  const [isActive, setIsActive] = useState(defaultStates)
  const [selections, setSelections] = useState<Selections>(defaultSelections)
  const valutesRef = useRef<HTMLDivElement | null>(null)
  const languagesRef = useRef<HTMLDivElement | null>(null)

  const openMenuHandler = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      openMenu({ event, isActive, setIsActive })
    },
    [isActive, setIsActive]
  )

  const changeSelectionHandler = useCallback(
    (event: MouseEvent<HTMLLIElement>) => {
      changeSelection({ event, selections, setSelections })
    },
    [selections, setSelections]
  )

  const handleClickOutside = useCallback((event: Event) => {
    const target = event.target as HTMLElement
    if (!target.closest('.dropdown, .languages, .valutes')) {
      if (valutesRef.current && !valutesRef.current.contains(target)) {
        setIsActive((prevState) => ({ ...prevState, isValutesActive: false }))
      }
      if (languagesRef.current && !languagesRef.current.contains(target)) {
        setIsActive((prevState) => ({ ...prevState, isLanguagesActive: false }))
      }
    }
  }, [])

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [handleClickOutside])

  return (
    <HeaderActionsContainer>
      {Dropdown(
        'valutes',
        selections.valutes.list,
        isActive.isValutesActive,
        valutesRef,
        selections.valutes.current,
        openMenuHandler,
        changeSelectionHandler
      )}
      {Dropdown(
        'languages',
        selections.languages.list,
        isActive.isLanguagesActive,
        languagesRef,
        selections.languages.current,
        openMenuHandler,
        changeSelectionHandler
      )}
    </HeaderActionsContainer>
  )
}

export default HeaderActions
