import React, { useEffect, useState } from 'react';
import AuthLayout from '../../components/common/AuthLayout';
import { Button, Form, Input, Modal, Select, Space, Table } from 'antd';
import EventRepository from '../../repository/EventRepository';
import { openNotification } from '../../helpers/OpenNotification';
import { useForm } from 'antd/es/form/Form';
import { EditOutlined } from '@ant-design/icons';
const Artists = () => {
    const [artists, setArtists] = useState([]);
    const initalizeArtists = async () => {
        try {
            const data = await EventRepository.getArtists(0, 10);
            if (!data.error) {
                setArtists([...data.data]);
            }
        } catch (error) {
            console.log(error);
        }
    }
    const columns = [
        {
            title: 'First Name',
            dataIndex: 'firstName',
            key: 'firstName',
        },
        {
            title: 'Last Name',
            dataIndex: 'lastName',
            key: 'lastName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'User Name',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Genre',
            dataIndex: 'genre',
            key: 'genre',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <div><EditOutlined /></div>
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
        const res = await EventRepository.createArists(values);
        if (!res.error) {
            openNotification("Success Message ", "Arist Saved Success", 'success');
            initalizeArtists();
            form.resetFields();
        }
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        initalizeArtists();
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
                                label="First Name"
                                name="firstName"
                                rules={[
                                    {
                                        required: true,
                                        message: 'First is Required',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Last Name"
                                name="lastName"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Last Name is Required',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="E-mail"
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Email is required',
                                    },
                                ]}
                            >
                                <Input type='email' />
                            </Form.Item>

                            <Form.Item
                                label="User Name"
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: 'User name is required',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Password is required',
                                    },
                                ]}
                            >
                                <Input.Password defaultValue={"1234"} />
                            </Form.Item>

                            <Form.Item
                                label="Genre"
                                name="genre"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Genre is required',
                                    },
                                ]}
                            >
                                <Select options={[
                                    {
                                        value: 'LEGGE',
                                        label: 'LEGGE',
                                    },
                                    {
                                        value: 'POP',
                                        label: 'POP',
                                    },
                                    {
                                        value: 'RNB',
                                        label: 'RNB',
                                    },
                                    {
                                        value: 'GOSPEL',
                                        label: 'GOSPEL',
                                    },{
                                        value: 'CLASSIC',
                                        label: 'CLASSIC',
                                    },
                                    {
                                        value: 'JAZZ',
                                        label: 'JAZZ',
                                    },
                                    {
                                        value: 'ROCK',
                                        label: 'ROCK',
                                    },
                                    {
                                        value: 'SLOW_COUNTRY',
                                        label: 'SLOW_COUNTRY',
                                    },]} />
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
                <Table columns={columns} dataSource={artists.map(ev => ({ key: ev.id, ...ev }))} />
            </div>
        </AuthLayout>
    );
};

export default Artists;