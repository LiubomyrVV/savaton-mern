import { MouseEvent, RefObject } from 'react'
import { Action } from '../../../../store/Store'

export interface Valutes {
  current: string
  list: string[]
}

export interface Languages {
  current: string
  list: string[]
}

export interface Selections {
  valutes: Valutes
  languages: Languages
}

export interface States {
  isValutesActive: boolean
  isLanguagesActive: boolean
}
export interface RefsType {
  valutesRef: RefObject<HTMLDivElement>
  languagesRef: RefObject<HTMLDivElement>
}

export interface OpenMenuProps {
  event: MouseEvent<HTMLDivElement> | MouseEvent<HTMLUListElement>
  isActive: States
  setIsActive: React.Dispatch<React.SetStateAction<States>>
}

export interface ChangeSelectionProps {
  event: MouseEvent<HTMLLIElement>
  selections: Selections
  setSelections: React.Dispatch<React.SetStateAction<Selections>>
  dispatch: React.Dispatch<Action>
}
