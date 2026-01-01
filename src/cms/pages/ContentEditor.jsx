import React, { useState, useEffect } from 'react';
import {
    Typography, Card, Tabs, Button, Space,
    Breadcrumb, message, Row, Col, Divider,
    Input, Form, Select, Collapse
} from 'antd';
import {
    SaveOutlined,
    EyeOutlined,
    EditOutlined,
    PlusOutlined,
    DeleteOutlined
} from '@ant-design/icons';
import { useContent } from '../hooks/useContent';
import RichTextEditor from '../components/RichTextEditor';

const { Title, Text } = Typography;
const { Panel } = Collapse;

const ContentEditor = () => {
    const { content, updateContent } = useContent();
    const [activeLang, setActiveLang] = useState('en');
    const [localContent, setLocalContent] = useState(content);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        setLocalContent(content);
    }, [content]);

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => {
            updateContent(localContent);
            setIsSaving(false);
            message.success('All content published successfully!');
        }, 800);
    };

    const updateField = (path, value) => {
        setLocalContent(prev => {
            const newContent = JSON.parse(JSON.stringify(prev)); // Deep clone
            const keys = path.split('.');
            let current = newContent[activeLang];

            for (let i = 0; i < keys.length - 1; i++) {
                if (!current[keys[i]]) current[keys[i]] = {};
                current = current[keys[i]];
            }
            current[keys[keys.length - 1]] = value;
            return newContent;
        });
    };

    const updateListItem = (section, index, field, value) => {
        setLocalContent(prev => {
            const newContent = JSON.parse(JSON.stringify(prev));
            newContent[activeLang][section].items[index][field] = value;
            return newContent;
        });
    };

    const t = localContent[activeLang] || {};

    const items = [
        {
            key: 'nav',
            label: 'Navbar & Navigation',
            children: (
                <Form layout="vertical">
                    <Form.Item label="Main CTA Button Label">
                        <Input value={t.nav?.cta} onChange={(e) => updateField('nav.cta', e.target.value)} />
                    </Form.Item>
                    <Divider>Menu Items</Divider>
                    {t.nav?.items?.map((item, idx) => (
                        <Row gutter={16} key={idx} style={{ marginBottom: '10px' }}>
                            <Col span={12}>
                                <Form.Item label={`Link ${idx + 1} Label`}>
                                    <Input
                                        value={item.label}
                                        onChange={(e) => {
                                            const newItems = [...t.nav.items];
                                            newItems[idx].label = e.target.value;
                                            updateField('nav.items', newItems);
                                        }}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label={`Link ${idx + 1} URL`}>
                                    <Input
                                        value={item.href}
                                        onChange={(e) => {
                                            const newItems = [...t.nav.items];
                                            newItems[idx].href = e.target.value;
                                            updateField('nav.items', newItems);
                                        }}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                    ))}
                </Form>
            ),
        },
        {
            key: 'hero',
            label: 'Hero Section',
            children: (
                <Form layout="vertical">
                    <Form.Item label="Main Heading">
                        <Input value={t.hero?.title} onChange={(e) => updateField('hero.title', e.target.value)} />
                    </Form.Item>
                    <Form.Item label="Sub-headline (Rich Text)">
                        <RichTextEditor value={t.hero?.subtitle} onChange={(val) => updateField('hero.subtitle', val)} />
                    </Form.Item>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Primary CTA Label">
                                <Input value={t.hero?.cta_primary} onChange={(e) => updateField('hero.cta_primary', e.target.value)} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Secondary CTA Label">
                                <Input value={t.hero?.cta_secondary} onChange={(e) => updateField('hero.cta_secondary', e.target.value)} />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            ),
        },
        {
            key: 'stats',
            label: 'Stats & Impact',
            children: (
                <Form layout="vertical">
                    <Form.Item label="Section Title">
                        <Input value={t.stats?.title} onChange={(e) => updateField('stats.title', e.target.value)} />
                    </Form.Item>
                    <Form.Item label="Section Subtitle">
                        <Input value={t.stats?.subtitle} onChange={(e) => updateField('stats.subtitle', e.target.value)} />
                    </Form.Item>
                    <Divider>Stat Cards</Divider>
                    <Collapse accordion>
                        {t.stats?.items?.map((item, idx) => (
                            <Panel header={item.title || `Stat ${idx + 1}`} key={idx}>
                                <Form.Item label="Icon (Emoji)">
                                    <Input value={item.icon} onChange={(e) => updateListItem('stats', idx, 'icon', e.target.value)} />
                                </Form.Item>
                                <Form.Item label="Title">
                                    <Input value={item.title} onChange={(e) => updateListItem('stats', idx, 'title', e.target.value)} />
                                </Form.Item>
                                <Form.Item label="Description">
                                    <Input.TextArea value={item.desc} onChange={(e) => updateListItem('stats', idx, 'desc', e.target.value)} />
                                </Form.Item>
                            </Panel>
                        ))}
                    </Collapse>
                </Form>
            ),
        },
        {
            key: 'benefits',
            label: 'Benefits',
            children: (
                <Form layout="vertical">
                    <Form.Item label="Section Title">
                        <Input value={t.benefits?.title} onChange={(e) => updateField('benefits.title', e.target.value)} />
                    </Form.Item>
                    <Form.Item label="Section Subtitle">
                        <Input value={t.benefits?.subtitle} onChange={(e) => updateField('benefits.subtitle', e.target.value)} />
                    </Form.Item>
                    <Divider>Benefit Cards</Divider>
                    <Collapse accordion>
                        {t.benefits?.items?.map((item, idx) => (
                            <Panel header={item.title || `Benefit ${idx + 1}`} key={idx}>
                                <Form.Item label="Icon (Emoji)">
                                    <Input value={item.icon} onChange={(e) => updateListItem('benefits', idx, 'icon', e.target.value)} />
                                </Form.Item>
                                <Form.Item label="Title">
                                    <Input value={item.title} onChange={(e) => updateListItem('benefits', idx, 'title', e.target.value)} />
                                </Form.Item>
                                <Form.Item label="Description">
                                    <Input.TextArea value={item.desc} onChange={(e) => updateListItem('benefits', idx, 'desc', e.target.value)} />
                                </Form.Item>
                            </Panel>
                        ))}
                    </Collapse>
                </Form>
            ),
        },
        {
            key: 'how',
            label: 'How It Works',
            children: (
                <Form layout="vertical">
                    <Form.Item label="Section Title">
                        <Input value={t.how?.title} onChange={(e) => updateField('how.title', e.target.value)} />
                    </Form.Item>
                    <Form.Item label="Section Subtitle">
                        <Input value={t.how?.subtitle} onChange={(e) => updateField('how.subtitle', e.target.value)} />
                    </Form.Item>
                    <Divider>Process Steps</Divider>
                    <Collapse accordion>
                        {t.how?.steps?.map((step, idx) => (
                            <Panel header={step.title || `Step ${idx + 1}`} key={idx}>
                                <Form.Item label="Step Number/Icon">
                                    <Input
                                        value={step.num}
                                        onChange={(e) => {
                                            const newSteps = [...t.how.steps];
                                            newSteps[idx].num = e.target.value;
                                            updateField('how.steps', newSteps);
                                        }}
                                    />
                                </Form.Item>
                                <Form.Item label="Step Title">
                                    <Input
                                        value={step.title}
                                        onChange={(e) => {
                                            const newSteps = [...t.how.steps];
                                            newSteps[idx].title = e.target.value;
                                            updateField('how.steps', newSteps);
                                        }}
                                    />
                                </Form.Item>
                                <Form.Item label="Description">
                                    <Input.TextArea
                                        value={step.desc}
                                        onChange={(e) => {
                                            const newSteps = [...t.how.steps];
                                            newSteps[idx].desc = e.target.value;
                                            updateField('how.steps', newSteps);
                                        }}
                                    />
                                </Form.Item>
                            </Panel>
                        ))}
                    </Collapse>
                </Form>
            ),
        },
        {
            key: 'footer',
            label: 'Footer & Contact',
            children: (
                <Form layout="vertical">
                    <Title level={5}>Company Info</Title>
                    <Form.Item label="About Title">
                        <Input value={t.footer?.about_title} onChange={(e) => updateField('footer.about_title', e.target.value)} />
                    </Form.Item>
                    <Form.Item label="About Description">
                        <Input.TextArea value={t.footer?.about_desc} onChange={(e) => updateField('footer.about_desc', e.target.value)} />
                    </Form.Item>
                    <Divider />
                    <Title level={5}>Contact Details</Title>
                    <Form.Item label="Support Title">
                        <Input value={t.footer?.contact_title} onChange={(e) => updateField('footer.contact_title', e.target.value)} />
                    </Form.Item>
                    <Form.Item label="Email">
                        <Input value={t.footer?.email} onChange={(e) => updateField('footer.email', e.target.value)} />
                    </Form.Item>
                    <Form.Item label="Location">
                        <Input value={t.footer?.location} onChange={(e) => updateField('footer.location', e.target.value)} />
                    </Form.Item>
                    <Form.Item label="Copyright Text">
                        <Input value={t.footer?.copyright} onChange={(e) => updateField('footer.copyright', e.target.value)} />
                    </Form.Item>
                </Form>
            ),
        }
    ];

    return (
        <div style={{ padding: '24px' }}>
            <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <Breadcrumb items={[{ title: 'CMS' }, { title: 'Full Site Editor' }]} />
                    <Title level={2} style={{ margin: '8px 0 0' }}>Global Content Editor</Title>
                </div>
                <Space>
                    <Select
                        value={activeLang}
                        onChange={setActiveLang}
                        options={[{ label: 'English', value: 'en' }, { label: 'Arabic', value: 'ar' }]}
                        style={{ width: 120 }}
                    />
                    <Button type="primary" icon={<SaveOutlined />} loading={isSaving} onClick={handleSave}>
                        Publish All Changes
                    </Button>
                </Space>
            </div>

            <Row gutter={24}>
                <Col span={14}>
                    <Card bordered={false}>
                        <Tabs items={items} type="card" />
                    </Card>
                </Col>

                <Col span={10}>
                    <div style={{ position: 'sticky', top: '88px' }}>
                        <Card title={<><EyeOutlined /> Real-time Preview</>} bordered={false}>
                            <div style={{
                                direction: activeLang === 'ar' ? 'rtl' : 'ltr',
                                maxHeight: '70vh',
                                overflowY: 'auto',
                                border: '1px solid #f0f0f0',
                                borderRadius: '8px',
                                padding: '24px'
                            }}>
                                <div style={{ marginBottom: '40px' }}>
                                    <span className="preview-badge">Hero Section</span>
                                    <h1 style={{ fontSize: '28px', fontWeight: '800', lineHeight: '1.2' }}>{t.hero?.title}</h1>
                                    <div dangerouslySetInnerHTML={{ __html: t.hero?.subtitle }} style={{ fontSize: '16px', color: '#666', margin: '16px 0' }} />
                                    <Space>
                                        <Button type="primary">{t.hero?.cta_primary}</Button>
                                        <Button>{t.hero?.cta_secondary}</Button>
                                    </Space>
                                </div>

                                <Divider />

                                <div>
                                    <span className="preview-badge">Stats Section</span>
                                    <h2 style={{ fontSize: '20px' }}>{t.stats?.title}</h2>
                                    <p style={{ color: '#8c8c8c' }}>{t.stats?.subtitle}</p>
                                    <Row gutter={[16, 16]} style={{ marginTop: '16px' }}>
                                        {t.stats?.items?.slice(0, 2).map((item, idx) => (
                                            <Col span={12} key={idx}>
                                                <div style={{ background: '#f9f9f9', padding: '12px', borderRadius: '8px' }}>
                                                    <div style={{ fontSize: '20px' }}>{item.icon}</div>
                                                    <div style={{ fontWeight: 'bold' }}>{item.title}</div>
                                                </div>
                                            </Col>
                                        ))}
                                    </Row>
                                </div>

                                <Divider />

                                <div style={{ fontSize: '12px', color: '#bfbfbf', textAlign: 'center' }}>
                                    {t.footer?.copyright}
                                </div>
                            </div>
                            <div style={{ marginTop: '16px' }}>
                                <Text type="secondary" style={{ fontSize: '12px' }}>
                                    * Preview shows select sections. Global styles and animations are applied on the live site.
                                </Text>
                            </div>
                        </Card>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default ContentEditor;
