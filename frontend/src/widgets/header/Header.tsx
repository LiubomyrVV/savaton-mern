import { Link, useNavigate } from 'react-router-dom'
import { HeaderContainer } from './index.styled'
import SearchInput from '../../components/SearchInput/SearchInput'
import HeaderActions from './actions/HeaderActions'
import { useWindowResize } from '../../hooks/useWindowResize'
import { ROUTES } from '../../router'
import RegisterModal from '../Auth/RegisterModal'
import { useContext, useState } from 'react'
import { Store } from '../../store'


const Header = () => {
  const { width } = useWindowResize()
  const [isOpen, setIsOpen] = useState(false);
  const nav = useNavigate()
  const { state } = useContext(Store)
  const {
    userInfo
  } = state
  return (
    <HeaderContainer id={'header'}>
       {isOpen ? <RegisterModal onClose={() => setIsOpen(false)}/> : null}
      <div
        className="upper-part__underline"
        style={{ borderBottom: '2px solid var(--main-border)' }}
      ></div>
      <div className="upper-part">
        <div className="info">
          <a>
            <i className="bi bi-geo-alt"></i>
            <div>55 Main Street, Anytown Poland</div>
          </a>
          <a>
            <i className="bi bi-telephone"></i>
            <div>+48 338 732 123</div>
          </a>
        </div>
        <div className="functional">
          <div className="actions">
            <HeaderActions />
          </div>
          <div className="socials">
            <a href="https://x.com/i/flow/login">
              <i className="bi bi-twitter"></i>
            </a>
            <a href="https://www.instagram.com/">
              <i className="bi bi-instagram"></i>
            </a>
            <a href="https://vimeo.com/">
              <i className="bi bi-vimeo"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="middle-part">
        <Link to="/" className="logo">
          Savaton<span>.</span>
        </Link>
        <div className="actions">
          <SearchInput />
          <Link to={ROUTES.CART} className="cart">
            <figure>
              <i className="bi bi-bag"></i>
            </figure>
            <div>
              <span>Cart</span>
              <span className="summary">150.00$</span>
            </div>
          </Link>
          <div style={{cursor: 'pointer'}} onClick={() => {

            if (userInfo) { 
              nav('/profile')
            } else {
              setIsOpen(!isOpen)
            }
          }} className="user">
            <figure>
              {userInfo?.name ? <i className="bi bi-star"></i> : <i className="bi bi-person"></i>}
            </figure>
            <div>
              <span>User</span>
              <span>Account</span>
            </div>
          </div>
        </div>
      </div>
      <div
        className="lower-part"
        style={{
          width: `${Math.round(width)}px`,
        }}
      ></div>
    </HeaderContainer>
  )
}

export default Header
