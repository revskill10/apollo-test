import { Container } from 'unstated';
class RegisterContainer extends Container {
  handleSubmit = (validateFields) => (e) => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
}

export default RegisterContainer;