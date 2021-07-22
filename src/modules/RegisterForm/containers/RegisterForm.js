import { withFormik } from 'formik';
import RegisterForm from '../components/RegisterForm'
import validateFunc from '../../../utils/validate'
import { userActions } from '../../../redux/actions';
import store from '../../../redux/store'


export default withFormik({
  enableReinitialize: true,
  mapPropsToValues: () => ({
    email: '',
    fullName: '',
    password: '',
    password_2: '',
  }),
  validate: values => {
    let errors = {};
    validateFunc({ isAuth: false, values, errors })
    return errors;
  },

  handleSubmit: (values, { setSubmitting, props }) => {
    store.dispatch(userActions.fetchUserRegister(values)).then((data) => {
      if (data && data.status === 'success') {
        setTimeout(() => {
          props.history.push('/')
        }, 500)
      }
      setSubmitting(false)
    })
      .catch(() => {
        setSubmitting(false)
      })
  },

  displayName: 'RegisterForm',
})(RegisterForm)