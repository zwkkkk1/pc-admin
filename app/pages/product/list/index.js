import React from 'react'
import { connect } from 'dva'
import { Divider } from 'antd'
import { ProductModal } from 'components'
import { mapStateToProps, mapDispatchToProps } from './connect'
import { ProductTable, ProductSearch } from '../'

@connect(mapStateToProps, mapDispatchToProps)
class List extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      productVisible: false,
      item: null
    }

    this.tableRef = React.createRef()
  }

  componentDidMount = async () => {
    const { getCollection } = this.props
    await getCollection()
  }

  toggleVisible = (key, item = null) => () => {
    this.setState(prevState => ({
      item,
      [key]: !prevState[key]
    }))
  }

  render() {
    const { item, productVisible } = this.state
    const { addCollect, delCollect, getCollection } = this.props
    const renderCollect = (record, { collection }) => (
      Object.keys(collection.data).indexOf(record._id) !== -1 ? (
        <a onClick={() => delCollect(record._id).then(() => getCollection())}>取消收藏</a>
      ) : (
        <a onClick={() => addCollect(record).then(() => getCollection())}>收藏</a>
      ))

    return (
      <div>
        <ProductSearch />
        <ProductTable
          exclude={['status']}
          ref={this.tableRef}
          args={{ status: 1 }}
          renderAction={(text, record) => (
            <span>
              <a onClick={this.toggleVisible('productVisible', record)}>查看</a>
              <Divider type='vertical' />
              {renderCollect(record, this.props)}
            </span>
          )}
        />
        {item && <ProductModal visible={productVisible} handleOk={this.toggleVisible('productVisible')} item={item} />}
      </div>
    )
  }
}

export default List