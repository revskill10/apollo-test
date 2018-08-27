import { Container } from 'unstated';


class BaseContainer extends Container {
  state ={
    data: {}
  }

  onNewData(data, callback) {
    this.setState(data, () => callback && callback(this.state))
  }
}

export default BaseContainer;
