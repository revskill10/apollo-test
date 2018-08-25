import React from 'react';
import {
  Link,
} from 'fusion-plugin-react-router';
import { Menu, Dropdown, Icon } from 'antd';

const SubMenu = Menu.SubMenu;

const menu = (
  <Menu theme="light">
    <Menu.Item><Link to="/">Home</Link></Menu.Item>
    <Menu.Item><Link to="/404">404</Link></Menu.Item>
    <SubMenu title="sub menu">
      <Menu.Item>3rd menu item</Menu.Item>
      <Menu.Item>4th menu item</Menu.Item>
    </SubMenu>
    <SubMenu title="disabled sub menu" disabled>
      <Menu.Item>5d menu item</Menu.Item>
      <Menu.Item>6th menu item</Menu.Item>
    </SubMenu>
  </Menu>
);

const Nav = () => (
  <Dropdown overlay={menu}>
    <a className="ant-dropdown-link" href="#">
      Cascading menu <Icon type="down" />
    </a>
  </Dropdown>
)



export default Nav;