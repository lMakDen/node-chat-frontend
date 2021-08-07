import React from "react";
import { connect } from "react-redux";
import ChatInput from "../components/ChatInput";
import { messagesActions } from "../redux/actions";

const ChatInputContainer = ({ fetchSendMessage, currentDialogId }) => {
  return <ChatInput
    onSendMessage={fetchSendMessage}
    currentDialogId={currentDialogId}
  />
}

export default connect(
  ({ dialogs }) => dialogs,
  messagesActions,
)(ChatInputContainer)
