import React from 'react'
import PropTypes from 'prop-types'
import { Input, Button, Empty } from 'antd'
import classNames from 'classnames'
import { Message, Status, ChatInput } from '../../components'



import './Messages.scss'

const Messages = ({blockRef, items, isLoading }) => {
  return items.length ? <div
      className={classNames('messages', {'messages--loading': isLoading})}
      ref={blockRef}
    >
    {items.map((item, index) => (
      <Message
        key={index}
        {...item}
      />
    ))}
    </div> :
    <Empty description="Нет сообщений" />
}

Messages.propTypes = {
  items: PropTypes.array,
}

export default Messages