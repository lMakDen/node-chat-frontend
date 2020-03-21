import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Input, Button } from 'antd'
import { UploadField } from '@navjobs/upload'
import { SmileOutlined, CameraOutlined, AudioOutlined, SendOutlined } from '@ant-design/icons'
import { Picker } from 'emoji-mart'

import './ChatInput.scss'

const FileButton = () => {
  return <UploadField
    onFiles={files => console.log(files)}
    containerProps={{
      className: 'chat-input__actions-upload-btn'
    }}
    uploadProps={{
      accept: '.jpg,.jpeg,.png,.gif,.bmp',
      multiple: true
    }}
  >
    <CameraOutlined />
  </UploadField>
}

const ChatInput = props => {
  const [ isOpenEmoji, setIsOpenEmoji ] = useState(false)

  const onClickEmoji = () => setIsOpenEmoji(!isOpenEmoji)

  return <div className="chat-input">
    <Input
      placeholder="Enter your username"
      size="large"
      prefix={
        <div>
          {isOpenEmoji && <div className="chat-input__emoji-picker">
            <Picker set='apple' />
          </div>}
          <Button onClick={onClickEmoji} shape="circle" icon={<SmileOutlined />} />
        </div>
      }
      suffix={
        <div className="chat-input__actions">
          <Button shape="circle" icon={<FileButton />} />
          <Button shape="circle" icon={<AudioOutlined />} />
          <Button shape="circle" icon={<SendOutlined />} />
        </div>
      }
    />
  </div>
}

ChatInput.propTypes = {
  className: PropTypes.string
}

export default ChatInput