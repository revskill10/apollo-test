import { Container } from 'unstated';
class LoginContainer extends Container {
  handleSubmit = (form) => (e) => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
}

export default LoginContainer;