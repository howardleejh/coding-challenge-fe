import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'
import Homepage from '../Pages/Homepage/Homepage'
import RegisterPage from '../Pages/RegisterPage/RegisterPage'
import Dashboard from '../Pages/Dashboard/Dashboard'
import CollectionsPage from '../Pages/CollectionsPage/CollectionsPage'
import ProfilePage from '../Pages/ProfilePage/ProfilePage'
import ProductPage from '../Pages/ProductPage/ProductPage'
import AddProductPage from '../Pages/AddProductPage/AddProductPage'
import ProtectedRoute from './ProtectedRoute'
import PublicRoute from './PublicRoute'
import App from '../App'

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index element={<Homepage />} />
      <Route
        path='register'
        element={
          <PublicRoute>
            <RegisterPage />
          </PublicRoute>
        }
      />
      <Route
        path='dashboard'
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path='collections'
        element={
          <ProtectedRoute>
            <CollectionsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path='collections/add-product'
        element={
          <ProtectedRoute>
            <AddProductPage />
          </ProtectedRoute>
        }
      />
      <Route
        path='collections/:productId'
        element={
          <ProtectedRoute>
            <ProductPage />
          </ProtectedRoute>
        }
      />
      <Route
        path='profile'
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
    </Route>
  )
)
