import React from 'react'
import { Statistic, Row, Col } from 'antd'
import { config } from 'utils'
import { connect } from 'dva'
import { mapStateToProps, mapDispatchToProps } from './connect'
import './style.scss'

const renderSolgan = () => {
  const length = config.solgan.length
  const random = Math.floor(Math.random() * 1000 % length)
  return config.solgan[random]
}

@connect(mapStateToProps, mapDispatchToProps)
class Home extends React.PureComponent {
  render() {
    const { user, count: { product, frontUser, backUser } } = this.props
    const solgan = renderSolgan()
    return (
      <div className='home-wrapper'>
        <Row gutter={16}>
          {typeof product !== 'undefined' && <Col span={24 / user.level}>
            <Statistic title='在库商品' value={product} />
          </Col>}
          {typeof frontUser !== 'undefined' && <Col span={24 / user.level}>
            <Statistic title='前台用户' value={frontUser} />
          </Col>}
          {typeof backUser !== 'undefined' && <Col span={24 / user.level}>
            <Statistic title='后台用户' value={backUser} />
          </Col>}
        </Row>
        {solgan && <p className='home-solgan'>{solgan}</p>}
      </div>
    )
  }
}

export default Home