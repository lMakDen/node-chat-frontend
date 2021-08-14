import React from "react";
import { connect } from "react-redux";
import Status from "../components/Status";

const StatusContainer = ({ currentDialogId, user, dialogs }) => {
  if(!dialogs.length || !currentDialogId){
    return null
  }
  const foundDialog = dialogs.find((dialog) => dialog._id === currentDialogId)
  if(!foundDialog) {
    return null
  }

  const partner = foundDialog.author._id === user._id
    ?  foundDialog.partner : foundDialog.author
  return <Status
    isOnline={partner.isOnline}
    fullName={partner.fullName}
  />
}

export default connect(
  (state) => {
    return {
      dialogs: state.dialogs.items,
      currentDialogId: state.dialogs.currentDialogId,
      user: state.user.data
    }
  },
)(StatusContainer)
