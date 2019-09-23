import React from 'react'
import {Button, Form, Icon, Input, notification} from "antd"
import axios from "axios"

const FormItem = Form.Item;

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class EditForm extends React.Component {
    constructor(props) {
        super(props);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                axios.post('/api/edit', {
                    id: this.props.data,
                    name: this.props.form.getFieldValue('name'),
                    code: this.props.form.getFieldValue('code')
                }).then(res => {
                    if (res.data.code === 20000) {
                        this.props.handleEdit(res.data.cb);
                    } else {
                        notification.error({
                            message: '修改失败',
                            description: '',
                            duration: 2
                        })
                    }
                }).catch(error => {
                    console.log(error)
                })
            }
        })
    };

    render() {
        return <Form onSubmit={this.handleSubmit}>
            <FormItem>
                {this.props.form.getFieldDecorator('name', {
                    rules: [{
                        min: 1, max: 18, message: '长度在1到18个字符'
                    }, {
                        required: true, message: '请输入机位名'
                    }]
                })(
                    <Input prefix={<Icon type="video-camera"/>} placeholder="机位名"/>
                )}
            </FormItem>
            <FormItem>
                {this.props.form.getFieldDecorator('code', {
                    rules: [{
                        min: 1, max: 18, message: '长度在1到18个字符'
                    }, {
                        required: true, whitespace: true, message: '请输入串流码'
                    }, {
                        pattern: '[A-Za-z0-9]', message: '只能输入数字，英文字母和下划线'
                    }]
                })(
                    <Input prefix={<Icon type="code"/>} placeholder="串流码"/>
                )}
            </FormItem>
            <FormItem>
                <Button type="primary" block htmlType="submit"
                        disabled={hasErrors(this.props.form.getFieldsError())}>修改</Button>
            </FormItem>
        </Form>
    }
}

const Edit = Form.create()(EditForm);

export default Edit