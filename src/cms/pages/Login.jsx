import React from 'react';
import { Card, Form, Input, Button, Typography, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const Login = () => {
    const navigate = useNavigate();

    const onFinish = (values) => {
        // Mock authentication
        if (values.username === 'admin' && values.password === 'admin123') {
            localStorage.setItem('cms_auth', 'true');
            message.success('Login successful!');
            navigate('/admin/cms');
        } else {
            message.error('Invalid credentials. Try admin / admin123');
        }
    };

    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #1677ff 0%, #001529 100%)'
        }}>
            <Card style={{ width: 400, boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <img src="/webteb-logo.png" alt="Logo" style={{ height: '48px', marginBottom: '16px' }} />
                    <Title level={3}>CMS Admin Portal</Title>
                    <Text type="secondary">Please sign in to manage your content</Text>
                </div>

                <Form
                    name="login"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    size="large"
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="Username (admin)" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password prefix={<LockOutlined />} placeholder="Password (admin123)" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block style={{ height: '48px' }}>
                            Log in
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default Login;
