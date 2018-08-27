import { Container } from 'unstated';

const color = 'rgba(0,0,0,.25)'

class RegisterContainer extends Container {
  state = {
    emailStyle: { color },
    passwordStyle: { color }
  }

  handleSubmit = (validateFieldsAndScroll) => (e) => {
    e.preventDefault();
    validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  compareToFirstPassword = (passwordValue) => (rule, value, callback) => {
    if (value && value !== passwordValue) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }
}

export default RegisterContainer;