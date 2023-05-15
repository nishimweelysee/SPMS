const { notification } = require("antd");

export const openNotification = (message, description,type) => {
    notification[type]({
        message,
        description,
    });
}