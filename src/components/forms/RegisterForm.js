// @flow
import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import RegisterContainer from '../../containers/forms/Register';
import { Subscribe } from 'unstated';

const FormItem = Form.Item;

const NormalRegisterForm = ({ form: { getFieldDecorator, validateFieldsAndScroll, getFieldValue } }) => {
  return (
    <Subscribe to={[RegisterContainer]}>
      {container => (
        <Form onSubmit={container.handleSubmit(validateFieldsAndScroll)} className="register-form">
          <FormItem>
            {getFieldDecorator('email-register', {
              rules: [{ required: true, message: 'Please input your Email!' }],
            })(
              <Input prefix={<Icon type="user" style={container.state.emailStyle} />} placeholder="Username" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('register-password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input prefix={<Icon type="lock" style={container.state.passwordStyle} />} type="password" placeholder="Password" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('register-password-confirm', {
              rules: [{
                required: true, message: 'Please confirm your password!',
              }, {
                validator: container.compareToFirstPassword(getFieldValue('register-password')),
              }],
            })(
              <Input type="password" prefix={<Icon type="lock" style={container.state.passwordStyle} />} placeholder="Confirm password" />
            )}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" className="register-form-button">
              Register
            </Button>
          </FormItem>
        </Form>
      )}
    </Subscribe>      
  );
}

const WrappedNormalRegisterForm = Form.create()(NormalRegisterForm);

export default WrappedNormalRegisterForm;