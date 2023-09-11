import React from 'react';
import { Breadcrumb, Layout } from 'antd';
import "./home-styles.css";
const { Content } = Layout;


const AppHome: React.FC = () => {
  return (
    <Content style={{ margin: '0 16px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Separator>Page</Breadcrumb.Separator>
        <Breadcrumb.Separator>Home</Breadcrumb.Separator>
      </Breadcrumb>
      <div style={{ padding: 24, minHeight: 360, background: "#000000" }}>
        Bill is a cat.
      </div>
    </Content>
  );
};

export default AppHome;