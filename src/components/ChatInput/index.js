import React, { useState , useRef} from 'react'
import PropTypes from 'prop-types'
import { Input, Button } from 'antd'
import { UploadField } from '@navjobs/upload'
import { SmileOutlined, CameraOutlined, AudioOutlined, SendOutlined } from '@ant-design/icons'
import { Picker } from 'emoji-mart'
import useOnClickOutside from '../../utils/hooks';

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

const ChatInput = ({ onSendMessage, currentDialogId }) => {
  const [ value, setValue ] = useState('')
  const [ isOpenEmoji, setIsOpenEmoji ] = useState(false)

  const handleSendMessage = (e) => {
    if(e.keyCode === 13) {
      onSendMessage({ text: value, dialogId: currentDialogId })
      setValue('')
    }
  }

  const onClickEmoji = () => setIsOpenEmoji(!isOpenEmoji)

  const setEmoji = ({ colons }) => {
    setValue((value + ' ' + colons).trim())
  }
  const emojiRef = useRef()
  useOnClickOutside(emojiRef.current, () => {
    setIsOpenEmoji(false)
  })

  return <div className="chat-input">
    <Input
      placeholder="Enter your username"
      size="large"
      onChange={e => setValue(e.target.value)}
      onKeyUp={handleSendMessage}
      value={value}
      prefix={
        <div>
          <div ref={emojiRef} className="chat-input__emoji-picker">
            {isOpenEmoji &&
              <Picker onSelect={setEmoji} set='apple' />
            }
          </div>
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