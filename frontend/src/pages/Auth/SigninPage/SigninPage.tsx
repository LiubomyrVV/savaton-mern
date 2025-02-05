import { useLocation, useNavigate } from 'react-router-dom'
import { SigninPageSection } from './index.styled'
import { Store } from '../../../store'
import { useContext, useEffect, useState } from 'react'
import { useSigninMutation } from '../../../hooks/userHooks'

const SigninPage = () => {
  const navigate = useNavigate()
  const { search } = useLocation()
  const redirectInUrl = new URLSearchParams(search).get('redirect')
  const redirect = redirectInUrl ? redirectInUrl : '/'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { state, dispatch } = useContext(Store)
  const { userInfo } = state
  const { mutateAsync: signin, isLoading } = useSigninMutation()

  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [navigate, redirect, userInfo])
  return <SigninPageSection>Sign In </SigninPageSection>
}

export default SigninPage

