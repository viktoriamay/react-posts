import { notification } from 'antd';

export const openNotification = (
  type = 'success',
  message = 'Успешно',
  description = ''
) => {
  return notification[type]({ message, description, placement: 'bottomRight' });
};