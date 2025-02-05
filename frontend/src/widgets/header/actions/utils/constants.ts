export const defaultStates = {
  isValutesActive: false,
  isLanguagesActive: false,
}

export const defaultSelections = {
  valutes: {
    current: localStorage.getItem('currentValute')
    ? JSON.parse(localStorage.getItem('currentValute')!)
    : 'USD',
    list: localStorage.getItem('currentValuteList')
    ? JSON.parse(localStorage.getItem('currentValuteList')!)
    : ['EUR', 'GBP'],
  },
  languages: {
    current: localStorage.getItem('currentLanguage')
    ? JSON.parse(localStorage.getItem('currentLanguage')!)
    : 'English',
    list: localStorage.getItem('currentLanguageList')
    ? JSON.parse(localStorage.getItem('currentLanguageList')!)
    : ['Polish', 'Ukrainian'],
  },
}

export const transitionDefault = { duration: 0.2 }

export const defaultSettings = {
  initial: { opacity: 0, y: -10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { transitionDefault },
}
