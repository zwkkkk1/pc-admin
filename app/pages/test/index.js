import React from 'react';
import { Form, Button } from 'antd';
import PallWrop from './Pallwrop';
const FormItem = Form.Item;
@Form.create()
class Test extends React.Component {
  state = {
    fileList: [
      {
        status: 'done',
        uid: 0,
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
      }
    ]
  };

  componentDidMount() {
    const { form } = this.props;
    const { fileList } = this.state;
    form.setFieldsValue({ pictures: fileList });
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  handleOnChange = ({ fileList }) => {
    console.log('change >>>', fileList)
    return fileList.map(file => ({
      status: file.status,
      uid: file.uid,
      url: file.response?file.response.data.url:file.url
    }));
  };

  render() {
    const {
      form: { getFieldDecorator }
    } = this.props;
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem label={'商店实景图'}>
          {getFieldDecorator('pictures', {
            valuePropName: 'fileList',
            getValueFromEvent: this.handleOnChange
          })(<PallWrop imgNumber={3} />)}
        </FormItem>
        <FormItem label={'商店实景图'}>
          {getFieldDecorator('ddd', {
            valuePropName: 'fileList',
            getValueFromEvent: this.handleOnChange
          })(<PallWrop imgNumber={1} />)}
        </FormItem>
        <Form.Item wrapperCol={{ offset: 6 }}>
          <Button type='primary' htmlType='submit'>添加</Button>
          <Button className='back-btn'>返回</Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Test
