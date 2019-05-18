import React from 'react'
import { Table, Button, Modal, Divider, Popconfirm } from 'antd'
import { connect } from 'dva'
import { formatDate } from 'utils'
import { mapStateToProps, mapDispatchToProps } from './connect'
import Form from './component/form'

const dataSetKey = (data) => data.map((item, index) => ({
    ...item,
    key: `${item.name}_${index}`,
    children: item.children.map((child) => ({ ...child, key: `${item.name}_${child.name}` }))
  }
))

@connect(mapStateToProps, mapDispatchToProps)
class Category extends React.PureComponent {
  state = {
    visible: false,
    confirmLoading: false,
    categoryLevel: 1,
    shouldUpdate: false
  }

  componentDidMount() {
    const { getCategoryList } = this.props
    getCategoryList({ level: 1 })
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (!this.state.shouldUpdate && nextState.shouldUpdate) {
      const { getCategoryList } = this.props
      getCategoryList({ level: 1 })
      this.setState({ shouldUpdate: false })
    }
    return true
  }

  saveFormRef = form => this.form = form

  showAddModal = (level = 0, id) => () => {
    this.setState({
      visible: true,
      categoryLevel: level + 1
    })
    if (id) {
      setTimeout(() => {
        this.form.setFieldsValue({ parentID: id })
      }, 0)
    }
  }

  showEditModal = ({ level, ...rest }) => () => {
    this.setState({ visible: true, categoryLevel: level }, () => {
      setTimeout(() => {
        this.form.setFieldsValue(rest)
      }, 0)
    })
  }

  handleOk = () => {
    const { CategoryAdd } = this.props
    const { categoryLevel } = this.state
    this.form.validateFields(async (err, values) => {
      if (!err) {
        this.setState({ confirmLoading: true });
        const result = await CategoryAdd({ ...values, level: categoryLevel })
        if (result) {
          this.setState({ confirmLoading: false, visible: false }, () => {
            this.setState({ shouldUpdate: true })
          });
        }
      }
    });
    this.form.resetFields()
  }

  handleCancel = () => {
    this.form.resetFields()
    this.setState({ visible: false, confirmLoading: false });
  }

  handleDelete = (id) => async () => {
    const { CategoryDelete } = this.props
    const result = await CategoryDelete(id)
    if (result) {
      this.setState({ shouldUpdate: true })
    }
  }

  render() {
    const { list } = this.props
    const { visible, confirmLoading } = this.state
    const columns = [{
      title: '名称',
      dataIndex: 'name',
      key: 'name'
    }, {
      title: '建立时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text) => (<span>{formatDate(text)}</span>)
    }, {
      title: '操作',
      key: 'operation',
      render: (text, record) => {
        const { level, _id } = record
        return (<div>
          <a onClick={this.showEditModal(record)}>编辑</a>
          <Divider type='vertical' />
          <Popconfirm title='你确定删除该类目？' onConfirm={this.handleDelete(_id)}>
            <a>删除</a>
          </Popconfirm>
          {level < 2 && (
            <span>
              <Divider type='vertical' />
              <a onClick={this.showAddModal(level, _id)}>添加子类目</a>
            </span>
          )}
        </div>)
      }
    }];

    return (
      <div>
        <Button style={{ marginBottom: '10px' }} type='primary' onClick={this.showAddModal()}>添加一级类目</Button>
        <Table
          columns={columns}
          dataSource={dataSetKey(list)}
        />
        <Modal
          title='类目管理'
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
          cancelText='取消'
          okText='确定'
          keyboard
        >
          <Form ref={this.saveFormRef} />
        </Modal>
      </div>
    )
  }
}

export default Category