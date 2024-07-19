import { Helmet } from 'react-helmet-async'
import { ProfilePageSection } from './index.styled'

const ProfilePage = () => {
  return (
    <>
      <Helmet>
        <title>Profile Page</title>
      </Helmet>
      <ProfilePageSection>Profile Page</ProfilePageSection>
    </>
  )
}

export default ProfilePage
