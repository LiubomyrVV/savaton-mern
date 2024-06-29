import React, { MouseEvent } from 'react'
import ArrowIcon from './ArrowIcon'

import { AnimatePresence, motion } from 'framer-motion'
import { defaultSettings } from '../utils'

export const Dropdown = (
  type: 'valutes' | 'languages',
  list: string[],
  isActive: boolean,
  ref: React.RefObject<HTMLDivElement>,
  current: string,
  openMenuHandler: (event: MouseEvent<HTMLDivElement>) => void,
  changeSelectionHandler: (event: MouseEvent<HTMLLIElement>) => void
) => (
  <div className={type}>
    <div
      className="overlay"
      ref={ref}
      onClick={openMenuHandler}
      data-value={current}
    ></div>
    <span>{current}</span>
    <div
      className="icon"
      style={{ transform: isActive ? 'rotate(180deg)' : 'rotate(0deg)' }}
    >
      <ArrowIcon />
    </div>
    <AnimatePresence>
      {isActive && (
        <motion.ul {...defaultSettings} className="dropdown">
          {list.map((el, idx) => (
            <li onClick={changeSelectionHandler} key={idx}>
              {el}
            </li>
          ))}
        </motion.ul>
      )}
    </AnimatePresence>
  </div>
)
