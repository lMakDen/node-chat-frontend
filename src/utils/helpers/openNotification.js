import { notification } from 'antd';

export default ({
  text, type = 'info', message
  }) => {
  return notification[type]({
    message,
    description: text,
  });

}