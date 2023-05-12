import React, { Component } from 'react';
import AuthLayout from '../../components/common/AuthLayout';
import { Button } from 'antd';

class Index extends Component {
    render() {
        return (
            <AuthLayout>
                <Button>Submit</Button>
            </AuthLayout>
        );
    }
}

export default Index;