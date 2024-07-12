import { Card, Col, Form, Input, Row } from 'antd';

const TenantForm = () => {
    return (
        <Row>
            <Col span={24}>
                <Card title="Basic info" bordered={false} style={{ width: '100%' }}>
                    <Row gutter={20}>
                        <Col span={12}>
                            <Form.Item
                                label="Name"
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Name is required',
                                    },
                                ]}>
                                <Input size="large" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Address"
                                name="address"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Address is required',
                                    },
                                ]}>
                                <Input size="large" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Card>
            </Col>
        </Row>
    );
};

export default TenantForm;
