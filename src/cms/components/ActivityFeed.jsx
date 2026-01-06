import React from 'react';
import { Card, List, Typography, Badge, Avatar } from 'antd';
import { ClockCircleOutlined, BellOutlined } from '@ant-design/icons';
import { useRealTime } from '../context/RealTimeContext';

const { Text, Title } = Typography;

const ActivityFeed = () => {
    const { activities = [] } = useRealTime() || {};

    // Helper to format time relative
    const formatTime = (isoString) => {
        const date = new Date(isoString);
        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000);

        if (diffInSeconds < 60) return 'Just now';
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
        return `${Math.floor(diffInSeconds / 3600)}h ago`;
    };

    return (
        <Card
            title={
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <BellOutlined />
                    <span>Live Activity</span>
                </div>
            }
            bordered={false}
            className="stat-card"
            bodyStyle={{ padding: '0 12px 12px 12px', maxHeight: '400px', overflowY: 'auto' }}
        >
            <List
                itemLayout="horizontal"
                dataSource={activities}
                renderItem={(item) => (
                    <List.Item style={{ padding: '12px 0' }}>
                        <List.Item.Meta
                            avatar={
                                <Badge status={item.type === 'success' ? 'success' : item.type === 'warning' ? 'warning' : 'default'} dot offset={[0, 25]}>
                                    <Avatar size="small" icon={<ClockCircleOutlined />} style={{ backgroundColor: '#f0f2f5', color: '#8c8c8c' }} />
                                </Badge>
                            }
                            title={<Text style={{ fontSize: '13px' }}>{item.text}</Text>}
                            description={<Text type="secondary" style={{ fontSize: '11px' }}>{formatTime(item.time)}</Text>}
                        />
                    </List.Item>
                )}
            />
        </Card>
    );
};

export default ActivityFeed;
