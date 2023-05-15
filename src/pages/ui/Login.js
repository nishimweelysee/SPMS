import { Button, Checkbox, Form, Input } from 'antd';
import UserRepository from '../../repository/UserRepository';
import { openNotification } from '../../helpers/OpenNotification';
import { useNavigate } from 'react-router-dom';
import { UserRoute } from '../../helpers/Constants';

const Login = (props) => {
    const navigate = useNavigate();
    const onFinish = async (values) => {
        try {
            const res = await UserRepository.login(values);
            if (!res.error) {
                openNotification("Success", res.message, 'success');
                window.localStorage.setItem("userInfo", JSON.stringify(res));
                navigate(UserRoute.dashborad);
            }
        } catch (error) {
            console.log('error:', error.message);
        }
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (<div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        padding: '10px',
    }}>
        <Form
            name="basic"
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            style={{
                maxWidth: 600,
            }}
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="Username"
                name="username"
                rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
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
                        message: 'Please input your password!',
                    },
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    </div>
    )
};
export default Login;