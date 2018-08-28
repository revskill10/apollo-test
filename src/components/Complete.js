import React from 'react';
import { Tabs } from 'antd';
import ListUser from './ListUser';
import Me from './Me';
import SampleTable from './SampleTable';
import Messages from './Messages';

const TabPane = Tabs.TabPane;

function callback(key) {
  console.log(key);
}

export default () => 
  <Tabs defaultActiveKey="1" onChange={callback}>
    <TabPane tab="Users" key="1"><ListUser /></TabPane>
    <TabPane tab="Me" key="2"><Me /></TabPane>
    <TabPane tab="Table" key="3"><SampleTable /></TabPane>
    <TabPane tab="Messages" key="5"><Messages /></TabPane>
  </Tabs>