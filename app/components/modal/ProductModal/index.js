import React from 'react'
import { connect } from 'dva'
import { Modal, Button } from 'antd'
import { formatPrice } from 'utils'
import { mapStateToProps, mapDispatchToProps } from './connect'
import ModalLine from './line'

import './style'

@connect(mapStateToProps, mapDispatchToProps)
class ProductModal extends React.PureComponent {
  render() {
    const { visible, handleOk, item: { name, category, mainImages, images, price, desc } } = this.props
    return (
      <Modal
        title='商品信息'
        visible={visible}
        onCancel={handleOk}
        footer={[
          <Button key='ok' type='primary' onClick={handleOk}>确定</Button>
        ]}
      >
        <ModalLine title='商品名称：' content={name} />
        <ModalLine title='商品类目：' content={category.map(item => item.name).join(' / ')} />
        <ModalLine title='商品图片：' content={mainImages.map((img, index) => <img className='product-image' key={index} src={img} />)} />
        <ModalLine title='商品描述：' content={desc} />
        <ModalLine title='商品价格：' content={`￥${formatPrice(price)}`} />
        <ModalLine title='图文详情：' content={images.map((img, index) => <img className='product-image' key={index} src={img} />)} />
      </Modal>
    )
  }
}

export default ProductModal