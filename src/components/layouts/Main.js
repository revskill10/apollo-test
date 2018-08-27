// @flow
import React from 'react';
import {styled} from 'fusion-plugin-styletron-react';
import { Layout } from 'antd';
import Nav from './Nav';
const { Header, Footer, Content } = Layout;
const FullHeightDiv = styled('div', {
  height: '100%',
  backgroundColor: '#FFFFFF',
});

const backgroundStyle = {
  backgroundColor: 'white'
}

const contentStyle = {
  ...backgroundStyle,
  marginLeft: '5%',
  marginRight: '5%'
}

const Main = ({ children }) => (
  <Layout>
    <FullHeightDiv>
      <style>
        {`
          html,body,#root{height:100%;}
          html{font-family:sans-serif;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;-webkit-tap-highlight-color:rgba(0,0,0,0);}
          body{margin:0;}
          button::-moz-focus-inner,input::-moz-focus-inner{border:0;padding:0;}
          input::-webkit-inner-spin-button,input::-webkit-outer-spin-button,input::-webkit-search-cancel-button,input::-webkit-search-decoration,input::-webkit-search-results-button,input::-webkit-search-results-decoration{display:none;}
        `}
      </style>
      <Header style={backgroundStyle}>
        <Nav />
      </Header>       
      <Layout style={contentStyle}>
        <Content>{ children }</Content>
      </Layout>
      <Footer style={backgroundStyle}>Footer</Footer>
    </FullHeightDiv>
  </Layout>
);

export default Main;
