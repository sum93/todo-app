import React from 'react'
import classnames from 'classnames'

import './Button.scss'

const Button = ({ label, isBusy, isDisabled, onClick }) => (
  <div
    className={classnames('button', {
      button__busy: isBusy,
      button__disabled: isDisabled
    })}
    onClick={isDisabled ? null : onClick}
  >
    <span className="button--label">{label}</span>
  </div>
)

export default Button
