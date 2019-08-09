import React from 'react'
import classnames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle as regularCheckCircle } from '@fortawesome/free-regular-svg-icons'
import {
  faTrashAlt,
  faCheckCircle as solidCheckCircle
} from '@fortawesome/free-solid-svg-icons'

import './TodoMenu.scss'

const TodoMenu = ({
  isCompleted,
  remove,
  shoudlBeVisible,
  toggleCompleteness
}) => (
  <div
    className={classnames('todo-menu', {
      'todo-menu__visible': shoudlBeVisible
    })}
  >
    <FontAwesomeIcon
      icon={isCompleted ? solidCheckCircle : regularCheckCircle}
      size="lg"
      onClick={toggleCompleteness}
    />
    <FontAwesomeIcon icon={faTrashAlt} size="lg" onClick={remove} />
  </div>
)

export default TodoMenu
