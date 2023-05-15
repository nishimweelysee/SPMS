import React, { useEffect, useState } from 'react';
import AuthLayout from '../../components/common/AuthLayout';
import EventRepository from '../../repository/EventRepository';
import { Button, Form, Modal, Select, Space, Table } from 'antd';
import { baseUrl } from '../../repository/Repository';
import FileUploadCmp from '../../components/common/FileUploadCmp';
import { useForm } from 'antd/es/form/Form';
import { openNotification } from '../../helpers/OpenNotification';

const Contracts = () => {
    const [contracts,setContracts] = useState([]);
    const initalizeContracts = async () => {
        try {
            const data = await EventRepository.getContracts(0, 10);
            if (!data.error) {
                setContracts([...data.data]);
            }
        } catch (error) {
            console.log(error);
        }
    }
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

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = useForm();
    const showModal = () => {
        initalizeArtists();
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onFinish = async (values) => {
        const res = await EventRepository.createContract(values);
        if (!res.error) {
            openNotification("Success Message ", "Contract Success", 'success');
            initalizeContracts();
            form.resetFields();
        }
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const [selectedArists,setSelectedArtist] = useState(null);
    useEffect(() => {
        initalizeContracts();
    }, [])

    const columns = [
        {
            title: 'Artist',
            key: 'artist',
            render: (_, { artist }) => (<>{artist.firstName+" "+artist.lastName}</>)
        },
        {
            title: 'Doc Name',
            key: 'file.name',
            render: (_, { file }) => (<>{file.name}</>)
        },
        {
            title: 'Download',
            key: 'file.download',
            render: (_, { file }) => (<a target='_blank' href={baseUrl+'/files/'+file.id}>Download</a>)
        },
    ]

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
                                label="Select Artist"
                                name="artist"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Artist is Required',
                                    },
                                ]}
                            >
                                <Select onSelect={e=>setSelectedArtist(e)} showSearch options={artists.map(a=>({value:a.id,label:a.firstName+" "+a.lastName}))} />
                            </Form.Item>
                            {selectedArists !=null && <Form.Item
                                label="Location"
                                name="location"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Event Location is Required',
                                    },
                                ]}
                            >
                                <FileUploadCmp id={selectedArists} initalizeContracts={initalizeContracts} />
                            </Form.Item>}
                        </Form>
                    </Modal>
                </Space>
            </div>
            <Table columns={columns} dataSource={contracts.map(ev => ({ key: ev.id, ...ev }))} />
        </AuthLayout>
    );
};

export default Contracts;