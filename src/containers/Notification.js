import { Container } from 'unstated';
import { notification } from 'antd';

type NotificationState = {
  message: string
};

class NotificationContainer extends Container<NotificationState> {
  state = {
    message: ''
  };

  onNewData(message) {
    this.setState({message}, () => {
      notification.open({
        message: `${message} created`,
        description: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
      });
    });
  }
}

export const SharedNotificationContainer = new NotificationContainer();

export default NotificationContainer;
