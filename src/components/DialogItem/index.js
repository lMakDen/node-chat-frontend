import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import format from 'date-fns/format'
import isToday from 'date-fns/isToday'
import { IconReaded, Avatar } from '../'


const getMessageTime = createdAt => {
  if(isToday(createdAt)){
    return format(createdAt, 'HH:mm')
  }
  return format(createdAt, 'dd.MM.yyyy')
}

const DialogItem = ({_id, user, created_at, text, unreaded, isMe, isReaded, currentDialogId, onSelect }) => {
  return <div onClick={() => onSelect(_id)} className={classNames('dialogs__item', {
    'dialogs__item--online': user.isOnline,
    'dialogs__item--selected': currentDialogId === _id
  })}>
    <div className="dialogs__item-avatar">
      <Avatar user={user} />
    </div>
    <div className="dialogs__item-info">
      <div className="dialogs__item-info-top">
        <b>{user.fullname}</b>
        <span>
          {getMessageTime(new Date(created_at))}
        </span>
      </div>
      <div className="dialogs__item-info-bottom">
        <p>
          {text}
        </p>
        {unreaded && <div className="dialogs__item-info-bottom-count">
          {unreaded > 9 ? '+9' : unreaded}
        </div>}
        {isMe && <IconReaded isMe={true} isReaded={true} />}
      </div>
    </div>
  </div>
}

DialogItem.propTypes = {
  className: PropTypes.string
}

export default DialogItem
