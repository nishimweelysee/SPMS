import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import { baseUrl } from '../../repository/Repository';
import { getUserData } from '../../helpers/Constants';
const { Dragger } = Upload;
const FileUploadCmp = ({id,initalizeContracts}) => {
    const props = {
        name: 'file',
        multiple: false,
        action: `${baseUrl}/contract/${id}`,
        headers: {
            Authorization: 'Bearer '+getUserData().authenticationToken,
        },
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
                return initalizeContracts();
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };
    return (<Dragger {...props}>
        <p className="ant-upload-drag-icon">
            <InboxOutlined />
        </p>
        <p className="ant-upload-text">Click or drag file to this area to upload</p>
        <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibited from uploading company data or other
            banned files.
        </p>
    </Dragger>)
};
export default FileUploadCmp;