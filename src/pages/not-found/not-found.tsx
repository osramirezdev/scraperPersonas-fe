import React, { memo } from 'react';
import { Breadcrumb, Layout } from 'antd';
import "./not-found-styles.css";
const { Content } = Layout;


const AppNotFound: React.FC = () => {
  return (
    <Content style={{ margin: '0 16px' }}>
    <Breadcrumb style={{ margin: '16px 0' }}>
      <Breadcrumb.Separator>Page</Breadcrumb.Separator>
      <Breadcrumb.Separator> <span className="notFound">Not found</span></Breadcrumb.Separator>
    </Breadcrumb>
      <div style={{ padding: 24, minHeight: 360, background: "#000000" }}>
        Page not found.
      </div>
    </Content>
  );
};

export default memo(AppNotFound);