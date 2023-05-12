import { notification } from 'antd';
import Repository, { baseUrl } from './Repository';
import { SmileOutlined } from '@ant-design/icons';

class EventRepository {
    constructor(callback) {
        this.callback = callback;
    }
    async events(token,page,size) {
        try {
            token='Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhaW1lIiwiaWF0IjoxNjgzODQwNjg4LCJleHAiOjE2ODM4NTg2ODh9.i5LUOj51IHzaaFk3BjGh3DkDXnVYBupKVx0J3-cDlz-C050goPFTxvswPCzm6x3S6X_hJ8DA1bW-VZx6-blEfw';
            const response = await Repository.get(`${baseUrl}/event?page=0&size=10`, {
                headers: {
                    Authorization: token,
                },
            });
            return response.data;
        } catch (error) {
            const errorMessage = (error.response) ? error.response.data.error || error.response.data.message  || error.response.data.messageValue : JSON.stringify(error.message)
            notification({
                message: errorMessage,
                description: errorMessage,
                icon: <SmileOutlined style={{ color: '#108ee9' }}/>
            });
            return { error: errorMessage || "Error Occured"};
        }
    }
}

export default new EventRepository();
