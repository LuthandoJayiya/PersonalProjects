import { Navigate, useLocation } from 'react-router-dom'
import ApiService from './ApiService'
import PropTypes from 'prop-types'


export const ProtectedRoute = ({ component }) => {
  const location = useLocation()

  return ApiService.isAuthenticated() ? (
    component
  ) : (
    <Navigate to='/login' replace state={{ from: location }} />
  )
}
ProtectedRoute.propTypes = {
  component: PropTypes.node.isRequired
}


export const AdminRoute = ({ component }) => {
  const location = useLocation()

  return ApiService.isAdmin() ? (
    component
  ) : (
    <Navigate to='/login' replace state={{ from: location }} />
  )
}
AdminRoute.propTypes = {
  component: PropTypes.node.isRequired
}
