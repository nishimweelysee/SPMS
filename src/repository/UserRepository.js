import { openNotification } from '~/utilities/notification-helpers';
import Repository, { baseUrl } from './Repository';

class UserRepository {
    constructor(callback) {
        this.callback = callback;
    }

    async register(payload) {
        try {
            const response = await Repository.post(`${baseUrl}/vendor/signup`, payload);
            return response.data;
        } catch (error) {
            const errorMessage = (error.response) ? error.response.data.error || error.response.data.message  || error.response.data.messageValue : JSON.stringify(error.message)
            openNotification('Error Message', errorMessage, 'error');
            return { error: errorMessage || "Error Occured"};
        }
    }

    async login(payload) {
        try {
            const response = await Repository.post(`${baseUrl}/auth/login`, payload);
            return response.data;
        } catch (error) {
            const errorMessage = (error.response) ? error.response.data.error || error.response.data.message  || error.response.data.messageValue : JSON.stringify(error.message)
            openNotification('Error Message', errorMessage, 'error');
            return { error: errorMessage || "Error Occured"};
        }
    }

    //get user profile by id with token
    async getProfile(id, token) {
        try {
            const response = await Repository.get(`${baseUrl}/user/findUserInfo{userId}?userId=${id}`, {
                headers: {
                    Authorization: token,
                },
            });
            return response.data;
        } catch (error) {
            const errorMessage = (error.response) ? error.response.data.error || error.response.data.message  || error.response.data.messageValue : JSON.stringify(error.message)
            openNotification('Error Message', errorMessage, 'error');
            return { error: errorMessage || "Error Occured"};
        }
    }
}

export default new UserRepository();
