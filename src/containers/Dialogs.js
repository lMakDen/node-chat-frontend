import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import socket from '../core/socket';

import { dialogsActions } from '../redux/actions/index';
import { Dialogs as BaseDialogs } from '../components/index';

const Dialogs = ({ items, userId, fetchDialogs, currentDialogId }) => {
  const [inputValue, setValue] = useState('');
  const [filtered, setFilteredItems] = useState(Array.from(items));

  const onChangeInput = useCallback((value) => {
    const filteredItems = items.filter(
      dialog => dialog.author.fullName.toLowerCase().indexOf(value.toLowerCase()) >= 0
    )
    setFilteredItems(filteredItems)
    setValue(value)
  }, [items])

  useEffect(() => {
    if (items.length) {
      onChangeInput('');
    } else {
      setFilteredItems(items)
    }
  }, [items])

  useEffect(() => {
    if (!items.length) {
      fetchDialogs();
    }
    socket.on('SERVER:DIALOG_CREATED', fetchDialogs)
    socket.on('SERVER:NEW_MESSAGE', fetchDialogs)
    return () => {
      socket.removeListener('SERVER:DIALOG_CREATED', fetchDialogs)
      socket.removeListener('SERVER:NEW_MESSAGE', fetchDialogs)
    }
  }, [])

  return (
    <BaseDialogs
      userId={userId}
      items={filtered}
      onSearch={onChangeInput}
      inputValue={inputValue}
      currentDialogId={currentDialogId}
    />
  );
};

export default connect(
  ({ dialogs }) => dialogs,
  dialogsActions,
)(Dialogs)