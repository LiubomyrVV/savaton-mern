import { MouseEvent } from 'react'

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

export interface OpenMenuProps {
  event: MouseEvent<HTMLDivElement> | MouseEvent<HTMLUListElement>
  isActive: States
  setIsActive: React.Dispatch<React.SetStateAction<States>>
}

export interface ChangeSelectionProps {
  event: MouseEvent<HTMLLIElement>
  selections: Selections
  setSelections: React.Dispatch<React.SetStateAction<Selections>>
}
