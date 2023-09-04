import logo from './logo.svg';
import {
  SearchOutlined,
  AppleOutlined,
  MailOutlined,
  SettingOutlined,
  AppstoreOutlined,
  UserOutlined
} from '@ant-design/icons';
import { React, useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { DownOutlined } from '@ant-design/icons';
import { Button, Divider, Space, notification, Checkbox, Form, AutoComplete, Input, Popover, Layout, Menu, Drawer, message, List, Typography, Alert, Radio, Dropdown } from 'antd';
import './styles.css';
import { BASE_HOST } from './http';
import img from './img/img.jpg';
import { makeAutoObservable, makeObservable, observable, action, observe } from 'mobx';
import { observer } from 'mobx-react'
import { useLocalStore } from 'mobx-react-lite';


const { Header, Sider, Content } = Layout;


const items = [
  {
    label: (
      <a href="http://localhost:3002/" target="_blank" rel="noopener noreferrer">
        首页
      </a>
    ),
    key: 'mail',
  },
  {
    label: (
      <a href="http://localhost:3002/learning" target="_blank" rel="noopener noreferrer">
        知学堂
      </a>
    ),
    key: 'app',
  },
  {
    label: (
      <a href="http://localhost:3002/vip" target="_blank" rel="noopener noreferrer">
        会员
      </a>
    ),
    key: 'SubMenu',
  },
  {
    label: (
      <a href="http://localhost:3002/explore" target="_blank" rel="noopener noreferrer">
        发现
      </a>
    ),
    key: 'alipay',
  },
  {
    label: (
      <a href="http://localhost:3002/question" target="_blank" rel="noopener noreferrer">
        等你来答
      </a>
    ),
    key: 'answer',
  },
];

const data = [
  '知乎用户IyfZlK  邀请你回答问题 马上结束了 可以对我说一句生日快乐吗？',
  '小凤  邀请你回答问题 你好陌生人，你能告诉我，被爱的的前提是一定得漂亮嘛？',
  'saga咪菟  邀请你回答问题 错怪孩子要道歉吗?',
  '二月垂耳兔  邀请你回答问题 156cm 92斤算胖吗？男朋友让我减肥？',
  '一座城池  邀请你回答问题 陌生人，如果你遇到没结果却很喜欢的人，你会怎么办？',
  '一场触及灵魂的旅行  邀请你回答问题 要不要为了男朋友放弃升本？',
  '伤心爆米花  邀请你回答问题 如果回到过去，你会选择哪一年？'
];

const content = (
  <div className='xinxi'>
    <List
      size="large"
      bordered
      dataSource={data}
      renderItem={(item) => <List.Item>{item}</List.Item>}
    />
  </div>
)

const renderItem = (title, count) => ({
  value: title,
  label: (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      {title}
      <span>
        <UserOutlined /> {count}
      </span>
    </div>
  ),
});
const options = [
  {
    options: [renderItem('年轻人只有city work'), renderItem('离职之后怎么退出工作群'), renderItem('陕西发现一例猴痘病例'), renderItem('今日入伏'), renderItem('航班遇严重颠覆')],
  }
];

const onFinishFailed = (errorInfo) => {

};



const App = () => {
  const [current, setCurrent] = useState('mail');
  const [count, setCount] = useState(0);
  const [userCommit, setUserCommit] = useState('');

  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  const [open, setOpen] = useState(false);
  const hide = () => {
    setOpen(false);
  };
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  const requestAdd = async () => {
    const response = await fetch(`${BASE_HOST}/api/increment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        likeNumSize: count
      })
    });
    const data = await response.json();
    return Promise.resolve(data)
  }

  const addNumber = async () => {
    const newCount = await requestAdd();
    setCount(newCount.data);
  }

  const yhContent = (
    <div >
      <div><a>我的主页</a></div>
      <div><a>登录</a></div>
      <div><a>关怀版</a></div>
      <div><a>设置</a></div>
      <a onClick={hide}>关闭</a>
    </div>
  )

  class Store {
    users = [];
    posts = []

    constructor() {
      makeAutoObservable(this);
    }
  }

  const store = new Store

  const Nav = () => {
    const navigate = useNavigate();
    const follow = () => {
      navigate('/follow');
    }
    const home = () => {
      navigate('/');
    }
    const hot = () => {
      navigate('/hot');
    }
    const video = () => {
      navigate('/video');
    }
    return <div>
      <a className='follow' onClick={follow}>关注</a>
      <a className='home' onClick={home}>推荐</a>
      <a className='hot' onClick={hot}>热点</a>
      <a className='video' onClick={video}>视频</a>
    </div>
  }
  const Follow = () => {
    const { users, posts } = useLocalStore(() => ({
      users: store.users,
      posts: store.posts
    }));
    return (
      <div>
        <Nav></Nav>
        {users.map(u => <div style={{ color: 'black' }}>{u}</div>)}
        {posts.map(p => <div style={{ color: 'black' }}>{p}</div>)}
      </div>
    )
  }

  const Home = () => {
    const [expanded, setExpanded] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [open, setOpen] = useState(false);
    const [isFollow, setIsFollow] = useState(false);
    const [showInput, setShowInput] = useState(false)
    const [input, setInput] = useState('');
    const [submitted, setSubmitted] = useState([]);
    const text = `当你想创建一个响应式函数，而该函数本身永远不会有观察者时,可以使用 mobx.autorun。 这通常是当你需要从反应式代码桥接到命令式代码的情况,例如打印日志、持久化或者更新UI的代码。 当使用 autorun 时，所提供的函数总是立即被触发一次，然后每次它的依赖关系改变时会再次被触发。 相比之下,computed(function) 创建的函数只有当它有自己的观察者时才会重新计算，否则它的值会被认为是不相关的。 经验法则：如果你有一个函数应该自动运行，但不会产生一个新的值,请使用autorun。 其余情况都应该使用 computed。 Autoruns 是关于 启动效果 (initiating effects) 的 ，而不是产生新的值。 如果字符串作为第一个参数传递给 autorun ，它将被用作调试名。传递给 autorun 的函数在调用后将接收一个参数，即当前 reaction(autorun)，可用于在执行期间清理 autorun。就像 @ observer 装饰器/函数,autorun 只会观察在执行提供的函数时所使用的数据。`;
    const toggleExpand = () => {
      setExpanded(!expanded);
    }
    const handleClick = () => {
      setClicked(!clicked);
    }
    const showDrawer = () => {
      setOpen(true);
    };
    const onClose = () => {
      setOpen(false);
    };
    const img = require('./img/img.jpg');
    const handleFollow = () => {
      setIsFollow(prev => !prev);
      store.users.push('Boiis');
      store.posts.push('没必要让反派强行反转,挺无语的');
    }

    const content = (
      <button style={
        {
          backgroundColor: clicked ? 'gray' : '#056de8',
          color: clicked ? 'black' : 'white',
          cursor: 'pointer',
          border: 'none',
          borderRadius: '3px',
        }
      } onClick={handleFollow}>
        {isFollow ? '取消关注' : '关注'}
      </button>
    );

    const handleSubmit = async () => {
      if (!input) {
        alert('请输入内容!');
        return;
      }
      setSubmitted(prev => [...prev, input])
      try {
        const res = await fetch(`${BASE_HOST}/api/form`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            content: input
          })
        });
        if (res.ok) {
          alert('提交成功!');
          setInput('');
        } else {
          throw new Error('提交失败');
        }

      } catch (error) {
        alert(error);
      }

    };

    return (
      <div>
        <Nav></Nav>
        <div className='index'>
          <h2>想看一些娱乐圈文 有推荐吗?</h2>
          <p>
            {expanded ? text : text.substring(0, 60) + '...'}
            <button className='expand' onClick={toggleExpand}>
              {expanded ? '收起' : '阅读全文'}
            </button>
          </p>
          <Button onClick={addNumber} >  赞同 {count}</Button>
          <button className='btn' style={
            {
              backgroundColor: clicked ? '#056de8' : '#84b0e3',
              color: clicked ? 'white' : '#056de8'
            }
          } onClick={handleClick}> 不喜欢</button>
          <button className='review' onClick={showDrawer}>{5}条评论</button>
          <Drawer
            title="{5}条评论"
            placement='top'
            closable={false}
            onClose={onClose}
            open={open}
            contentWrapperStyle={{
              boxShadow: 'none',
              width: '700px',
              minHeight: '700px',
              maxHeight: '800px',
              margin: '0  auto',
              marginTop: '60px'
            }
            }>
            <List
              size="large"
              dataSource={submitted}
              bordered
              className='cmt-list'
              renderItem={(input) =>
                <List.Item>{input}
                </List.Item>
              }
            >
            </List>
            <div style={{
              minHeight: '90px'
            }}>
              <div style={{
                height: '90px',
                width: '24px',
                float: 'left',
                clear: 'both'
              }}>
                <Popover content={content} title="Boiis">
                  <img src={img} style={{ width: '100%', objectFit: 'contain', cursor: 'pointer' }} />
                </Popover>
              </div>
              <div style={{
                float: 'left',
                height: '90px',
                width: '600px',
                marginLeft: '10px',
              }}>
                <div style={{ fontSize: '15px', fontWeight: '500' }}>Boiis</div>
                <div style={{ fontSize: '15px', marginTop: '10px' }}>没必要让反派强行反转，挺无语的</div>
                <div style={{ fontSize: '14px', marginTop: '10px', color: 'gray' }}>
                  <span> 07-09 </span>
                  <span> IP 属地{'湖南'} </span>
                  <button style={{
                    float: 'right',
                    marginTop: '4px',
                    marginLeft: '20px',
                    backgroundColor: 'transparent',
                    border: 'none',
                    borderRadius: 0,
                    height: 'auto',
                    lineHeight: 'inherit',
                    color: 'gray',
                    cursor: 'pointer'
                  }}>点赞</button>
                  <button onClick={() => setShowInput(true)}
                    style={{
                      float: 'right',
                      marginTop: '4px',
                      backgroundColor: 'transparent',
                      border: 'none',
                      borderRadius: 0,
                      height: 'auto',
                      lineHeight: 'inherit',
                      color: 'gray',
                      cursor: 'pointer'
                    }}>回复</button>
                  {showInput &&
                    <div>
                      <input value={input} onChange={e => setInput(e.target.value)} />
                      <button onClick={handleSubmit}>发送</button>
                    </div>
                  }
                </div>
              </div>
            </div>
          </Drawer>
        </div>
      </div >
    )
  }
  class Product {
    constructor(id, name, price) {
      this.id = id
      this.name = name
      this.price = price
    }
  }
  const ProductComponent = ({ product }) => {

    const handleAdd = () => {
      cart.addItem(product);
    }

    return (
      <div>
        <h2>{product.name}</h2>
        <div>单价:{product.price}元</div>
        <button onClick={handleAdd}>加入购物车</button>
      </div>
    );
  }

  const GumComponent = () => {
    const gum = new Product(0, '口香糖', 9);
    return <ProductComponent product={gum} />
  }

  const PotatoComponent = () => {
    const potato = new Product(1, '薯片', 8);
    return <ProductComponent product={potato} />
  }

  class Cart {
    items = []
    constructor() {
      makeObservable(this, {
        items: observable,
      })
    }
    get total() {
      return this.items.reduce((sum, item) => {
        return sum + item.price * item.amount
      }, 0)
    }
    addItem(product) {
      const item = this.items.find(item => item.id === product.id)
      if (item) {
        item.amount++;
      } else {
        cart.items.push({ ...product, amount: 1 })
      }
    }
    removeItem(id) {
      this.items = this.items.filter(item => item.id !== id)
    }
    updateAmount(id, amount) {
      const item = this.items.find(item => item.id === id)
      if (item) {
        item.amount = amount
      }
    }
  }

  const cart = new Cart()

  const CartView = observer(function CartView({ cart }) {

    return (
      <div>
        <h3>购物车</h3>
        <ul>
          {cart.items.map(item => (
            <li key={item.id}>
              {item.name} x {item.amount}
            </li>
          ))}
        </ul>
        <div>总计: {cart.total}元</div>
      </div>
    )
  })

  const Shop = () => {
    const items = [
      {
        label: '陕西',
        key: '1',
      },
      {
        label: '杭州',
        key: '2',
      },
      {
        label: '北京',
        key: '3',
      },
    ];
    return <div>
      <div className='product'>
        <div>
          <span>全部商品</span>
          <span>配送至： <Dropdown
            menu={{
              items,
              onClick,
            }}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                Hover me, Click menu item
                <DownOutlined />
              </Space>
            </a>
          </Dropdown></span>
        </div>
        <GumComponent></GumComponent>
        <PotatoComponent></PotatoComponent>
        <CartView cart={cart} />
        <div>
          <input type='checkbox' />全选
        </div>
      </div>
      <div className='guess'></div>
    </div>
  }

  return (
    <Router>
      <Layout>
        <Header className='header-style'>
          <div className='header'>
            <Space className='index'>
              <a href="www.zhihu.com" >知 乎</a>
            </Space>
            <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} className='menu'>
            </Menu>
            <div className='search'>
              <AutoComplete
                popupClassName="certain-category-search-dropdown"
                dropdownMatchSelectWidth={500}
                options={options}
              >
                <Input.Search size="large" placeholder="input here" />
              </AutoComplete>
            </div>
            <Popover content={content} title="Title" >
              <Button type="primary" className='ctx'>消息</Button>
            </Popover>
            <Popover content={content} title="我的私信" >
              <Button type="primary" className='ctxx'>私信</Button>
            </Popover>
            <Popover
              content={yhContent}
              trigger="click"
              open={open}
              onOpenChange={handleOpenChange}
            >
              <Button type="primary" className='users'>用户</Button>
            </Popover>
          </div>
        </Header>
        <Layout hasSider>
          <Content className='content-style'>
            <div className='index-img'></div>
            <div className='float'>
              <Routes>
                <Route path="/follow" element={<Follow />} />
                <Route path="/" element={<Home />} />
                <Route path="/hot" element={<Nav />} />
                <Route path="/video" element={<Nav />} />
              </Routes>
            </div>

          </Content>
          <Sider className='sider-style'>
            <span className='create'>创作中心</span>
            <a className='box'>草稿箱(0)</a>
          </Sider>
        </Layout>
      </Layout>
      <Shop></Shop>
    </Router>
  )
};
export default App;
