import React from 'react'
import { Route } from 'react-router-dom'
import { Button } from 'antd'
import { TeamOutlined, FormOutlined, EllipsisOutlined } from '@ant-design/icons'
import { Status, ChatInput } from '../../components'
import { Dialogs, Messages } from '../../containers'
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
            <Dialogs
              items={[]}
            />
          </div>
        </div>

        <div className="chat__dialog">
          <div className="chat__dialog-header">
            <div/>
            <div className="chat__dialog-header-center">
              <b className="chat__dialog-header-username">Гай Юлий Цезарь</b>
              <div className="chat__dialog-header-status">
                <Status online={true} />
              </div>
            </div>
            <EllipsisOutlined style={{ fontSize: 22}}/>
          </div>
          <div className="chat__dialog-messages">
            <Messages/>
          </div>
          <div className="chat__dialog-input">
            <ChatInput items={[]}/>
          </div>
        </div>
      </div>

    </section>
  )
}

export default Home
