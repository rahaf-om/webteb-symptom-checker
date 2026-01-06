import React, { useState } from 'react';
import { Layout, Menu, Button, Avatar, Dropdown, Space, Typography } from 'antd';
import {
    FileTextOutlined,
    DashboardOutlined,
    SettingOutlined,
    LogoutOutlined,
    UserOutlined,
    GlobalOutlined,
    LeftOutlined,
    RightOutlined
} from '@ant-design/icons';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

const AdminLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem('cms_auth');
        navigate('/admin/login');
    };

    const menuItems = [
        {
            key: '/admin/cms',
            icon: <DashboardOutlined />,
            label: 'Dashboard',
        },
        {
            key: '/admin/cms/content',
            icon: <FileTextOutlined />,
            label: 'Content Management',
        },
        {
            key: '/admin/cms/settings',
            icon: <SettingOutlined />,
            label: 'Settings',
        },
        {
            key: '/admin/cms/contacts',
            icon: <FileTextOutlined />,
            label: 'Contact Submissions',
        },
        {
            key: '/',
            icon: <GlobalOutlined />,
            label: 'Visit Website',
        },
    ];

    const userMenu = {
        items: [
            {
                key: 'profile',
                label: 'My Profile',
                icon: <UserOutlined />,
            },
            {
                type: 'divider',
            },
            {
                key: 'logout',
                label: 'Logout',
                icon: <LogoutOutlined />,
                onClick: handleLogout,
            },
        ],
    };

    return (
        <Layout className="cms-layout">
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                className="cms-sidebar"
                theme="dark"
            >
                <div style={{ padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img
                        src="/webteb-logo.png"
                        alt="Logo"
                        style={{
                            height: collapsed ? '24px' : '40px',
                            transition: 'all 0.3s',
                            filter: 'brightness(0) invert(1)'
                        }}
                    />
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={[location.pathname]}
                    items={menuItems}
                    onClick={({ key }) => navigate(key)}
                />
            </Sider>
            <Layout>
                <Header className="cms-header">
                    <Button
                        type="text"
                        icon={collapsed ? <RightOutlined /> : <LeftOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{ fontSize: '16px', width: 64, height: 64 }}
                    />
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <Dropdown menu={userMenu}>
                            <Space style={{ cursor: 'pointer' }}>
                                <Avatar icon={<UserOutlined />} />
                                {!collapsed && <span>Admin User</span>}
                            </Space>
                        </Dropdown>
                    </div>
                </Header>
                <Content className="cms-content">
                    <div className="fade-in">
                        <Outlet />
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default AdminLayout;
