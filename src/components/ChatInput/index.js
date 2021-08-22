import React, { useState , useRef } from 'react'
import PropTypes from 'prop-types'
import { Input, Button } from 'antd'
import { connect } from "react-redux";
import { UploadField } from '@navjobs/upload'
import { SmileOutlined, CameraOutlined, AudioOutlined, SendOutlined, CheckCircleOutlined, DeleteOutlined } from '@ant-design/icons'
import { Picker } from 'emoji-mart'
import { messagesActions } from "../../redux/actions";
import useOnClickOutside from '../../utils/hooks';
import { filesApi } from '../../utils/api';
import UploadFile from '../UploadFile';

import './ChatInput.scss'

const FileButton = ({ onSelectFiles }) => {
  return <UploadField
    onFiles={onSelectFiles}
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

const ChatInput = ({ fetchSendMessage, currentDialogId }) => {
  const [ value, setValue ] = useState('')
  const [ isRecording, setIsRecording ] = useState(false)
  const [ mediaRecorder, setMediaRecorder ] = useState(null)
  const [ isOpenEmoji, setIsOpenEmoji ] = useState(false)
  const [ attachments, setAttachments ] = useState([])

  //TODO возможно не стоит ложить в window
  window.navigator.getUserMedia =
    window.navigator.getUserMedia ||
    window.navigator.mozGetUserMedia ||
    window.navigator.msGetUserMedia ||
    window.navigator.webkitGetUserMedia

  const sendAudio = (audioId) => {
    fetchSendMessage({
      text: value,
      dialogId: currentDialogId,
      attachments: [audioId],
    })
  }

  const sendMessage = () => {
    fetchSendMessage({
      text: value,
      dialogId: currentDialogId,
      attachments: attachments.map((file) => file.uid),
    })
    setValue('')
    setAttachments([])
  }

  const handleSendMessage = (e) => {
    if(e.keyCode === 13) {
      sendMessage()
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

  const onSelectFiles = async files => {
    let uploaded = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const uid = Math.round(Math.random() * 1000);
      uploaded = [
        ...uploaded,
        {
          uid,
          name: file.name,
          status: 'uploading',
        },
      ];
      setAttachments(uploaded);
      // eslint-disable-next-line no-loop-func
      await filesApi.upload(file).then(({ data }) => {
        uploaded = uploaded.map(item => {
          if (item.uid === uid) {
            return {
              status: 'done',
              uid: data.message._id,
              name: data.message.filename,
              url: data.message.url,
            };
          }
          return item;
        });
      });
    }
    setAttachments(uploaded);
  }

  const handleStopRecording = () => {
    mediaRecorder.stop()
  }

  const onRecord = () => {
    if (navigator.getUserMedia) {
      navigator.getUserMedia({ audio: true }, onRecording, onError)
    }
  }

  const onRecording = (stream) => {
    const recorder = new MediaRecorder(stream)
    setMediaRecorder(recorder)
    recorder.start()
    recorder.onstart = () => {
      setIsRecording(true)
    }

    recorder.onstop = () => {
      setIsRecording(false)
    }

    recorder.ondataavailable = (e) => {
      const file = new File([e.data], 'audio/ogg')
      filesApi.upload(file).then(({ data }) => {
        sendAudio(data.message._id)
      })
    }
  }

  const onError = (err) => {
    console.log(err)
  }

  return <div className="chat-input">
    <Input
      placeholder="Enter your username"
      size="large"
      onChange={e => setValue(e.target.value)}
      onKeyUp={handleSendMessage}
      value={value}
      disabled={isRecording}
      prefix={
        !isRecording && <div>
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
          {isRecording ?
            <><div className="chat-input__record-status">
              <i/>
              <div className='chat-input__record-label'>Recording...</div>
              <Button onClick={handleStopRecording} shape="circle" icon={<CheckCircleOutlined />} />
              <Button onClick={handleStopRecording} shape="circle" icon={<DeleteOutlined />} />
            </div>
            </> :
            <>
              <Button shape="circle" icon={<FileButton onSelectFiles={onSelectFiles} />} />
              <Button onClick={onRecord} shape="circle" icon={<AudioOutlined />} />
              <Button shape="circle" icon={<SendOutlined />} />
            </>
          }
        </div>
      }
    />
    <UploadFile
      attachments={attachments}
    />

  </div>
}

ChatInput.propTypes = {
  className: PropTypes.string
}


export default connect(
  ({ dialogs }) => dialogs,
  messagesActions,
)(ChatInput)
