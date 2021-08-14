import React from 'react'
import PropTypes from 'prop-types'
import { Input, Button, Empty } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import orderBy from 'lodash/orderBy'
import { DialogItem } from '../'

import './Dialogs.scss'

const Dialogs = ({ items, userId, onSearch, currentDialogId }) => {

  return <div className="dialogs">
    <div className="chat__sidebar-search">
      <Input
        placeholder="Поиск среди контактов"
        suffix={
          <Button shape="circle" icon={<SearchOutlined />} />
        }
        onChange={onSearch}
      />
    </div>
    {items.length ? orderBy(items, ['create_at'], ['desc']).map((item) => (
      <DialogItem
        key={item._id}
        isMe={item.author._id === userId}
        currentDialogId={currentDialogId}
        {...item}
      />
      )) : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Ничего не найдено" />}
  </div>
}

Dialogs.propTypes = {
  className: PropTypes.string
}

export default Dialogs
