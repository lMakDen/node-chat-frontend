export default ({ isAuth, values, errors }) => {
  const rules = {
    email: (value) => {
      if (!value) {
        errors.email = 'Введите E-Mail';
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
      ) {
        errors.email = 'Неверный E-Mail';
      }
    },
    password: (value) => {
      if (!value) {
        errors.password = 'Введите пароль!';
      }
      else if (
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/.test(value)
      ) {
        errors.password = 'Слишком легкий пароль!';
      }
    },
    fullName: (value) => {
      if (!value) {
        errors.fullName = 'Укажите свое имя и фамилию';
      }
    },
    password_2: (value) => {
      if (value !== values.password) {
        errors.password_2 = 'Пароли не совпадают';
      }
    },
  }

  Object.keys(values).forEach((key) => (rules[key] && rules[key](values[key])))

}
