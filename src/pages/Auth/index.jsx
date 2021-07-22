import React from 'react'
import { Route } from 'react-router-dom'
import { LoginForm, RegisterForm } from '../../modules'
import CheckInfo from '../../modules/RegisterForm/components/CheckInfo'
import './Auth.scss'

const Auth = () => {
    return (
        <section className="auth">
            <div className="auth__content">
              <Route exact path='/signIn' component={LoginForm}/>
              <Route exact path='/signUp' component={RegisterForm}/>
              <Route exact path='/signUp/verify' component={CheckInfo}/>
            </div>
        </section>
    )
}

export default Auth
