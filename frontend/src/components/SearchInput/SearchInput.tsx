import { useState } from 'react'
import { SearchContainer } from './index.styled'
const defaultValues = {
  icon: 'translateX(0)',
  placeholder: {
    top: '20px',
    left: '24px',
    zIndex: '-1',
    fontSize: '12px',
    padding: '0px',
  },
}

function SearchInput() {
  const [styles, setStyles] = useState(defaultValues)
  const { icon, placeholder } = styles

  const changeStyles = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.type === 'focus') {
      setStyles({
        ...styles,
        icon: 'translateX(38px)',
        placeholder: {
          top: '-3px',
          left: '12px',
          zIndex: '1',
          fontSize: '10px',
          padding: '4px 18px 0px',
        },
      })
    } else if (e.type === 'blur' && !e.target.value) {
      setStyles(defaultValues)
    }
  }

  return (
    <SearchContainer>
      <input
        type="text"
        name="search"
        onFocus={changeStyles}
        onBlur={changeStyles}
      />
      <i className="bi bi-search" style={{ transform: icon }}></i>
      <div className="placeholder" style={placeholder}>
        Search products
      </div>
    </SearchContainer>
  )
}

export default SearchInput
