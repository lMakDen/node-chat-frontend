import React from "react";
import { connect } from "react-redux";
import Status from "../components/Status";

const StatusContainer = ({ currentDialogId, user, dialogs }) => {
  if(!dialogs.length || !currentDialogId){
    return null
  }
  const foundDialog = dialogs.find((dialog) => dialog._id === currentDialogId)
  const partner = foundDialog.author._id === user._id
    ?  foundDialog.partner : foundDialog.author
  debugger
  return <Status
    isOnline={partner.isOnline}
    fullName={partner.fullName}
  />
}

export default connect(
  ({ dialogs, user }) => ({
    dialogs: dialogs.items,
    currentDialogId: dialogs.currentDialogId,
    user: user.data
  }),
)(StatusContainer)
