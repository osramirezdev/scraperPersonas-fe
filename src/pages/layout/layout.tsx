import React, { useState } from 'react';
import {
  PieChartOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import { Outlet } from 'react-router-dom';
import './layout-styles.css'
import MenuHeader from '../../components/menu-header/menu-header';
import MainFooter from '../../components/footer/footer';
const { Header, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  ruta: string,
  icon?: React.ReactNode,
  items?: MenuItem[],
): MenuItem {
  const menu = (<a href={ruta}>
    {label}
  </a>)
  return {
    key,
    icon,
    items,
    label: menu,

  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Ruc', '1', '/', <PieChartOutlined />),
  getItem('Ips', '2', '/ips', <PieChartOutlined />),
  getItem('Funcionario', '3', '/funcionario', <PieChartOutlined />),
  getItem('Docente', '4', '/docente', <PieChartOutlined />),
];

const AppLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" >
          <MenuHeader />
        </div>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} >

          <Menu.Item key="2" >
            Profile
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: "#000000" }} />
        <Outlet />
        <Footer style={{ textAlign: 'center' }}>
          <MainFooter />
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AppLayout;