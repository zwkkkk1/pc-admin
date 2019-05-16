import React from 'react'
import { Icon, Progress } from 'antd';
import { Upload } from 'components'
import { uploadOSS } from 'utils'

class PicturesWall extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      percent: 0,
      fileList: []
    }
    this.hasInit = !props.needInit
    this.uid = -1
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.fileList !== nextProps.fileList && !this.hasInit) {
      const { fileList } = nextProps
      const newlist = fileList.map(item => {
        if (typeof item === 'string') {
          return { uid: this.uid--, url: item, status: 'done' }
        } else {
          return item
        }
      })
      this.setState({
        fileList: newlist
      })
      this.hasInit = true
    }
  }

  uploadRequest = (config) => {
    const { form: { setFieldsValue }, field } = this.props
    const { fileList: prevList } = this.state
    const { file } = config
    const fileList = [ ...prevList, {
      uid: this.uid,
      name: file.name,
      status: 'uploading'
    }]
    setFieldsValue({ [field]: [].concat(fileList) })
    uploadOSS.send(config, { prefix: 'product' })
  }

  handleProgress = ({ percent }) => {
    this.setState({ percent })
  }

  handleRemove = ({ uid }) => {
    const { form: { setFieldsValue }, field } = this.props
    const { fileList: prevList } = this.state
    const fileList = prevList.filter((item) => item.uid !== uid)
    setFieldsValue({ [field]: fileList.map((item) => item.url) })
  }

  onFileChange = ({ fileList }) => {
    const { form: { setFieldsValue }, field } = this.props
    this.setState({ fileList: [...fileList]})
    setFieldsValue({ [field]: fileList.map((file) => {
        try{
          const { url, response } = file
          return url ? url : response.url
        } catch(err) {
          console.log(err)
        }
      })
    })
  }

  render() {
    const { number } = this.props
    const { percent, fileList } = this.state
    const uploadButton = (
      <div>
        <Icon type='plus' />
        <div className='ant-upload-text'>上传</div>
      </div>
    );
    return (
      <div className='clearfix'>
        <Upload
          fileList={fileList}
          customRequest={this.uploadRequest}
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
