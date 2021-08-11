import React, { useState } from 'react'
import { connect } from "react-redux";
import PropTypes from 'prop-types'
import { Button, Modal, Select, Input, Form } from 'antd'

import { FormOutlined, TeamOutlined } from "@ant-design/icons";

import { Dialogs } from "../../containers";
import { userApi, dialogsApi } from "../../utils/api";

const { Option } = Select;
const { TextArea } = Input;

const Sidebar = ({ user }) => {
  const [ isVisible, setVisible ] = useState(false)
  const [ selectedUserId, setSelectedUserId ] = useState('')
  const [ messageText, setMessageText ] = useState('')
  const [ users, setUsers ] = useState([])
  const [ isLoading, setIsLoading ] = useState(false)

  const onClose = () => setVisible(false)

  const handleSearch = (value) => {
    setIsLoading(true)
    userApi.findUsers(value).then(({ data }) => {
      setUsers(data)
      setIsLoading(false)
    }).catch(() => setIsLoading(false))
  }

  const handleSelect = (value) => {
    setSelectedUserId(value)
  }

  const onAddDialog = () => {
    setIsLoading(true)
    dialogsApi.create({ partner: selectedUserId, text: messageText })
      .then(onClose)
      .catch(() => setIsLoading(false))
  }

  const onChangeTextArea = ({ target }) => {
    setMessageText(target.value)
  }

  return <div className="chat__sidebar">
    <div className="chat__sidebar-header">
      <div>
        <TeamOutlined />
        <span className="chat__sidebar-header-title">Список диалогов</span>
      </div>
      <Button onClick={() => setVisible(true)} shape="circle" icon={<FormOutlined />} />
    </div>
    <div className="chat__sidebar-dialogs">
      <Dialogs userId={user && user.id}/>
    </div>
    <Modal
      title="Создать диалог"
      visible={isVisible}
      footer={[
        <Button key="back" onClick={onClose}>
          Закрыть
        </Button>,
        <Button disabled={!messageText || !selectedUserId} key="submit" type="primary" loading={isLoading} onClick={onAddDialog}>
          Создать
        </Button>
      ]}
    >
      <Form layout='vertical'>
        <Form.Item label='Введите имя пользователя или E-mail'>
          <Select
            value={selectedUserId}
            showSearch
            style={{ width: '100%' }}
            placeholder="Введите имя пользователя"
            onSearch={handleSearch}
            onSelect={handleSelect}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {users.map((currUser) =>
              <Option key={currUser._id}>{currUser.fullName}</Option>
            )}
          </Select>
        </Form.Item>
        <Form.Item label='Введите текст'>
          <TextArea
            value={messageText}
            rows={4}
            onChange={onChangeTextArea}
          />
        </Form.Item>
      </Form>
    </Modal>
  </div>
}

Sidebar.propTypes = {
  items: PropTypes.array,
}

Sidebar.defaultProps = {
  users: [],
}

export default connect(
  ({ user }) => ({
    user: user.data
  }),
)(Sidebar)
