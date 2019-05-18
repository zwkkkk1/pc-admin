import React from 'react'
import { connect } from 'dva'
import { mapStateToProps, mapDispatchToProps } from './connect'
import { ProductTable } from '../../product'

@connect(mapStateToProps, mapDispatchToProps)
class Collect extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      productVisible: false,
      item: null
    }
  }

  toggleVisible = (key, item = null) => () => {
    this.setState(prevState => ({
      item,
      [key]: !prevState[key]
    }))
  }

  render() {
    const { collection, getCollection, delCollect } = this.props
    return (
      <div>
        <h4>我的收藏</h4>
        <ProductTable
          getList={getCollection}
          list={collection}
          exclude={['status']}
          renderAction={['view', (text, record) => (
              <a onClick={() => delCollect(record.pid).then(() => getCollection())}>取消收藏</a>
          )]}
        />
      </div>
    )
  }
}

export default Collect