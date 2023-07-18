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
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { Button, Divider, Space, notification, Checkbox, Form, AutoComplete, Input, Popover, Layout, Menu, Drawer, message, List, Typography, Alert } from 'antd';
import './styles.less';
import { Title } from './components';
import { BASE_HOST } from './http';


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
    label: Title('搜索发现'),
    options: [renderItem('年轻人只有city work'), renderItem('离职之后怎么退出工作群'), renderItem('陕西发现一例猴痘病例'), renderItem('今日入伏'), renderItem('航班遇严重颠覆')],
  }
];

const onFinishFailed = (errorInfo) => {

};

const App = () => {
  const [current, setCurrent] = useState('mail');
  const [count, setCount] = useState(0);
  const [userCommit, setUserCommit] = useState('');
  const [listData, setListData] = useState([]);

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

  const submitForm = async (commit) => {
    const response = await fetch(`${BASE_HOST}/api/isLogin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(commit)
    });
    const data = await response.json();
    return Promise.resolve(data)
  }
  const formRef = useRef();
  const onFinish = async (values) => {
    console.log(values)
    const res = await submitForm({ value: values.commit });
    setUserCommit(res.data);
    formRef.current.resetFields();
    const newListData = [...listData, res.data];
    setListData(newListData);
    localStorage.setItem('comments', JSON.stringify(newListData));
  };

  const initData = async () => {
    const fetchData = async () => {
      const response = await fetch(`${BASE_HOST}/api/data`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify()
      });
      const data = await response.json();
      console.log(data);
      return Promise.resolve(data);
    };
    const newData = await fetchData();
    const newListData = newData.data;
    setListData(newListData);
  }

  useEffect(() => {
    initData()
  }, [])

  function handleDelete(item) {
    const index = listData.indexOf(item);
    const newListData = [...listData];
    newListData.splice(index, 1);
    setListData(newListData);
  }

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

  const LoginPage = () => {
    const [user, setUser] = useState('');
    const navigate = useNavigate();
    const submitLog = async (uname, password) => {
      console.log(uname, password);
      const response = await fetch(`${BASE_HOST}/Login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
          { uname, password }
        )
      });
      const data = await response.json();
      return Promise.resolve(data)
    }
    const onFinished = async (values) => {
      navigate('/');
      const log = await submitLog({ uname: values.name }, { password: values.password })
      setUser(log.data)
    }
    const [form] = Form.useForm();

    return <Form
      name="log"
      form={form}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      onFinish={onFinished}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="name"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" >
          登录
        </Button>
      </Form.Item>
    </Form>
  }

  const HomePage = () => {
    const navigate = useNavigate();
    const handleClick = () => {
      navigate('/Login');
    }
    return <Button onClick={handleClick}>请登录</Button>
  }

  return (
    <Router>
      <Layout>
        <Header className='header-style'>
          <Space>
            <a href="www.zhihu.com" className='index'>知 乎</a>
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
          <Title shubiao={123}></Title>
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
        </Header>
        <Layout hasSider>
          <Content className='content-style'>
            <div className='index-img'></div>
            <List
              size="large"
              header={<div>评论</div>}
              dataSource={listData}
              bordered
              className='cmt-list'
              renderItem={(item) => <List.Item>{item.commits}
                <Button className='delete' onClick={() => handleDelete(item)}>删除</Button> </List.Item>}
            >
            </List>
          </Content>
          <Sider className='sider-style'>
            <Form
              name="basic"
              ref={formRef}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                name="commit"
                rules={[{ required: true, message: '请输入你的评论' }]}
              >
                <Input type="text" className='biaodan' />
              </Form.Item>

              <Button type="primary" htmlType="submit">
                提交
              </Button>
            </Form>
            <span className='create'>创作中心</span>
            <span className='box'>草稿箱(0)</span>
          </Sider>
        </Layout>
        <Popover title="Title">
          <Button onClick={addNumber} >  赞 </Button>
          <div className='content-like'>123123{count}</div>
        </Popover>
      </Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Login" element={<LoginPage />} />
      </Routes>
    </Router>
  )
};
export default App;
