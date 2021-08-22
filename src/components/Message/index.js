import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import reactStringReplace from 'react-string-replace'
import { Emoji } from 'emoji-mart'


import { EllipsisOutlined } from '@ant-design/icons'
import { Popover, Button } from 'antd';
import classNames from 'classnames'
import { Time, IconRead, Avatar } from '../../components'
import { convertCurrentTime } from '../../utils/helpers'
import waveSvg from '../../assets/img/wave.svg'
import playSvg from '../../assets/img/play.svg'
import pauseSvg from '../../assets/img/pause.svg'
import {messagesActions} from '../../redux/actions';

import './Message.scss'

const MessageAudio = ({ audioSrc }) => {
  const audioElem = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const togglePlay = () => {
    if (!isPlaying) {
      audioElem.current.play();
    } else {
      audioElem.current.pause();
    }
  };

  useEffect(() => {
    audioElem.current.addEventListener(
      'playing',
      () => {
        setIsPlaying(true);
      },
      false,
    );
    audioElem.current.addEventListener(
      'ended',
      () => {
        setIsPlaying(false);
        setProgress(0);
        setCurrentTime(0);
      },
      false,
    );
    audioElem.current.addEventListener(
      'pause',
      () => {
        setIsPlaying(false);
      },
      false,
    );
    audioElem.current.addEventListener('timeupdate', () => {
      const duration = (audioElem.current && audioElem.current.duration) || 0;
      setCurrentTime(audioElem.current.currentTime);
      setProgress((audioElem.current.currentTime / duration) * 100);
    });
  }, []);

  return (
    <div className="message__audio">
      <audio ref={audioElem} src={audioSrc} preload="auto" />
      <div className="message__audio-progress" style={{ width: progress + '%' }} />
      <div className="message__audio-info">
        <div className="message__audio-btn">
          <button onClick={togglePlay}>
            {isPlaying ? (
              <img src={pauseSvg} alt="Pause svg" />
            ) : (
              <img src={playSvg} alt="Play svg" />
            )}
          </button>
        </div>
        <div className="message__audio-wave">
          <img src={waveSvg} alt="Wave svg" />
        </div>
        <span className="message__audio-duration">{convertCurrentTime(currentTime)}</span>
      </div>
    </div>
  );
}

const renderAttachment = (attachment) => {
  if(attachment.ext !== 'webm') {
    return (
      <div key={attachment._id} className="message__attachments-item">
        <img src={attachment.url} alt={attachment.filename}/>
      </div>
    )
  }

  return <MessageAudio audioSrc={attachment.url}/>
}

const Message = (props) => {
  const { avatar, text, user, audio, date, isMe, isRead, attachments, isTyping, _id: id } = props
  const dispatch = useDispatch()
  const onRemoveMessage = () => {
    dispatch(messagesActions.removeMessageById(id))
  }

  const isAudio = attachments[0] && attachments[0].ext === 'webm'

  return <div className={classNames('message', {
    'message--isme': isMe,
    'message--is-typing': isTyping,
    'message--is-audio': isAudio,
    'message--image': !isAudio && !text && attachments.length === 1,
  })}>
    <div className="message__content">
      <div className="message__avatar">
        <Avatar user={user} />
      </div>
      <div className="message__info">
        {(audio || text || isTyping) &&
        <div className="message__bubble">
          {text && <p className="message__text">
            {reactStringReplace(text, /:(.+?):/g, (match, i) => {
              return <Emoji key={i} emoji={match} set='apple' size={20} />
            })}
          </p>}
          {isTyping &&
          <div className="message__typing">
            <span/>
            <span/>
            <span/>
          </div>}
          {
            audio && <MessageAudio audioSrc={audio} />
          }
        </div>}

        {date && <span
          className="message__date"
        >
          <Time date={date}/>
        </span>}
      </div>
      <div className="message__attachments">
        {attachments.map((attachment, index) => renderAttachment(attachment))}
      </div>
      {isMe && <div className='message__icon-container'>
        <Popover
          title="Title"
          trigger="click"
          content={
            <div>
              <Button onClick={onRemoveMessage}>
                Удалить сообщение
              </Button>
            </div>
          }
        >
          <div className="message__icon-actions">
            <EllipsisOutlined style={{ fontSize: 22}} />
          </div>
        </Popover>
        <div><IconRead isRead={isRead} /></div>
      </div>}
    </div>
  </div>
}

Message.defaultProps = {
  user: {},
  attachments: [],
}

Message.propTypes = {
  avatar: PropTypes.string,
  text: PropTypes.string,
  date: PropTypes.string,
  user: PropTypes.object,
  attachments: PropTypes.array,
  isTyping: PropTypes.bool,
  isMe: PropTypes.bool,
  isRead: PropTypes.bool
}

export default Message