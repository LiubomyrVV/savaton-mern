import { MouseEvent, useCallback, useEffect, useRef, useState } from 'react'
import ArrowIcon from './ArrowIcon'
import { HeaderActionsContainer } from './index.styled'
import {
  changeSelection,
  defaultSelections,
  defaultStates,
  openMenu,
  Selections,
  transitionDefault,
} from './utils'
import { motion } from 'framer-motion'

const HeaderActions = () => {
  const [isActive, setIsActive] = useState(defaultStates)
  const { isValutesActive, isLanguagesActive } = isActive

  const valutesRef = useRef<HTMLDivElement | null>(null)
  const languagesRef = useRef<HTMLDivElement | null>(null)

  const [selections, setSelections] = useState<Selections>(defaultSelections)
  const { valutes, languages } = selections

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

  const handleClickOutside = (event: Event) => {
    const target = event.target as HTMLElement | null
    if (!target) return

    const parentElement = target.parentElement
    if (!parentElement) return

    const className = parentElement.className

    if (
      className === 'dropdown' ||
      className === 'languages' ||
      className === 'valutes'
    )
      return
    if (
      valutesRef.current &&
      !valutesRef.current.contains(event.target as Node)
    ) {
      setIsActive((prevState) => ({ ...prevState, isValutesActive: false }))
    }
    if (
      languagesRef.current &&
      !languagesRef.current.contains(event.target as Node)
    ) {
      setIsActive((prevState) => ({ ...prevState, isLanguagesActive: false }))
    }
  }

  useEffect(() => {
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      // Unbind the event listener on cleanup
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])
  return (
    <HeaderActionsContainer>
      <div className="valutes">
        <div
          className="overlay"
          ref={valutesRef}
          onClick={openMenuHandler}
          data-value={`${valutes.current}`}
        ></div>
        <span>{valutes.current}</span>
        <div
          className="icon"
          style={{
            transform: isValutesActive ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        >
          <ArrowIcon />
        </div>

        <motion.ul
          className="dropdown"
          initial={{ opacity: 0, y: -10 }}
          animate={{
            opacity: isValutesActive ? 1 : 0,
            y: isValutesActive ? 0 : -10,
          }}
          transition={transitionDefault}
        >
          {valutes.list.map((el, idx) => {
            return (
              <li onClick={changeSelectionHandler} key={idx}>
                {el}
              </li>
            )
          })}
        </motion.ul>
      </div>
      <div className="languages">
        <div
          className="overlay"
          ref={languagesRef}
          onClick={openMenuHandler}
          data-value={`${languages.current}`}
        ></div>
        <span>{languages.current}</span>
        <div
          className="icon"
          style={{
            transform: isLanguagesActive ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        >
          <ArrowIcon />
        </div>

        <motion.ul
          className="dropdown"
          initial={{ opacity: 0, y: -10 }}
          animate={{
            opacity: isLanguagesActive ? 1 : 0,
            y: isLanguagesActive ? 0 : -10,
          }}
          transition={transitionDefault}
        >
          {languages.list.map((el, idx) => {
            return (
              <li onClick={changeSelectionHandler} key={idx}>
                {el}
              </li>
            )
          })}
        </motion.ul>
      </div>
    </HeaderActionsContainer>
  )
}

export default HeaderActions
