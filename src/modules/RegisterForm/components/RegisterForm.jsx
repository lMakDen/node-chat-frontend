import React from 'react'
import { Link } from 'react-router-dom'
import { Form, Input } from 'antd'
import { UserOutlined, LockOutlined, MailOutlined, InfoCircleOutlined, InfoCircleFilled, InfoCircleTwoTone } from '@ant-design/icons'
import { Button, Block } from '../../../components'
import { validateField } from '../../../utils/helpers'


const RegisterForm = (props) => {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
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
              <Form.Item
                validateStatus={validateField('email', touched, errors)}
                hasFeedback
                help={!touched.email ? undefined : errors.email}
              >
                <Input
                  id="email"
                  value={values.email}
                  prefix={<MailOutlined className="site-form-item-icon" />}
                  placeholder="E-Mail"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Form.Item>
              <Form.Item>
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Ваше имя"
                />
              </Form.Item>
              <Form.Item
                validateStatus={validateField('password', touched, errors)}
                hasFeedback
                help={!touched.password ? undefined : errors.password}
              >
                <Input
                  id='password'
                  value={values.password}
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Введите пароль"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Form.Item>
              <Form.Item>
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Повторите пароль"
                />
              </Form.Item>
              <Form.Item>
                <Button onClick={handleSubmit} type="primary" htmlType="submit" className="submit">
                  Зарегестрироваться
                </Button>
                <Link className="auth__register-link" to="./login">
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