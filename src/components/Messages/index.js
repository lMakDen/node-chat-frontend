import React from 'react'
import PropTypes from 'prop-types'
import { Empty } from 'antd'
import classNames from 'classnames'
import { Message } from '../../components'

import './Messages.scss'

const Messages = ({blockRef, items, isLoading, user, hasAttachments }) => {
  return items.length ? <div
      className="chat__dialog-messages"
      style={{ height: `calc(100% - ${hasAttachments ? 250 : 138}px)` }}
    >
    <div
      className={classNames('messages', {'messages--loading': isLoading})}
      ref={blockRef}
    >
    {items.map((item, index) => (
      <Message
        key={index}
        {...item}
        isMe={user._id === item.user.id}
      />
    ))}
    </div>
  </div> :
    <Empty description="Нет сообщений" />
}

Messages.propTypes = {
  items: PropTypes.array,
}

export default Messages