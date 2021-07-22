import React from 'react'
import { Link } from 'react-router-dom'
import { Form } from 'antd'
import { UserOutlined, LockOutlined, MailOutlined, InfoCircleOutlined, InfoCircleFilled, InfoCircleTwoTone } from '@ant-design/icons'
import {Button, Block, FormField} from '../../../components'
import { userActions } from '../../../redux/actions';
import store from '../../../redux/store'

const RegisterForm = (props) => {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    isValid
  } = props;
    const success = false
    return (
        <div>
          <div className="auth__top">
            <h2>Регистрация</h2>
            <p>Для входа в чат вам нужно зарегестрироваться</p>
          </div>
          <Block>
            {!success ? <Form
              name="normal_registration"
              className="login-form"
              onSubmit={handleSubmit}
            >
              <FormField
                icon={<MailOutlined className="site-form-item-icon" />}
                name='email'
                touched={touched}
                errors={errors}
                values={values}
                handleChange={handleChange}
                handleBlur={handleBlur}
                placeholder='E-Mail'
              />

              <FormField
                icon={<UserOutlined className="site-form-item-icon" />}
                name='fullName'
                touched={touched}
                errors={errors}
                values={values}
                handleChange={handleChange}
                handleBlur={handleBlur}
                placeholder='Ваше имя и фамилия'
              />

                <FormField
                  icon={<LockOutlined className="site-form-item-icon" />}
                  name='password'
                  touched={touched}
                  errors={errors}
                  values={values}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  placeholder='Введите пароль'
                  type='password'
                />

                <FormField
                  icon={<LockOutlined className="site-form-item-icon" />}
                  name='password_2'
                  touched={touched}
                  errors={errors}
                  values={values}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  placeholder='Повторите пароль'
                  type='password'
                />

              <Form.Item>
                {isSubmitting && !isValid && <span> Ошибка!</span>}
                <Button disabled={isSubmitting} onClick={handleSubmit} type="primary" htmlType="submit" className="submit">
                  Зарегестрироваться
                </Button>
                <Link className="auth__register-link" to="/signIn">
                  Войти в аккаунт
                </Link>
              </Form.Item>
            </Form> :
            <div className="auth__success-block">
              <div>
                <InfoCircleTwoTone
                  className="auth__success-icon"
                />
              </div>
              <h2>Подтвердите свой аккаунт</h2>
              <p>На вашу почту отправлено письмо с ссылкой на подтверждение аккаунта.</p>
            </div>
            }
          </Block>
        </div>
    )
}

export default RegisterForm