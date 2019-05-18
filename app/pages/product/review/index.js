import React from 'react'
import { connect } from 'dva'
import { Divider, Modal, Message, Input } from 'antd'
import { mapStateToProps, mapDispatchToProps } from './connect'
import { ProductTable } from '../'

import './style'

const confirm = Modal.confirm
const { TextArea } = Input

@connect(mapStateToProps, mapDispatchToProps)
class Review extends React.Component {
  state = {
    item: null,  // 暂存数据
    reviewFailVisible: false
  }

  toggleVisible = (key, item = null) => () => {
    this.setState(prevState => ({
      item,
      [key]: !prevState[key]
    }))
  }

  handleSubmit = () => {
    const value = this.failRef.textAreaRef.value
    const { _id } = this.state.item
    this.props.productEdit({ status: -2, extra: value }, _id )
      .then(() => this.toggleVisible('reviewFailVisible'))
      .then(() => this.tableRef.getWrappedInstance().getList())
  }

  render() {
    const { reviewFailVisible } = this.state
    const { productEdit } = this.props
    return (
      <div>
        <ProductTable
          ref={(node) => this.tableRef = node}
          args={{ status: -1 }}
          exclude={['status']}
          renderAction={['view', (text, record) => (
            <span>
              <a onClick={() => (
                confirm({
                  title: '商品审核',
                  content: '确认通过该商品审核',
                  onOk: () => (
                    productEdit({ status: 1 }, record._id)
                      .then(() => this.tableRef.getWrappedInstance().getList())
                      .then(() => Message.success('审核成功', 1))
                ) })
              )}
              >审核通过</a>
              <Divider type='vertical' />
              <a onClick={this.toggleVisible('reviewFailVisible', record)}>审核失败</a>
            </span>
          )]}
        />
        <Modal
          title='审核失败原因'
          visible={reviewFailVisible}
          onOk={this.handleSubmit}
          onCancel={this.toggleVisible('reviewFailVisible')}
        >
          <TextArea placeholder='请填写审核未通过原因' ref={(node) => this.failRef = node} />
        </Modal>
      </div>
    )
  }
}

export default Review