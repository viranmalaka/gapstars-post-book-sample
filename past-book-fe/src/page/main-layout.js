import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';

const { Header, Content, Footer, Breadcrumb } = Layout;

const MainLayout = ({children}) => {
  return (
    <Layout className="main-layout">
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
          <Menu.Item key="1"><Link to="/all">All Images</Link></Menu.Item>
          <Menu.Item key="2"><Link to="/selected">Selected Images</Link></Menu.Item>
        </Menu>
      </Header>
      <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
          {children}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>My Past Book</Footer>
    </Layout>
  );
};

export default MainLayout;
