// @flow
import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import RegisterContainer from '../../containers/forms/Register';
import { Subscribe } from 'unstated';

const FormItem = Form.Item;

const NormalRegisterForm = ({ form: { getFieldDecorator, validateFields } }) => {
  return (
    <Subscribe to={[RegisterContainer]}>
      {container => (
        <Form onSubmit={container.handleSubmit(validateFields)} className="register-form">
          <FormItem>
            {getFieldDecorator('email-register', {
              rules: [{ required: true, message: 'Please input your Email!' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('register-password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
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