import React from 'react'
import { Upload, Icon, Modal, Message, Progress } from 'antd';
import { upload } from 'utils'
const { uploadImageLimit } = require('../../../utils/config')

let uid = -1

class PicturesWall extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      previewVisible: false,
      previewImage: '',
      percent: 0
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.fileList !== nextProps.fileList) {
      const { fileList } = nextProps
      uid = fileList && fileList.length > 0 ? fileList[fileList.length - 1].uid - 1 : -1
    }
  }

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true
    });
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

  uploadRequest = (config) => {
    const { form: { setFieldsValue }, fileList, field } = this.props
    const { file, onSuccess } = config
    let currentUID = uid
    let images = fileList
    images.push({
      uid,
      name: file.name,
      status: 'uploading'
    })
    setFieldsValue({ [field]: [].concat(images) })
    upload.send({
      ...config,
      onSuccess: (res) => onSuccess(res, currentUID)
    }, { prefix: 'test' })
  }

  handleSuccess = ({ data }, file, uid) => {
    const { key } = data
    const { form: { setFieldsValue }, fileList: images, field } = this.props
    images.forEach(image => {
      if (image.uid === uid) {
        image.url = `http://pq1kytk8k.bkt.clouddn.com/${key}`
        image.status = 'done'
      }
    })
    setFieldsValue({ [field]: images })
  }

  handleProgress = ({ percent }) => {
    this.setState({ percent })
  }

  handleRemove = ({ uid }) => {
    const { form: { setFieldsValue }, fileList: prevList, field } = this.props
    const fileList = prevList.filter((item) => item.uid !== uid)
    setFieldsValue({ [field]: fileList })
  }

  render() {
    const { number, fileList } = this.props
    const { previewVisible, previewImage, percent } = this.state;
    const uploadButton = (
      <div>
        <Icon type='plus' />
        <div className='ant-upload-text'>Upload</div>
      </div>
    );
    return (
      <div className='clearfix'>
        <Upload
          action='http://upload-z2.qiniup.com'
          listType='picture-card'
          fileList={fileList}
          beforeUpload={this.handleBeforeUpload}
          customRequest={this.uploadRequest}
          onPreview={this.handlePreview}
          onSuccess={this.handleSuccess}
          onProgress={this.handleProgress}
          onRemove={this.handleRemove}
        >
          {fileList.length >= number ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt='example' style={{ width: '100%' }} src={previewImage} />
        </Modal>
        <Progress percent={Number(percent)} />
      </div>
    );
  }
}

PicturesWall.defaultProps = {
  fileList: [],
  field: 'images'
}

export default PicturesWall
