import React from 'react'
import { Upload, Modal, Message } from 'antd'
const { uploadImageLimit } = require('../../../../utils/config')

class myUpload extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      previewVisible: false,
      previewImage: ''
    }
  }

  handleBeforeUpload = (file) => {
    const { name, size } = file
    const { type, limit } = uploadImageLimit
    if (type.indexOf(name.split('.')[name.split('.').length - 1]) === -1) {
      Message.error('只能上传jpg、jpeg、png、gif后缀图片')
      return false
    }
    if (size > limit) {
      Message.error(`只能上传小于${Math.floor(limit / 1024 / 1024)}M的图片`)
      return false
    }
    return true
  }

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true
    });
  }

  render() {
    const { children, ...restProps } = this.props
    const { previewVisible, previewImage } = this.state;
    return (
      <div className='clearfix'>
        <Upload
          {...restProps}
          action='http://upload-z2.qiniup.com'
          listType='picture-card'
          onPreview={this.handlePreview}
          beforeUpload={this.handleBeforeUpload}
        >
          {children}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt='example' style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    )
  }
}

export default myUpload