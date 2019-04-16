import React from 'react'
import { Upload, Icon, Modal, Message } from 'antd';
import { request, getYMD } from 'utils'
import axios from 'axios'
const { uploadImageLimit } = require('../../../utils/config')

let imgUid = -1

class PicturesWall extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      previewVisible: false,
      previewImage: '',
      fileList: this.props.list.map(item => ({ uid: imgUid--, url: item }))
    }
  }

  componentDidMount() {
    this.props.form.setFieldsValue({
      images: this.state.fileList
    })
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
    const { action, filename, file, onSuccess, onError, onProgress } = config
    const formData = new FormData()
    formData.append(filename, file);
    request
      .post('/common/qiniuToken')
      .then(token => {
        formData.append('key', `${getYMD()}_${Date.now()}`)
        formData.append('token', token)
        formData.append('x:filename', file.name)
        axios.post(action, formData, {
          onUploadProgress: ({ total, loaded }) => {
            console.log('onUploadProgress', loaded, total, Math.round(loaded / total * 100).toFixed(2))
            onProgress({ percent: Math.round(loaded / total * 100).toFixed(2) }, file)
          }
        })
        .then((res) => {
          onSuccess(res, file)
        })
        .catch(onError)
      })
  }

  handleSuccess = ({ data }) => {
    const { key } = data
    this.setState(prevState => {
      prevState.fileList.push({
        url: `http://pq1kytk8k.bkt.clouddn.com/${key}`,
        status: 'done',
        name: data['x:filename'],
        uid: imgUid--
      })
      return {
        fileList: prevState.fileList
      }
    })
  }

  handleRemove = (file) => {
    this.setState(prevState => ({
      fileList: prevState.fileList.filter((item) => item.uid !== file.uid)
    }));
  }

  showProgress = ({ percent }, file) => {
    console.log('onProgress >>>', percent, file.name)
  }

  render() {
    const { number } = this.props
    const { previewVisible, previewImage, fileList = []} = this.state;
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
          onProgress={this.showProgress}
          onSuccess={this.handleSuccess}
          onRemove={this.handleRemove}
        >
          {fileList.length >= number ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt='example' style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

export default PicturesWall
