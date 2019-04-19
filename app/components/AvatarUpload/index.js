import React from 'react'
import { Icon } from 'antd';
import { Upload } from 'components'
import { upload } from 'utils'

import './style.scss'

class Avatar extends React.Component {
  constructor(props) {
    super(props)
    this.state =  {
      loading: false
    }
  }

  handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true })
      return;
    }
    if (info.file.status === 'done') {
      this.setState({ loading: false })
    }
  }

  uploadRequest = (config) => {
    const { form: { setFieldsValue } } = this.props
    const { file } = config
    setFieldsValue({ avatar: { name: file.name, status: 'uploading' } })
    upload.send(config, { prefix: 'avatar' })
  }

  handleSuccess = (...rest) => {
    console.log('success >>> ', rest)
  }

  render() {
    console.log('avatar >>> ', this.props)
    const { value: imageUrl } = this.props
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className='ant-upload-text'>Upload</div>
      </div>
    );
    return (
      <Upload
        name='avatar'
        listType='picture-card'
        className='avatar-uploader'
        customRequest={this.uploadRequest}
        onChange={this.handleChange}
        onSuccess={this.handleSuccess}
        showUploadList={false}
      >
        {imageUrl ? <img src={imageUrl} className='avatar-img' alt='avatar' /> : uploadButton}
      </Upload>
    );
  }
}

export default Avatar
