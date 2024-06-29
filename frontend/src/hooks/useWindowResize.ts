import { useEffect, useState } from 'react'

interface TWindowSize {
  width: number
  height: number
}

type THook = TWindowSize

export const useWindowResize = (): THook => {
  const initSize: TWindowSize = {
    width: window.innerWidth,
    height: window.innerHeight,
  }
  const [{ width, height }, setWindowSize] = useState<TWindowSize>(initSize)

  useEffect(() => {
    const handleResize = (): void => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return { width, height }
}
