import BaseContainer from './BaseContainer';

type NotificationState = {
  message: string
};

class NotificationContainer extends BaseContainer<NotificationState> {
  state = {
    message: ''
  };
}

export const SharedNotificationContainer = new NotificationContainer();

export default NotificationContainer;
