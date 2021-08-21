import React, { useEffect } from 'react'
import { EllipsisOutlined } from '@ant-design/icons'
import { withRouter } from 'react-router'
import { dialogsActions } from '../../redux/actions/index';

import { Messages, StatusContainer } from '../../containers'
import { Sidebar, ChatInput } from '../../components'
import './Home.scss'
import {connect} from "react-redux";

const Home = (props) => {
  const { location: { pathname }, setCurrentDialogId } = props
  const dialogId = pathname.split('/').pop()

  useEffect(() => {
    setCurrentDialogId(dialogId)
  }, [pathname])

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
          <Messages/>
          {dialogId && <div className="chat__dialog-input">
            <ChatInput />
          </div>}
        </div>
      </div>
    </section>
  )
}

export default withRouter(connect(
  ({ dialogs }) => dialogs,
  dialogsActions,
)(Home))
