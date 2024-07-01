import { useLocation, useNavigate } from 'react-router-dom'
import { SigninPageSection } from './index.styled'

const SigninPage = () => {
  const navigate = useNavigate()
  const { search } = useLocation()
  const redirectInUrl = new URLSearchParams(search).get('redirect')
  const redirect = redirectInUrl ? redirectInUrl : '/'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { userInfo } = state

  return <SigninPageSection></SigninPageSection>
}

export default SigninPage
