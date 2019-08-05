import React from 'react'
import classnames from 'classnames'

import './UndoneSwitch.scss'

const UndoneSwitch = props => {
  const { isSet, toggle } = props

  return (
    <div
      className={classnames('undone-switch', { 'undone-switch__set': isSet })}
      onClick={toggle}
    >
      <span className={classnames('label', 'label__unset', { active: !isSet })}>
        All
      </span>
      <span className={classnames('label', 'label__set', { active: isSet })}>
        Undone
      </span>
    </div>
  )
}

export default UndoneSwitch
