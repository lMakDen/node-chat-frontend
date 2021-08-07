import React, {useEffect, useRef} from 'react';
import {connect} from 'react-redux';
import find from 'lodash/find';

import socket from '../core/socket';
import {messagesActions} from '../redux/actions';

import {Messages as BaseMessages} from '../components';

const Dialogs = ({
     currentDialog,
     fetchMessages,
     addMessage,
     items,
     user,
     isLoading,
     removeMessageById,
     attachments,
     isTyping
   }) => {
  // if (!currentDialog) {
  //   return <Empty description="Откройте диалог" />;
  // }

  // const [previewImage, setPreviewImage] = useState(null);
  // const [blockHeight, setBlockHeight] = useState(135);
  // const [isTyping, setIsTyping] = useState(false);
  // let typingTimeoutId = null;

  const messagesRef = useRef(null);

  const onNewMessage = data => {
    addMessage(data);
    // fetchMessages(data.dialog._id)
  };

  // const toggleIsTyping = () => {
  //   setIsTyping(true);
  //   clearInterval(typingTimeoutId);
  //   typingTimeoutId = setTimeout(() => {
  //     setIsTyping(false);
  //   }, 3000);
  // };

  // useEffect(() => {
  //   if (attachments.length) {
  //     setBlockHeight(245);
  //   } else {
  //     setBlockHeight(135);
  //   }
  // }, [attachments]);

  useEffect(() => {
    if (currentDialog) {
      fetchMessages(currentDialog._id);
    }

    socket.on('SERVER:NEW_MESSAGE', onNewMessage)
    return () => {
      socket.removeListener('SERVER:NEW_MESSAGE', onNewMessage)
    }
  }, [currentDialog]);

  useEffect(() => {
    if(messagesRef.current) messagesRef.current.scrollTo(0, 999999);
  }, [items, isTyping]);

  return (
    <BaseMessages
      user={user}
      blockRef={messagesRef}
      items={items}
      // isLoading={isLoading && !user}
      // onRemoveMessage={removeMessageById}
      // setPreviewImage={setPreviewImage}
      // previewImage={previewImage}
      // blockHeight={blockHeight}
      // isTyping={isTyping}
      // partner={
      //   user._id !== currentDialog.partner._id ? currentDialog.author : currentDialog.partner
      // }
    />
  );
};

export default connect(
  ({ dialogs, messages, user, attachments }) => ({
    currentDialog: find(dialogs.items, { _id: dialogs.currentDialogId }),
    items: messages.items,
    isLoading: messages.isLoading,
    // attachments: attachments.items,
    user: user.data,
  }),
  messagesActions,
)(Dialogs)