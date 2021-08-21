import { combineReducers } from "redux";

const reducers = ["dialogs", "messages", "user", "attachments"];

export default combineReducers(
  reducers.reduce((initial, name) => {
    initial[name] = require(`./${name}`).default;
    return initial;
  }, {})
)