import React, { useEffect, useState } from 'react';
import {Button, Result, Typography} from 'antd';

import { Block } from '../../../components';
import {userApi} from "../../../utils/api";

const { Title } = Typography;

const genTextInfo = ({ hash, verified }) => {
  if(hash) {
    return verified ?
      {
        status: 'success',
        message: 'Аккаунт успешно подтвержден.',
      } :
      {
        status: 'error',
        message: 'Ошибка при подтверждении аккаунта!',
      }
  } else {
    return {
      status: 'success',
      message: 'Ссылка на подтверждение аккаунта отправлена на E-mail.',
    }
  }
}

const CheckEmailInfo = ({ location, history }) => {
  const [ verified, setVerified ] = useState(false)
  const hash = location.search.split('hash=')[1]
  useEffect(() => {
    if(hash) {
      userApi.verifyHash(hash).then(({ data }) => {
        if(data.status === 'success') {
          setVerified(true)
        }
      })
    }
  })
  const info = genTextInfo({ hash, verified });
  return (
    <Block>
      <Result
        status={info.status}
        title={
          <Title level={2}>
            {info.status === 'success' ? 'Готово!' : 'Ошибка!'}
          </Title>
        }
        subTitle={info.message}
        extra={
          info.status === 'success' && verified &&
          <Button type='primary' onClick={() => history.push('/')}>Войти</Button>
        }
      />
    </Block>
  );
};

export default CheckEmailInfo;