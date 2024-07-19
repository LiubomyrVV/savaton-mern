import App from './App.tsx'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage.tsx'
import CartPage from './pages/CartPage/CartPage.tsx'
import ProfilePage from './pages/ProfilePage/ProfilePage.tsx'
import ProductPage from './pages/ProductPage/ProductPage.tsx'

// eslint-disable-next-line react-refresh/only-export-components
export const ROUTES = {
  CART: 'cart',
  PROFILE: 'profile',
  PRODUCT: 'products/:id',
}

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} element={<HomePage />} />
      {/* <Route path="product/:slug" element={<ProductPage />} /> */}
      <Route path={ROUTES.CART} element={<CartPage />} />
      <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
      <Route path={ROUTES.PRODUCT} element={<ProductPage />} />
      {/* <Route path="signin" element={<SigninPage />} />
        <Route path="signup" element={<SignupPage />} />  */}
      {/* <Route path="" element={<ProtectedRoute />}>
          <Route path="shipping" element={<ShippingAddressPage />} />
          <Route path="payment" element={<PaymentMethodPage />} />
          <Route path="placeorder" element={<PlaceOrderPage />} />
          <Route path="/order/:id" element={<OrderPage />} />
          <Route path="/orderhistory" element={<OrderHistoryPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
  
        {/* <Route path="dashboard" element={<Dashboard />} /> */}
      {/* ... etc. */}
    </Route>
  )
)
