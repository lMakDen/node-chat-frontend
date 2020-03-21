import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { dialogsActions } from '../redux/actions/index';
import { Dialogs as BaseDialogs } from '../components/index';

const Dialogs = ({ items, userId, fetchDialogs, currentDialogId, setCurrentDialogId }) => {
  const [inputValue, setValue] = useState('');
  const [filtered, setFilteredItems] = useState(Array.from(items));
  const onChangeInput = ({ target: { value } }) => {
    const boom = items.filter(
      dialog =>
        dialog.user.fullname.toLowerCase().indexOf(value.toLowerCase()) >= 0
    )
    setFilteredItems(boom)
    setValue(value)
  }

  useEffect(() => {
    if (items.length) {
      onChangeInput({ target: { value: '' } });
    }
  }, [items])

  useEffect(() => {
    fetchDialogs();
  }, [])

  return (
    <BaseDialogs
      userId={userId}
      items={filtered}
      onSearch={onChangeInput}
      inputValue={inputValue}
      onSelectDialog={setCurrentDialogId}
      currentDialogId={currentDialogId}
    />
  );
};

export default connect(
  ({ dialogs }) => dialogs,
  dialogsActions,
)(Dialogs)