import { Row } from 'antd'
import ProfileForm from '../../Components/ProfileForm/ProfileForm'
import './ProfilePage.scss'

const ProfilePage = () => {
  return (
    <div className='profile-page'>
      <Row align='middle' justify='center'>
        <ProfileForm />
      </Row>
    </div>
  )
}
export default ProfilePage
