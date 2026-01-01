import React from 'react';
import { Row, Col, Card, Statistic, Typography, List, Badge } from 'antd';
import {
    FileTextOutlined,
    EyeOutlined,
    ArrowUpOutlined,
    GlobalOutlined
} from '@ant-design/icons';

const { Title } = Typography;

const Dashboard = () => {
    const recentActivity = [
        { title: 'Hero Section updated', time: '2 minutes ago', user: 'Admin' },
        { title: 'New page "About Us" published', time: '1 hour ago', user: 'Admin' },
        { title: 'Arabic translations updated', time: '3 hours ago', user: 'Admin' },
    ];

    return (
        <div style={{ padding: '24px' }}>
            <Title level={2}>Admin Dashboard</Title>

            <Row gutter={24}>
                <Col span={6}>
                    <Card bordered={false} className="fade-in">
                        <Statistic
                            title="Total Pages"
                            value={12}
                            prefix={<FileTextOutlined />}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card bordered={false} className="fade-in">
                        <Statistic
                            title="Live Views (24h)"
                            value={1234}
                            valueStyle={{ color: '#3f8600' }}
                            prefix={<ArrowUpOutlined />}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card bordered={false} className="fade-in">
                        <Statistic
                            title="Active Languages"
                            value={2}
                            prefix={<GlobalOutlined />}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card bordered={false} className="fade-in">
                        <Statistic
                            title="Published Status"
                            value="Sync"
                            prefix={<Badge status="success" />}
                        />
                    </Card>
                </Col>
            </Row>

            <Row gutter={24} style={{ marginTop: '24px' }}>
                <Col span={16}>
                    <Card title="Recent Activity" bordered={false}>
                        <List
                            itemLayout="horizontal"
                            dataSource={recentActivity}
                            renderItem={(item) => (
                                <List.Item>
                                    <List.Item.Meta
                                        title={item.title}
                                        description={`${item.user} • ${item.time}`}
                                    />
                                    <Badge status="processing" text="Done" />
                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card title="Quick Stats" bordered={false}>
                        <div style={{ textAlign: 'center', padding: '20px 0' }}>
                            <div style={{ fontSize: '14px', color: '#8c8c8c' }}>Content Health</div>
                            <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#1677ff' }}>98%</div>
                            <div style={{ marginTop: '10px' }}>
                                <Badge status="success" text="All systems functional" />
                            </div>
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Dashboard;
