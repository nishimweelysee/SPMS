import React, { Component, useEffect, useState } from 'react';
import AuthLayout from '../../components/common/AuthLayout';
import EventRepository from '../../repository/EventRepository';
import { Button, Space, Table } from 'antd';
import { DeleteOutlined, EditOutlined, SubnodeOutlined } from '@ant-design/icons';

const Events = (props) => {
    const [events, setEvents] = useState([]);

    const initalizeEvent = async () => {
        const data = await EventRepository.events("", 0, 10);
        console.log(data);
        if (!data.error) {
            setEvents([...data.data]);
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

    useEffect(() => {
        initalizeEvent();
    }, [])

    return (
        <AuthLayout>
            <div>
                <Space  align='right'>
                    <Button>Add new</Button>
                </Space>
                <Table columns={columns} dataSource={events.map(ev => ({ key: ev.id, ...ev }))} />
            </div>
        </AuthLayout>
    );
}

export default Events;