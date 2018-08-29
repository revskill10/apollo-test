import React from 'react';
import { Tabs, Button } from 'antd';
import ListUser from './ListUser';
import Me from './Me';
import SampleTable from './SampleTable';
import Messages from './Messages';
import { Upload as FileUpload } from './FileUpload';
import RegisterDrawer from './forms/RegisterDrawer';

const TabPane = Tabs.TabPane;

const operations = <RegisterDrawer />;

function callback(key) {
  console.log(key);
}

export default () => 
  <Tabs defaultActiveKey="1" onChange={callback} tabBarExtraContent={operations}>
    <TabPane tab="Users" key="1"><ListUser /></TabPane>
    <TabPane tab="Me" key="2"><Me /></TabPane>
    <TabPane tab="Table" key="3"><SampleTable /></TabPane>
    <TabPane tab="Messages" key="5"><Messages /></TabPane>
    <TabPane tab="File Upload" key="6"><FileUpload /></TabPane>
  </Tabs>