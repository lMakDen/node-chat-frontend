import React from 'react'
import { Button } from 'antd'
import { TeamOutlined, FormOutlined, EllipsisOutlined } from '@ant-design/icons'
import { Dialogs, Messages, ChatInputContainer, StatusContainer } from '../../containers'
import './Home.scss'

const Home = () => {
  return (
    <section className="home">
      <div className="chat">
        <div className="chat__sidebar">
          <div className="chat__sidebar-header">
            <div>
              <TeamOutlined />
              <span className="chat__sidebar-header-title">Список диалогов</span>
            </div>
            <Button shape="circle" icon={<FormOutlined />} />
          </div>
          <div className="chat__sidebar-dialogs">
            <Dialogs/>
          </div>
        </div>

        <div className="chat__dialog">
          <div className="chat__dialog-header">
            <div/>
            <StatusContainer />
            <EllipsisOutlined style={{ fontSize: 22}}/>
          </div>
          <div className="chat__dialog-messages">
            <Messages/>
          </div>
          <div className="chat__dialog-input">
            <ChatInputContainer />
          </div>
        </div>
      </div>

    </section>
  )
}

export default Home
