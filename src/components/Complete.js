import React from 'react';
import { Tabs } from 'antd';
import ListUser from './ListUser';
import Me from './Me';
const TabPane = Tabs.TabPane;

function callback(key) {
  console.log(key);
}

export default () => 
  <Tabs defaultActiveKey="1" onChange={callback}>
    <TabPane tab="Users" key="1"><ListUser /></TabPane>
    <TabPane tab="Me" key="2"><Me /></TabPane>
    <TabPane tab="Tab 3" key="3">Content of Tab Pane 3</TabPane>
  </Tabs>