export const defaultStates = {
  isValutesActive: false,
  isLanguagesActive: false,
}

export const defaultSelections = {
  valutes: {
    current: 'USD',
    list: ['EUR', 'GBP'],
  },
  languages: {
    current: 'English',
    list: ['Polish', 'Ukrainian'],
  },
}

export const transitionDefault = { duration: 0.2 }

export const defaultSettings = {
  initial: { opacity: 0, y: -10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { transitionDefault },
}
