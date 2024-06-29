import { ChangeSelectionProps, OpenMenuProps, Selections } from './types'
import { defaultStates } from './constants'

export const changeSelection = ({
  event,
  selections,
  setSelections,
}: ChangeSelectionProps) => {
  const target = event.target as HTMLElement
  const parent = target.parentElement?.parentElement as HTMLElement
  if (!parent) return

  const type: keyof Selections =
    parent.className === 'valutes' ? 'valutes' : 'languages'

  const currentValue = event.currentTarget.textContent || ''
  const { list, current } = selections[type]

  if (currentValue === current) return

  const modifiedList = list
  let modifiedCurrent = current

  // prettier-ignore
  modifiedList[list.findIndex((el) => el === currentValue)] = current
  modifiedCurrent = currentValue

  setSelections({
    ...selections,
    [type]: {
      current: modifiedCurrent,
      list: modifiedList,
    },
  })
}

export const openMenu = ({
  event,
  isActive,
  setIsActive,
}: OpenMenuProps): void => {
  const target = event.target as HTMLElement
  const parent = target.parentElement as HTMLElement

  if (!parent) return
  // prettier-ignore
  const type = parent.className === 'valutes' ? 'isValutesActive' :  'isLanguagesActive'

  if (isActive[type]) setIsActive({ ...defaultStates })
  else
    setIsActive({
      ...defaultStates,
      [type]: true,
    })
}
