import React, { useState } from 'react';
import {
    Table, Card, Tag, Space, Button, Typography, Modal, Input, Select, Row, Col,
    Statistic, Progress, message, Tabs, Tooltip, Badge, Dropdown, Menu, Empty
} from 'antd';
import {
    EyeOutlined, EditOutlined, DeleteOutlined, SearchOutlined, FilterOutlined,
    DownloadOutlined, MailOutlined, PhoneOutlined, UserOutlined,
    ArrowUpOutlined, InboxOutlined, CheckCircleOutlined, ClockCircleOutlined,
    MoreOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const ContactSubmissions = () => {
    const [searchText, setSearchText] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingRecord, setEditingRecord] = useState(null);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    // Mock Data
    const [data, setData] = useState(Array.from({ length: 15 }).map((_, i) => ({
        key: i,
        id: `SUB-${1000 + i}`,
        companyName: i % 3 === 0 ? `HealthCorp ${i}` : `MediCare Clinics ${i}`,
        contactPerson: `Dr. User ${i}`,
        email: `user${i}@example.com`,
        phone: `+962 79 ${String(Math.floor(Math.random() * 10000000)).padStart(8, '0')}`,
        industry: i % 4 === 0 ? 'Hospital' : i % 4 === 1 ? 'Private Clinic' : 'Insurance',
        size: i % 2 === 0 ? '50-200' : '200+',
        message: 'We are interested in integrating the symptom checker into our patient portal to improve triage efficiency. Please provide pricing details.',
        status: ['New', 'Contacted', 'Demo Scheduled', 'Converted', 'Lost'][Math.floor(Math.random() * 5)],
        date: new Date(Date.now() - Math.floor(Math.random() * 1000000000)).toISOString().split('T')[0],
        notes: i % 5 === 0 ? 'Follow up next week' : '',
        isRead: Math.random() > 0.3 // 70% chance of being read
    })));

    // Computed Stats
    const stats = {
        total: data.length,
        new: data.filter(d => d.status === 'New').length,
        unread: data.filter(d => !d.isRead).length,
        converted: data.filter(d => d.status === 'Converted').length,
        conversionRate: data.length > 0 ? Math.round((data.filter(d => d.status === 'Converted').length / data.length) * 100) : 0
    };

    // Helper for Status Tags
    const StatusTag = ({ status }) => {
        let color = '#d9d9d9';
        let bg = '#f5f5f5';
        let borderColor = '#f0f0f0';

        if (status === 'New') { color = '#1677ff'; bg = '#e6f4ff'; borderColor = '#91caff'; }
        if (status === 'Contacted') { color = '#fa8c16'; bg = '#fff7e6'; borderColor = '#ffd591'; }
        if (status === 'Demo Scheduled') { color = '#722ed1'; bg = '#f9f0ff'; borderColor = '#d3adf7'; }
        if (status === 'Converted') { color = '#389e0d'; bg = '#f6ffed'; borderColor = '#b7eb8f'; }
        if (status === 'Lost') { color = '#cf1322'; bg = '#fff1f0'; borderColor = '#ffa39e'; }

        return (
            <div className="status-tag" style={{ color: color, background: bg, border: `1px solid ${borderColor}` }}>
                <div className="status-tag-dot" style={{ background: color }}></div>
                {status}
            </div>
        );
    };

    const handleToggleRead = (e, key) => {
        e.stopPropagation(); // Prevent row click
        setData(prev => prev.map(item => item.key === key ? { ...item, isRead: !item.isRead } : item));
        message.success('Status updated');
    };

    const columns = [
        {
            title: 'SEEN',
            dataIndex: 'isRead',
            key: 'isRead',
            width: 70,
            align: 'center',
            render: (isRead, record) => (
                <Tooltip title={isRead ? "Mark as Unread" : "Mark as Read"}>
                    <div
                        onClick={(e) => handleToggleRead(e, record.key)}
                        style={{
                            fontSize: '16px',
                            color: isRead ? '#1677ff' : '#d9d9d9',
                            display: 'flex',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            transition: 'color 0.2s'
                        }}
                    >
                        <i className="ri-check-double-line" style={{ fontStyle: 'normal' }}>
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                                <path d="M11.602 13.7599L13.014 15.1719L21.4795 6.7063L22.8938 8.12051L13.014 18.0003L6.65 11.6363L8.06421 10.2221L11.602 13.7599ZM11.6037 10.9322L16.5563 5.97949L17.9666 7.38977L13.014 12.3424L11.6037 10.9322ZM8.77698 16.5873L7.36396 18.0003L1 11.6363L2.41421 10.2221L8.77698 16.5873Z"></path>
                            </svg>
                        </i>
                    </div>
                </Tooltip>
            )
        },
        {
            title: 'Company',
            dataIndex: 'companyName',
            key: 'companyName',
            width: 250,
            render: (text, record) => (
                <Space direction="vertical" size={2}>
                    <Text strong style={{ fontSize: '15px', color: record.isRead ? 'inherit' : '#1e293b' }}>{text}</Text>
                    <Text type="secondary" style={{ fontSize: '12px' }}>{record.industry} • {record.size}</Text>
                </Space>
            ),
        },
        {
            title: 'Contact',
            key: 'contact',
            render: (_, record) => (
                <Space direction="vertical" size={2}>
                    <Space size={6}>
                        <UserOutlined style={{ color: '#94a3b8', fontSize: '12px' }} />
                        <Text style={{ fontSize: '13px' }}>{record.contactPerson}</Text>
                    </Space>
                    <Space size={6}>
                        <MailOutlined style={{ color: '#94a3b8', fontSize: '12px' }} />
                        <Text type="secondary" style={{ fontSize: '12px' }}>{record.email}</Text>
                    </Space>
                </Space>
            )
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: 180,
            render: status => <StatusTag status={status} />,
            filters: [
                { text: 'New', value: 'New' },
                { text: 'Contacted', value: 'Contacted' },
                { text: 'Converted', value: 'Converted' },
            ],
            onFilter: (value, record) => record.status === value,
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            width: 120,
            render: date => <Text style={{ color: '#64748b' }}>{date}</Text>,
            sorter: (a, b) => new Date(a.date) - new Date(b.date),
        },
        {
            title: '',
            key: 'actions',
            width: 60,
            render: (_, record) => (
                <Dropdown menu={{ items: getRowActions(record) }} trigger={['click']}>
                    <Button type="text" icon={<MoreOutlined style={{ fontSize: '18px', color: '#94a3b8' }} />} />
                </Dropdown>
            ),
        },
    ];
    const getRowActions = (record) => [
        { key: 'view', label: 'View Details', icon: <EyeOutlined />, onClick: () => handleView(record) },
        { key: 'contact', label: 'Mark Contacted', icon: <PhoneOutlined />, onClick: () => handleRowStatusChange(record.key, 'Contacted') },
        { type: 'divider' },
        { key: 'delete', label: 'Delete', icon: <DeleteOutlined />, danger: true, onClick: () => handleDelete(record.key) },
    ];

    const handleRowStatusChange = (key, status) => {
        setData(prev => prev.map(item => item.key === key ? { ...item, status } : item));
        message.success(`Status updated to ${status}`);
    }

    const handleView = (record) => {
        // Optimistic update: mark as read immediately
        if (!record.isRead) {
            setData(prev => prev.map(item => item.key === record.key ? { ...item, isRead: true } : item));
        }
        setEditingRecord({ ...record });
        setIsModalVisible(true);
    };

    const handleDelete = (key) => {
        Modal.confirm({
            title: 'Delete Submission',
            content: 'Are you sure you want to permanently remove this lead?',
            okText: 'Delete',
            okType: 'danger',
            onOk: () => {
                setData(data.filter(item => item.key !== key));
                message.success('Submission deleted');
            },
        });
    };

    const handleBulkDelete = () => {
        Modal.confirm({
            title: `Delete ${selectedRowKeys.length} items?`,
            content: 'This action cannot be undone.',
            okText: 'Delete All',
            okType: 'danger',
            onOk: () => {
                setData(data.filter(item => !selectedRowKeys.includes(item.key)));
                setSelectedRowKeys([]);
                message.success(`${selectedRowKeys.length} submissions deleted`);
            },
        });
    };

    // CSV Export Function
    const handleExport = () => {
        if (data.length === 0) {
            message.warning('No data to export');
            return;
        }

        const headers = ['ID', 'Company Name', 'Contact Person', 'Email', 'Phone', 'Industry', 'Size', 'Status', 'Date', 'Message', 'Is Read'];
        const csvContent = [
            headers.join(','),
            ...data.map(row => [
                row.id,
                `"${row.companyName}"`,
                `"${row.contactPerson}"`,
                row.email,
                row.phone,
                `"${row.industry}"`,
                `"${row.size}"`,
                row.status,
                row.date,
                `"${row.message.replace(/"/g, '""')}"`,
                row.isRead ? 'Yes' : 'No'
            ].join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `contact_submissions_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        message.success('Export started');
    };

    const handleSave = () => {
        setData(data.map(item => (item.key === editingRecord.key ? editingRecord : item)));
        setIsModalVisible(false);
        message.success('Changes saved successfully');
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: (keys) => setSelectedRowKeys(keys),
    };

    return (
        <div className="fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                    <Title level={2} style={{ margin: 0, letterSpacing: '-0.5px' }}>Contact Submissions</Title>
                    <Text type="secondary">Track and manage B2B leads</Text>
                </div>
                <Space>
                    <Button type="default" onClick={() => setData(prev => prev.map(item => ({ ...item, isRead: true })))}>Mark All Read</Button>
                    <Button icon={<DownloadOutlined />} onClick={handleExport}>Export CSV</Button>
                </Space>
            </div>

            {/* Analytics Cards */}
            <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
                <Col xs={12} sm={6}>
                    <Card bordered={false} className="stat-card" bodyStyle={{ padding: '16px' }}>
                        <Statistic
                            title="Total Leads"
                            value={stats.total}
                            prefix={<InboxOutlined style={{ color: '#1677ff', backgroundColor: '#e6f4ff', padding: '6px', borderRadius: '6px' }} />}
                        />
                    </Card>
                </Col>
                <Col xs={12} sm={6}>
                    <Card bordered={false} className="stat-card" bodyStyle={{ padding: '16px' }}>
                        <Statistic
                            title="Unread"
                            value={stats.unread}
                            prefix={<ClockCircleOutlined style={{ color: '#f5222d', backgroundColor: '#fff1f0', padding: '6px', borderRadius: '6px' }} />}
                        />
                    </Card>
                </Col>
                <Col xs={12} sm={6}>
                    <Card bordered={false} className="stat-card" bodyStyle={{ padding: '16px' }}>
                        <Statistic
                            title="Converted"
                            value={stats.converted}
                            prefix={<CheckCircleOutlined style={{ color: '#722ed1', backgroundColor: '#f9f0ff', padding: '6px', borderRadius: '6px' }} />}
                        />
                    </Card>
                </Col>
                <Col xs={12} sm={6}>
                    <Card bordered={false} className="stat-card" bodyStyle={{ padding: '16px' }}>
                        <Statistic
                            title="Win Rate"
                            value={stats.conversionRate}
                            suffix="%"
                            prefix={<ArrowUpOutlined style={{ color: '#fa8c16', backgroundColor: '#fff7e6', padding: '6px', borderRadius: '6px' }} />}
                        />
                    </Card>
                </Col>
            </Row>

            <Row gutter={[24, 24]}>
                <Col xs={24} lg={17}>
                    <Card
                        bordered={false}
                        className="stat-card"
                        style={{ borderRadius: '12px', overflow: 'hidden' }}
                        bodyStyle={{ padding: 0 }}
                    >
                        <div style={{ padding: '16px', borderBottom: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1 }}>
                                <Input
                                    placeholder="Search..."
                                    prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />}
                                    style={{ width: '100%', maxWidth: '300px' }}
                                    allowClear
                                    onChange={e => setSearchText(e.target.value)}
                                />
                                {selectedRowKeys.length > 0 && (
                                    <Button type="primary" danger size="small" onClick={handleBulkDelete}>
                                        Delete ({selectedRowKeys.length})
                                    </Button>
                                )}
                            </div>
                            <Button icon={<FilterOutlined />}>Filter</Button>
                        </div>
                        <Table
                            rowSelection={rowSelection}
                            className="submissions-table"
                            columns={columns}
                            dataSource={data.filter(item =>
                                item.companyName.toLowerCase().includes(searchText.toLowerCase()) ||
                                item.email.toLowerCase().includes(searchText.toLowerCase())
                            )}
                            pagination={{ pageSize: 8, showTotal: (total) => `Total ${total} entries` }}
                            locale={{ emptyText: <Empty description="No submissions found" image={Empty.PRESENTED_IMAGE_SIMPLE} /> }}
                        />
                    </Card>
                </Col>

                <Col xs={24} lg={7}>
                    <Space direction="vertical" size="large" style={{ width: '100%' }}>
                        <Card title="Funnel Status" bordered={false} className="stat-card" size="small">
                            <Space direction="vertical" style={{ width: '100%' }} size="middle">
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}><Text>Demo</Text><Text type="secondary">45%</Text></div>
                                    <Progress percent={45} strokeColor="#722ed1" showInfo={false} size="small" />
                                </div>
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}><Text>Contacted</Text><Text type="secondary">30%</Text></div>
                                    <Progress percent={30} strokeColor="#fa8c16" showInfo={false} size="small" />
                                </div>
                            </Space>
                        </Card>

                        <Card title="Top Industries" bordered={false} className="stat-card" size="small">
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                <Tag color="cyan">Hospitals (40%)</Tag>
                                <Tag color="blue">Clinics (35%)</Tag>
                                <Tag color="purple">Insurance (15%)</Tag>
                            </div>
                        </Card>
                    </Space>
                </Col>
            </Row>

            <Modal
                title={null} // Custom header inside body
                open={isModalVisible}
                onOk={handleSave}
                onCancel={() => setIsModalVisible(false)}
                width={700}
                centered
                okText="Save Updates"
                destroyOnClose
            >
                {editingRecord && (
                    <div>
                        <div style={{ paddingBottom: '16px', borderBottom: '1px solid #f0f0f0', marginBottom: '16px' }}>
                            <Title level={4} style={{ margin: 0 }}>{editingRecord.companyName}</Title>
                            <Space style={{ marginTop: '8px' }}>
                                <Tag color="blue">{editingRecord.industry}</Tag>
                                <Tag>{editingRecord.size} Employees</Tag>
                            </Space>
                        </div>

                        <Tabs defaultActiveKey="1" items={[
                            {
                                key: '1',
                                label: 'Details',
                                children: (
                                    <Row gutter={[24, 24]} style={{ marginTop: '10px' }}>
                                        <Col span={12}>
                                            <Text type="secondary" style={{ fontSize: '12px' }}>CONTACT PERSON</Text>
                                            <div style={{ fontSize: '15px', fontWeight: 500 }}>{editingRecord.contactPerson}</div>
                                        </Col>
                                        <Col span={12}>
                                            <Text type="secondary" style={{ fontSize: '12px' }}>SUBMISSION DATE</Text>
                                            <div style={{ fontSize: '15px' }}>{editingRecord.date}</div>
                                        </Col>
                                        <Col span={12}>
                                            <Text type="secondary" style={{ fontSize: '12px' }}>EMAIL</Text>
                                            <div><a href={`mailto:${editingRecord.email}`}>{editingRecord.email}</a></div>
                                        </Col>
                                        <Col span={12}>
                                            <Text type="secondary" style={{ fontSize: '12px' }}>PHONE</Text>
                                            <div>{editingRecord.phone}</div>
                                        </Col>
                                        <Col span={24}>
                                            <Card size="small" style={{ background: '#f8fafc', borderRadius: '6px' }} bordered={false}>
                                                <Text type="secondary" style={{ fontSize: '11px', fontWeight: 600 }}>ORIGINAL MESSAGE</Text>
                                                <p style={{ marginTop: '4px', marginBottom: 0 }}>{editingRecord.message}</p>
                                            </Card>
                                        </Col>
                                    </Row>
                                )
                            },
                            {
                                key: '2',
                                label: 'Manage & Notes',
                                children: (
                                    <div style={{ marginTop: '10px' }}>
                                        <div style={{ marginBottom: '16px' }}>
                                            <Text strong>Status</Text>
                                            <Select
                                                style={{ width: '100%', marginTop: '8px' }}
                                                value={editingRecord.status}
                                                onChange={(val) => setEditingRecord({ ...editingRecord, status: val })}
                                            >
                                                {['New', 'Contacted', 'Demo Scheduled', 'Converted', 'Lost'].map(s => (
                                                    <Option key={s} value={s}>{s}</Option>
                                                ))}
                                            </Select>
                                        </div>
                                        <div>
                                            <Text strong>Internal Notes</Text>
                                            <TextArea
                                                rows={4}
                                                style={{ marginTop: '8px' }}
                                                value={editingRecord.notes}
                                                onChange={(e) => setEditingRecord({ ...editingRecord, notes: e.target.value })}
                                                placeholder="Write your notes here..."
                                            />
                                        </div>
                                    </div>
                                )
                            }
                        ]} />
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default ContactSubmissions;
