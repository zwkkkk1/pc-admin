import React from 'react'
import { Icon, Progress } from 'antd';
import { Upload } from 'components'
import { upload } from 'utils'

class PicturesWall extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      percent: 0
    }
    this.uid = -1
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.fileList !== nextProps.fileList) {
      const { fileList } = nextProps
      this.uid = fileList && fileList.length > 0 ? fileList[fileList.length - 1].uid - 1 : -1
    }
  }

  uploadRequest = (config) => {
    const { form: { setFieldsValue }, fileList, field } = this.props
    const { file, onSuccess } = config
    let currentUID = this.uid
    fileList.push({
      uid: currentUID,
      name: file.name,
      status: 'uploading'
    })
    setFieldsValue({ [field]: [].concat(fileList) })
    upload.send({
      ...config,
      onSuccess: (res) => onSuccess(res, currentUID)
    }, { prefix: 'product' })
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

  onFileChange = (fileList) => {
    console.log('file change >>> ', fileList)
  }

  render() {
    const { number, fileList } = this.props
    const { percent } = this.state
    const uploadButton = (
      <div>
        <Icon type='plus' />
        <div className='ant-upload-text'>Upload</div>
      </div>
    );
    return (
      <div className='clearfix'>
        <Upload
          fileList={fileList}
          customRequest={this.uploadRequest}
          onSuccess={this.handleSuccess}
          onProgress={this.handleProgress}
          onRemove={this.handleRemove}
          onChange={this.onFileChange}
        >
          {fileList.length >= number ? null : uploadButton}
        </Upload>
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
