import * as React from 'react';
import { Icon, Modal, Upload } from 'antd';

export default class PallWrop extends React.Component {
  state = {
    previewVisible: false,
    previewImage: ''
  };

  handlePreview = file => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true
    });
  };
  render() {
    const { fileList, imgNumber,onChange } = this.props;
    const list = fileList||[]
    const { previewVisible, previewImage } = this.state;
    const uploadButton = (
      <div>
        <Icon type='plus' />
        <div className='ant-upload-text'>Upload</div>
      </div>
    );
    return (
      <div className='clearfix'>
        <Upload
          action='http://localhost:7001/api/upload'
          listType='picture-card'
          fileList={list}
          onChange={onChange}
          onPreview={this.handlePreview}
        >
          {list.length >= imgNumber ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt='example' style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}