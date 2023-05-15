import React, { Component, useEffect, useState } from 'react';
import AuthLayout from '../../components/common/AuthLayout';
import EventRepository from '../../repository/EventRepository';
import { Button, DatePicker, Form, Input, Modal, Space, Table } from 'antd';
import { DeleteOutlined, EditOutlined, SubnodeOutlined } from '@ant-design/icons';
import { useForm } from 'antd/es/form/Form';
import { openNotification } from '../../helpers/OpenNotification';
import PerformanceTime from './PerformanceTime';

const Events = (props) => {
    const [events, setEvents] = useState([]);

    const initalizeEvent = async () => {
        try {
            const data = await EventRepository.events(0, 10);
            if (!data.error) {
                setEvents([...data.data]);
            }
        } catch (error) {
            console.log(error);
        }
    }
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Location',
            dataIndex: 'location',
            key: 'location',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Start Date',
            dataIndex: 'startDate',
            key: 'startDate',
        },
        {
            title: 'End Date',
            dataIndex: 'endDate',
            key: 'endDate',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <div><EditOutlined /></div>
                    <div><DeleteOutlined /></div>
                    <div><SubnodeOutlined /></div>
                </Space>
            ),
        },
    ];

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = useForm();
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onFinish = async (values) => {
        const res = await EventRepository.createEvent(values);
        if (!res.error) {
            openNotification("Success Message ", "Event Saved Success", 'success');
            initalizeEvent();
            form.resetFields();
        }
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        initalizeEvent();
    }, [])

    return (
        <AuthLayout>
            <div>
                <Space align='right'>
                    <Button onClick={showModal}>Add new</Button>
                    <Modal title="Event Form" open={isModalOpen} footer={[]} onOk={handleOk} onCancel={handleCancel}>
                        <Form
                            name="event"
                            labelCol={{
                                span: 4,
                            }}
                            wrapperCol={{
                                span: 16,
                            }}
                            style={{
                                maxWidth: 600,
                            }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Form.Item
                                label="Name"
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Event Name is Required',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Location"
                                name="location"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Event Location is Required',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Date"
                                name="date"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Event Date is required',
                                    },
                                ]}
                            >
                                <DatePicker style={{ width: '100%' }} />
                            </Form.Item>

                            <Form.Item
                                label="Start Date"
                                name="startDate"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Event Start Date is required',
                                    },
                                ]}
                            >
                                <DatePicker showTime={true} style={{ width: '100%' }} format="YYYY-MM-DD HH:mm:ss" />
                            </Form.Item>

                            <Form.Item
                                label="End Date"
                                name="endDate"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Event End Date is required',
                                    },
                                ]}
                            >
                                <DatePicker showTime={true} style={{ width: '100%' }} format="YYYY-MM-DD HH:mm:ss" />
                            </Form.Item>

                            <Form.Item
                            >
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </Modal>
                </Space>
                <Table expandable={{
                    expandedRowRender: (record) => (
                        <div>
                            <div>
                                <h4>Performance Time</h4>
                            </div>
                            <PerformanceTime eventId={record.id} />
                        </div>
                    ),
                    rowExpandable: (record) => record.name !== 'Not Expandable',
                }} columns={columns} dataSource={events.map(ev => ({ key: ev.id, ...ev }))} />
            </div>
        </AuthLayout>
    );
}

export default Events;