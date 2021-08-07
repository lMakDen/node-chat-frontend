import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
// import format from 'date-fns/format'
// import isToday from 'date-fns/isToday'
import { Link } from 'react-router-dom'
import { IconReaded, Avatar } from '../'


// const getMessageTime = createdAt => {
//   if(isToday(createdAt)){
//     return format(createdAt, 'HH:mm')
//   }
//   return format(createdAt, 'dd.MM.yyyy')
// }

const DialogItem = ({_id, user, created_at, text, unreaded, isMe, isReaded, currentDialogId, onSelect, lastMessage }) => {

  return <Link to={`/dialog/${_id}`}>
    <div className={classNames('dialogs__item', {
      'dialogs__item--online': lastMessage && lastMessage.user.isOnline,
      'dialogs__item--selected': currentDialogId === _id
    })}
      onClick={onSelect.bind(this, _id)}
    >
      <div className="dialogs__item-avatar">
        <Avatar user={lastMessage && lastMessage.user} />
      </div>
      <div className="dialogs__item-info">
        <div className="dialogs__item-info-top">
          <b>{lastMessage && lastMessage.user.fullName}</b>
          {/*<span>*/}
          {/*  {getMessageTime(lastMessage.createdAt)}*/}
          {/*</span>*/}
        </div>
        <div className="dialogs__item-info-bottom">
          <p>
            {lastMessage && lastMessage.text}
          </p>
          {lastMessage && lastMessage.unreaded && <div className="dialogs__item-info-bottom-count">
            {lastMessage.unreaded > 9 ? '+9' : lastMessage.unreaded}
          </div>}
          {isMe && <IconReaded isMe={true} isReaded={true} />}
        </div>
      </div>
    </div>
  </Link>
}

DialogItem.propTypes = {
  className: PropTypes.string
}

export default DialogItem
