import React from 'react'
import { EllipsisOutlined } from '@ant-design/icons'
import { Messages, ChatInputContainer, StatusContainer } from '../../containers'
import { Sidebar } from '../../components'
import './Home.scss'

const Home = () => {
  return (
    <section className="home">
      <div className="chat">
        <Sidebar />
        <div className="chat__dialog">
          <div className="chat__dialog-header">
            <div />
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
