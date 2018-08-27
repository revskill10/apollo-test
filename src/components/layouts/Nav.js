import React from 'react';
import {
  Link,
} from 'fusion-plugin-react-router';
import { Menu, Dropdown, Icon, Row, Col} from 'antd';
import {Translate} from 'fusion-plugin-i18n-react';

const SubMenu = Menu.SubMenu;

const menu = (
  <Menu theme="light">
    <Menu.Item><Link to="/">
      <Translate id="HomeHeader" />
    </Link>
  </Menu.Item>
  </Menu>
);

const menuLogin = (
  <Menu theme="light">
    <Menu.Item><Link to="/login">Login</Link></Menu.Item>
  </Menu>
)

const Nav = () => (
  <Row>
    <style>{`
      .menu {
        float: right;
      }
    `}</style>
    <Col span={8}>
      <Dropdown overlay={menu}>
        <a className="ant-dropdown-link" href="/">
          Home <Icon type="down" />
        </a>
      </Dropdown>
    </Col>
    <Col span={8} offset={8}>
      <Dropdown overlay={menuLogin}>
        <a className="ant-dropdown-link menu" href="#">
          Profile <Icon type="down" />
        </a>
      </Dropdown>
    </Col>
  </Row>
)



export default Nav;