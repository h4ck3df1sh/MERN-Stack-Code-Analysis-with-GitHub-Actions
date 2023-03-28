

import { HomeFilled, PlusCircleFilled, UserOutlined, UnlockFilled, EnvironmentOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import React, { useContext, useState } from 'react'
import { Modal } from 'antd';
import { GlobalContext } from '../../context/UsersState'
import { CreatePostNew } from '../CreatePostNew/CreatePostNew';
import './NavBar.scss'

export const NavBar = () => {
  const navigate = useNavigate()
  const { reset, logOut } = useContext(GlobalContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    
  };

  return (
    <div className='navbar'>
      <div className='logo' onClick={() => navigate('/')}>nomad</div>
      <div className='container-nav'>
        <div className='home' onClick={() => navigate('/')}><HomeFilled className='iconHome' /><div className='divHome'>Home</div> </div>
        <div className='profile' onClick={() => navigate('/profile')}><UserOutlined className='iconProfile' /><div className='divProfile'>Profile</div></div>
        <div className='create' onClick={() => setIsModalOpen(!isModalOpen)} ><PlusCircleFilled className='iconCreate' /><div className='divCreate'>Post</div></div>
        <div className='logout' onClick={() => navigate('/countries')}>
          <EnvironmentOutlined className='iconlogout' /> <div className='divLogout'>Countries</div>
        </div>
        <div className='logout'
          onClick={() => {
            logOut(),
            navigate('/')
            reset()
          }}>
          <UnlockFilled className='iconlogout' /><div className='divLogout'>Log out</div></div>

      </div>
      <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} centered  footer={null} >
        <CreatePostNew onAction={handleCancel} />
      </Modal>
    </div>
  )
}
