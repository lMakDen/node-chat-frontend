import React from 'react'
import { Link } from 'react-router-dom'
import { Form, Input, Checkbox } from 'antd'
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons'
import { Button, Block } from '../../../components'
import { validateField } from '../../../utils/helpers'

const LoginForm = (props) => {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
  } = props;
    return (
        <div>
          <div className="auth__top">
            <h2>Войти в акаунт</h2>
            <p>Пожалуйста, войдите в свой акаунт</p>
          </div>
          <Block>
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{
                remember: true,
              }}
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
              <Form.Item
                validateStatus={validateField('password', touched, errors)}
                hasFeedback
                help={!touched.password ? undefined : errors.password}
              >
                <Input
                  id='password'
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item>
                <div className="remember" >
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                  </Form.Item>
                  <a className="login-form-forgot" href="">
                    Forgot password
                  </a>
                </div>
              </Form.Item>
              <Form.Item>
                <Button onClick={handleSubmit} type="primary" htmlType="submit" className="submit">
                  Войти
                </Button>
                <Link className="auth__register-link" to="register">
                  Зарегестрироваться
                </Link>
              </Form.Item>
            </Form>
          </Block>
        </div>
    )
}

export default LoginForm