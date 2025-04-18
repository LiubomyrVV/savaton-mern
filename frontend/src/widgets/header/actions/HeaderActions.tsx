import React, {
  MouseEvent,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { HeaderActionsContainer } from './index.styled'
import {
  changeSelection,
  defaultSelections,
  defaultStates,
  generateDynamicKey,
  openMenu,
  RefsType,
  Selections,
  States,
} from './utils'
import { Dropdown } from './ui/Dropdown'
import { Store } from '../../../store'

const dropdownList = ['valutes', 'languages']

const HeaderActions = () => {
  const { dispatch } = useContext(Store);
  const [isActive, setIsActive] = useState<States>(defaultStates)
  const [selections, setSelections] = useState<Selections>(defaultSelections)
  const refs = {
    valutesRef: useRef<HTMLDivElement>(null),
    languagesRef: useRef<HTMLDivElement>(null),
  }

  const openMenuHandler = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      openMenu({ event, isActive, setIsActive })
    },
    [isActive, setIsActive]
  )

  const changeSelectionHandler = useCallback(
    (event: MouseEvent<HTMLLIElement>) => {
      changeSelection({ event, selections, setSelections, dispatch })
    },
    [selections, setSelections, dispatch]
  )

  const handleClickOutside = useCallback((event: Event) => {
    const { valutesRef, languagesRef } = refs
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
      {dropdownList.map((name: string, idx: number) =>
        <div key={idx}>
          {Dropdown(
          name,
          selections[name as keyof Selections].list,
          isActive[generateDynamicKey(name) as keyof States],
          refs[`${name}Ref` as keyof RefsType],
          selections[name as keyof Selections].current,
          openMenuHandler,
          changeSelectionHandler
        )}
        </div>
      )}
    </HeaderActionsContainer>
  )
}

export default HeaderActions
