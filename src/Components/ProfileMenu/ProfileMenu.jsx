import { Avatar, Dropdown, Menu, Space } from 'antd'
import { NavLink } from 'react-router-dom'
import './ProfileMenu.scss'

const ProfileMenu = (props) => {
  const menu = (
    <Menu
      items={[
        {
          key: 'dashboard',
          label: <NavLink to='/dashboard'>Dashboard</NavLink>,
        },
        {
          key: 'collections',
          label: <NavLink to='/collections'>Collections</NavLink>,
        },
        {
          key: 'profile',
          label: <NavLink to='/profile'>Profile</NavLink>,
        },
      ]}
    />
  )

  return (
    <Dropdown
      overlay={menu}
      placement='bottom'
      overlayClassName='menu-dropdown'
    >
      <Avatar className='profile-menu' size={50}>
        {props.name.charAt(0)}
      </Avatar>
    </Dropdown>
  )
}
export default ProfileMenu
