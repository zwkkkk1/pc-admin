import React from 'react'
import { Layout } from 'antd'
import BreadCrumb from '../BreadCrumb'

const { Header, Content } = Layout;

export default class DocumentLayout extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      subName: '首页',
      name: '',
    }
    const { breadCrumb } = this.props
    document.title = breadCrumb ? breadCrumb.split('/')[1] : '后台管理'
  }

  componentWillMount() {
    const { onEnter } = this.props
    onEnter && onEnter()
  }

  componentDidMount() {
    const { breadCrumb } = this.props
    if (breadCrumb) {
      const arr = breadCrumb.split('/')
      this.setState({ subName: arr[0], name: arr[1] })
    }
  }

  render() {
    const { subName, name } = this.state
    return (
      <Layout>
        <Header className='layout-header'>
          <BreadCrumb subName={subName} name={name} />
        </Header>
        <Content className='layout-content'>
          {React.Children.only(this.props.children)}
        </Content>
      </Layout>
    )
  }
}