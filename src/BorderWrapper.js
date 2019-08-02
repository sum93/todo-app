import React from 'react'
import classnames from 'classnames'

const BorderWrapper = ({ children, isBusy, isDone, isEditing, ...props }) => (
  <div
    className={classnames('status-indicator', {
      'status-indicator__busy': isBusy,
      'status-indicator__done': isDone && !isBusy && !isEditing,
      'status-indicator__editing': isEditing && !isBusy
    })}
    {...props}
  >
    {children}
  </div>
)

export default BorderWrapper
