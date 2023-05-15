import Repository, { baseUrl } from './Repository';
import { getUserData } from '../helpers/Constants';
import {openNotification} from '../helpers/OpenNotification';

class EventRepository {
    constructor(callback) {
        this.callback = callback;
    }
    async events(page,size) {
        try {
            const response = await Repository.get(`${baseUrl}/event?page=${page}&size=${size}`, {
                headers: {
                    Authorization: 'Bearer '+getUserData().authenticationToken,
                },
            });
            return response.data;
        } catch (error) {
            const errorMessage = (error.response) ? error.response.data.error || error.response.data.message  || error.response.data.messageValue : JSON.stringify(error.message)
            openNotification("Error Message ",errorMessage,'error');
            return { error: errorMessage || "Error Occured"};
        }
    }

    async createEvent(values) {
        try {
            const response = await Repository.post(`${baseUrl}/event`,values, {
                headers: {
                    Authorization: 'Bearer '+getUserData().authenticationToken,
                },
            });
            return response.data;
        } catch (error) {
            const errorMessage = (error.response) ? error.response.data.error || error.response.data.message  || error.response.data.messageValue : JSON.stringify(error.message)
            openNotification("Error Message ",errorMessage,'error');
            return { error: errorMessage || "Error Occured"};
        }
    }

    async getArtists(page,size) {
        try {
            const response = await Repository.get(`${baseUrl}/users/artists?page=${page}&size=${size}`, {
                headers: {
                    Authorization: 'Bearer '+getUserData().authenticationToken,
                },
            });
            return response.data;
        } catch (error) {
            const errorMessage = (error.response) ? error.response.data.error || error.response.data.message  || error.response.data.messageValue : JSON.stringify(error.message)
            openNotification("Error Message ",errorMessage,'error');
            return { error: errorMessage || "Error Occured"};
        }
    }

    async createArists(values) {
        values.userType='ARTIST';
        try {
            const response = await Repository.post(`${baseUrl}/auth/register`,values, {
                headers: {
                    Authorization: 'Bearer '+getUserData().authenticationToken,
                },
            });
            return response.data;
        } catch (error) {
            const errorMessage = (error.response) ? error.response.data.error || error.response.data.message  || error.response.data.messageValue : JSON.stringify(error.message)
            openNotification("Error Message ",errorMessage,'error');
            return { error: errorMessage || "Error Occured"};
        }
    }

    //Contracts
    async getContracts(page,size){
        try {
            const response = await Repository.get(`${baseUrl}/contract?page=${page}&size=${size}`, {
                headers: {
                    Authorization: 'Bearer '+getUserData().authenticationToken,
                },
            });
            return response.data;
        } catch (error) {
            const errorMessage = (error.response) ? error.response.data.error || error.response.data.message  || error.response.data.messageValue : JSON.stringify(error.message)
            openNotification("Error Message ",errorMessage,'error');
            return { error: errorMessage || "Error Occured"};
        }
    }

    async createContract(values){
        try {
            const response = await Repository.post(`${baseUrl}/event`,values, {
                headers: {
                    Authorization: 'Bearer '+getUserData().authenticationToken,
                },
            });
            return response.data;
        } catch (error) {
            const errorMessage = (error.response) ? error.response.data.error || error.response.data.message  || error.response.data.messageValue : JSON.stringify(error.message)
            openNotification("Error Message ",errorMessage,'error');
            return { error: errorMessage || "Error Occured"};
        }
    }

    async getPerformanceTime(eventId,page,size){
        try {
            const response = await Repository.get(`${baseUrl}/time/${eventId}?page=${page}&size=${size}`, {
                headers: {
                    Authorization: 'Bearer '+getUserData().authenticationToken,
                },
            });
            return response.data;
        } catch (error) {
            const errorMessage = (error.response) ? error.response.data.error || error.response.data.message  || error.response.data.messageValue : JSON.stringify(error.message)
            openNotification("Error Message ",errorMessage,'error');
            return { error: errorMessage || "Error Occured"};
        }
    }
}

export default new EventRepository();
