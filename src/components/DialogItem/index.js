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

const DialogItem = ({_id, user, created_at, text, unreaded, isMe, isReaded, currentDialogId, onSelect, lastMessage }) => {
  debugger
  return <div onClick={() => onSelect(_id)} className={classNames('dialogs__item', {
    'dialogs__item--online': lastMessage.user.isOnline,
    'dialogs__item--selected': currentDialogId === _id
  })}>
    <div className="dialogs__item-avatar">
      <Avatar user={lastMessage.user} />
    </div>
    <div className="dialogs__item-info">
      <div className="dialogs__item-info-top">
        <b>{lastMessage.user.fullName}</b>
        {/*<span>*/}
        {/*  {getMessageTime(lastMessage.createdAt)}*/}
        {/*</span>*/}
      </div>
      <div className="dialogs__item-info-bottom">
        <p>
          {lastMessage.text}
        </p>
        {lastMessage.unreaded && <div className="dialogs__item-info-bottom-count">
          {lastMessage.unreaded > 9 ? '+9' : lastMessage.unreaded}
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
