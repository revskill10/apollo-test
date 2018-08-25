import React from 'react';
import { Tabs } from 'antd';
import ListUser from './ListUser';
import Me from './Me';
import SampleTable from './SampleTable';
import Counter from './Counter';
const TabPane = Tabs.TabPane;

function callback(key) {
  console.log(key);
}

export default () => 
  <Tabs defaultActiveKey="1" onChange={callback}>
    <TabPane tab="Users" key="1"><ListUser /></TabPane>
    <TabPane tab="Me" key="2"><Me /></TabPane>
    <TabPane tab="Table" key="3"><SampleTable /></TabPane>
    <TabPane tab="Counter" key="4"><Counter /></TabPane>
  </Tabs>