import { userApi } from "../../utils/api";
import { openNotification } from '../../utils/helpers';

const Actions = {
  setUserData: data => ({
    type: "USER:SET_DATA",
    payload: data
  }),

  fetchUserData: () => (dispatch) => {
    userApi.getMe().then(({ data }) => {
      dispatch(Actions.setUserData(data))
    })
  },

  fetchUserLogin: (postData) => (dispatch) => {
    return userApi.signIn(postData).then(({ data }) => {
      openNotification({
        message: 'Отлично!',
        text: 'Авторизация успешна!',
        type: 'success'
      })
      window.axios.defaults.headers.common["token"] = data.token;
      window.localStorage['token'] = data.token
      dispatch(Actions.fetchUserData())
      return data
    }).catch(() => {
      openNotification({
        message: 'Ошибка при авторизации',
        text: 'неверный логин или пароль',
        type: 'error'
      })
    })
  },
  fetchUserRegister: (postData) => (dispatch) => {
    return userApi.signUp(postData).then(({ data }) => {
      console.log(data)
      // openNotification({
      //   message: 'Отлично!',
      //   text: 'Авторизация успешна!',
      //   type: 'success'
      // })
      // window.axios.defaults.headers.common["token"] = data.token;
      // window.localStorage['token'] = data.token
      // dispatch(Actions.fetchUserData())
      return data
    }).catch(() => {
      // openNotification({
      //   message: 'Ошибка при регистрации',
      //   text: 'неверный логин или пароль',
      //   type: 'error'
      // })
    })
  }
};

export default Actions;